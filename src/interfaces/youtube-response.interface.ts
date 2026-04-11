/**
 * YouTube Data API v3 - Search: list
 * Documentación: https://developers.google.com/youtube/v3/docs/search/list
 */
interface YouTubeSearchListResponse {
  kind: "youtube#searchListResponse";
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: YouTubePageInfo;
  items: YouTubeSearchResult[];
}

interface YouTubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface YouTubeSearchResult {
  kind: "youtube#searchResult";
  etag: string;
  id: YouTubeSearchResultId;
  snippet: YouTubeSearchSnippet;
}

interface YouTubeSearchResultId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

interface YouTubeSearchSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: "none" | "upcoming" | "live";
}


interface YouTubeThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YoutubeVideo {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: {
    default: string;
    medium: string;
    high: string;
    standard: string;
    maxres: string;
  };
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  liveBroadcastContent: "none" | "upcoming" | "live";
}

export type {
  YouTubeSearchListResponse,
  YouTubeSearchResult,
  YouTubeSearchResultId,
  YouTubeSearchSnippet,
  YouTubeThumbnails,
  YouTubeThumbnail,
  YouTubePageInfo,
  YoutubeVideo,
};
