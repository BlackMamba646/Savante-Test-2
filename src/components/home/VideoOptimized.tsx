"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { PlayButton } from "../common/button/PlayButton";
import { cn } from "@/lib/utils";

interface VideoOptimizedProps {
  thumbnailUrl?: string;
  videoId?: string;
  videoHash?: string;
  className?: string;
}

const VIMEO_VIDEO_ID = "1163975457";
const VIMEO_VIDEO_HASH = "e41e15dd26";

export const VideoOptimized = ({
  thumbnailUrl,
  videoId = VIMEO_VIDEO_ID,
  videoHash = VIMEO_VIDEO_HASH,
  className,
}: VideoOptimizedProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const vimeoThumbnail =
    thumbnailUrl || `https://vumbnail.com/${videoId}_large.jpg`;

  const handlePlayClick = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const videoSrc = `https://player.vimeo.com/video/${videoId}?h=${videoHash}&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`;

  return (
    <div className={cn("w-full laptop:w-1/2 self-auto laptop:self-center laptop:max-w-[540px] rounded-2xl overflow-hidden", className)}>
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {!isVideoLoaded ? (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 w-full h-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Reproducir video de presentación de Savante Realty"
          >
            <Image
              src={vimeoThumbnail}
              alt="Video thumbnail - Presentación Savante Realty"
              fill
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover"
              priority={false}
              loading="eager"
            />

            <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/20" />

            <PlayButton />
          </button>
        ) : (
          <iframe
            src={videoSrc}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            className="absolute inset-0 w-full h-full"
            title="Presentation Savante Realty Video"
            loading="lazy"
            style={{ backgroundColor: "#000" }}
          />
        )}
      </div>
    </div>
  );
};
