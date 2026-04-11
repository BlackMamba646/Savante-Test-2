import { ApifyClient } from "apify-client";
import { unstable_cache } from "next/cache";
import {
  InstagramProfile,
  InstagramReel,
  InstagramDataResponse,
  InstagramErrorResponse,
} from "@/interfaces/instagram-response.interface";

export class InstagramService {
  private apifyClient: ApifyClient;

  constructor() {
    this.apifyClient = new ApifyClient({
      token: process.env.NEXT_APIFY_TOKEN || "",
    });
  }

  private async _fetchProfileWithReels(
    username: string,
    reelsLimit: number = 8
  ): Promise<InstagramDataResponse | InstagramErrorResponse> {
    try {
      if (!this.validateUsername(username)) {
        return {
          error: "INVALID_USERNAME",
          message: "Invalid Instagram username",
          statusCode: 400,
        };
      }

      const profileUrl = `https://www.instagram.com/${username}/`;

      const profileRun = await this.apifyClient
        .actor("apify/instagram-scraper")
        .call({
          directUrls: [profileUrl],
          resultsType: "details",
          resultsLimit: 1,
        });

      const profileDataset = await this.apifyClient
        .dataset(profileRun.defaultDatasetId)
        .listItems();

      if (!profileDataset.items.length) {
        return {
          error: "NO_DATA",
          message: "Instagram profile not found",
          statusCode: 404,
        };
      }

      const profileRaw: any = profileDataset.items[0];

      const profile: InstagramProfile = {
        username: profileRaw.username,
        fullName: profileRaw.fullName || "",
        biography: profileRaw.biography || "",
        profilePicUrl: profileRaw.profilePicUrl,
        followersCount: profileRaw.followersCount,
        followingCount: profileRaw.followsCount,
        postsCount: profileRaw.postsCount,
        isVerified: profileRaw.verified,
        isPrivate: profileRaw.isPrivate,
        externalUrl: profileRaw.externalUrl,
        businessCategoryName: profileRaw.businessCategoryName,
      };

      // fetch more posts to ensure we get enough reels
      const postsToFetch = reelsLimit * 3;
      
      const reelsRun = await this.apifyClient
        .actor("apify/instagram-scraper")
        .call({
          directUrls: [profileUrl],
          resultsType: "posts",
          resultsLimit: postsToFetch,
        });

      const reelsDataset = await this.apifyClient
        .dataset(reelsRun.defaultDatasetId)
        .listItems();

        const reels: InstagramReel[] = reelsDataset.items
        .filter((post: any) => {
          // onlys include reels/clips, not regular posts or carousels
          return post.productType === "clips" || 
                 (post.type === "Video" && post.isReel) ||
                 (post.type === "Video" && post.videoUrl);
        })
        .slice(0, reelsLimit) // Get only the requested number of reels
        .map((post: any) => ({
          id: post.id || post.shortCode,
          url: `https://www.instagram.com/reel/${post.shortCode}/`,
          type: "video",
          caption: post.caption || "",
          displayUrl: post.displayUrl,
          thumbnailUrl: post.thumbnailUrl || post.displayUrl,
          videoUrl: post.videoUrl,
          viewCount: post.videoViewCount || post.playCount || 0,
          likeCount: post.likesCount || 0,
          commentCount: post.commentsCount || 0,
          timestamp: post.timestamp,
          isVideo: true,
          dimensions: {
            width: post.dimensions?.width ?? 1080,
            height: post.dimensions?.height ?? 1920,
          },
        }));

      const response: InstagramDataResponse = {
        profile,
        reels,
        lastUpdated: new Date().toISOString(),
      };

      return response;
    } catch (error: unknown) {
      console.error("InstagramService Error:", error);

      return {
        error: "FETCH_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        statusCode: 500,
      };
    }
  }

  private validateUsername(username: string): boolean {
    return /^[a-zA-Z0-9._]{1,30}$/.test(username);
  }

  // Public method with caching
  async getProfileWithReels(
    username: string,
    reelsLimit: number = 8
  ): Promise<InstagramDataResponse | InstagramErrorResponse> {
    // Skip API call if no token is configured
    if (!process.env.NEXT_APIFY_TOKEN) {
      console.warn("Instagram: No Apify token configured, returning error");
      return {
        error: "NO_TOKEN",
        message: "Apify token not configured",
        statusCode: 401,
      };
    }

    // Create a cached version of the fetch function
    const getCachedInstagramData = unstable_cache(
      async () => this._fetchProfileWithReels(username, reelsLimit),
      [`instagram-${username}-${reelsLimit}`], // Cache key
      {
        revalidate: 86400, // 24 hours in seconds
        tags: [`instagram-${username}`],
      }
    );

    return getCachedInstagramData();
  }
}

export const instagramService = new InstagramService();
