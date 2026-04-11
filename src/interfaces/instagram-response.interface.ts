// Instagram Profile Response
export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  externalUrl?: string;
  businessCategoryName?: string;
}

// Instagram Reel/Post Response
export interface InstagramReel {
  id: string;
  url: string;
  type: "video" | "image";
  caption?: string;
  displayUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  viewCount?: number;
  likeCount: number;
  commentCount: number;
  timestamp: string;
  isVideo: boolean;
  dimensions: {
    width: number;
    height: number;
  };
}

// Apify Actor Run Response
export interface ApifyActorRunResponse {
  data: {
    id: string;
    status: string;
    startedAt: string;
    finishedAt?: string;
  };
}

// Combined Instagram Data Response
export interface InstagramDataResponse {
  profile: InstagramProfile;
  reels: InstagramReel[];
  lastUpdated: string;
}

// Error Response
export interface InstagramErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}