import { ENVIRONMENT } from "@/config/env.config";
import { unstable_cache } from "next/cache";
import type {
  YouTubeSearchListResponse,
  YouTubeSearchResult,
  YoutubeVideo,
} from "@/interfaces/youtube-response.interface";

class YouTubeService {
  private apiKey: string;
  private baseURL = ENVIRONMENT.YOUTUBE_BASE_URL;
  private channelId: string;

  constructor() {
    this.apiKey = ENVIRONMENT.YOUTUBE_API_KEY;
    this.channelId = ENVIRONMENT.YOUTUBE_CHANNEL_ID;
  }

  /**
   * Get the latest videos from a YouTube channel (excluding Shorts)
   * @param maxResults - Maximum number of results
   * @returns - Array of videos
   */
  async getChannelVideos(maxResults: number = 4): Promise<YoutubeVideo[]> {
    if (!this.apiKey || !this.channelId) {
      console.warn("YouTube: API key or channel ID not configured");
      return [];
    }

    const getCachedVideos = unstable_cache(
      async () => this._fetchChannelVideos(maxResults),
      [`youtube-videos-${this.channelId}-${maxResults}`],
      {
        revalidate: 86400, // 24 hours cache
        tags: [`youtube-${this.channelId}`],
      }
    );

    try {
      return await getCachedVideos();
    } catch (error: unknown) {
      console.error("YouTube Service Error:", error);
      return [];
    }
  }

  private async _fetchChannelVideos(maxResults: number): Promise<YoutubeVideo[]> {
    try {
      const [mediumVideos, longVideos] = await Promise.all([
        this.fetchVideosByDuration("medium", maxResults),
        this.fetchVideosByDuration("long", maxResults),
      ]);

      const allVideos = [...mediumVideos, ...longVideos];

      allVideos.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      return allVideos.slice(0, maxResults);
    } catch (error: unknown) {
      console.error("YouTube API Error:", error);
      throw error;
    }
  }

  /**
   * Obtiene videos filtrados por duración
   * @param duration - Duración: "short" (<4min), "medium" (4-20min), "long" (>20min)
   * @param maxResults - Número máximo de resultados
   */
  private async fetchVideosByDuration(
    duration: "short" | "medium" | "long",
    maxResults: number
  ): Promise<YoutubeVideo[]> {
    try {
      const params = new URLSearchParams({
        part: "snippet",
        channelId: this.channelId,
        maxResults: maxResults.toString(),
        order: "date",
        type: "video",
        videoDuration: duration,
        key: this.apiKey,
      });

      const response = await fetch(`${this.baseURL}/search?${params}`, {
        next: { revalidate: 86400 }, // cache 24 hours
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`YouTube API Error (${response.status}):`, errorText);
        
        if (response.status === 403) {
          console.error("YouTube API: Quota exceeded or API key invalid");
        }
        return [];
      }

      const data: YouTubeSearchListResponse = await response.json();
      return this.transformVideos(data.items);
    } catch (error: unknown) {
      console.error(`YouTube API Error (${duration}):`, error);
      return [];
    }
  }

  private transformVideos(items: YouTubeSearchResult[]): YoutubeVideo[] {
    return items
      .filter((item) => item.id.videoId)
      .map((item) => {
        const videoId = item.id.videoId || "";
        return {
          id: videoId,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: {
            default: item.snippet.thumbnails.default?.url || `https://i.ytimg.com/vi/${videoId}/default.jpg`,
            medium: item.snippet.thumbnails.medium?.url || `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
            high: item.snippet.thumbnails.high?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            standard: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
            maxres: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          },
          publishedAt: item.snippet.publishedAt,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          liveBroadcastContent: item.snippet.liveBroadcastContent,
        };
      });
  }
}

export const youtubeService = new YouTubeService();
