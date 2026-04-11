import { Suspense } from "react";
import { YoutubeChannel } from "./YoutubeChannel";
import { YoutubeChannelSkeleton } from "./YoutubeChannelSkeleton";
import { YoutubeChannelStatic } from "./YoutubeChannelStatic";
import { youtubeService } from "@/services/youtube.service";
import { ENVIRONMENT } from "@/config/env.config";

async function YoutubeChannelAsync() {
  try {
    const videos = await youtubeService.getChannelVideos(ENVIRONMENT.YOUTUBE_MAX_VIDEOS);

    if (!videos || videos.length === 0) {
      console.warn("YouTube: No videos fetched, showing static content");
      return <YoutubeChannelStatic />;
    }
    
    return <YoutubeChannel videos={videos} />;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return <YoutubeChannelStatic />;
  }
}

export function YoutubeChannelWrapper() {
  return (
    <Suspense fallback={<YoutubeChannelSkeleton />}>
      <YoutubeChannelAsync />
    </Suspense>
  );
}