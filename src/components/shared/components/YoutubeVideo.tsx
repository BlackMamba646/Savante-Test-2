"use client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeVideoProps {
  className?: string;
  videoId: string;
  title?: string;
  thumbnail?: string;
  uploadDate?: string;
  description?: string;
  rel?: string;
}

export const YoutubeVideo = ({
  className,
  videoId,
  title,
  thumbnail,
  uploadDate,
  description,
  rel = 'prefetch',
}: YoutubeVideoProps) => {

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title || ""}
      lazyLoad={true}
      seo={{
        name: title,
        description: description,
        thumbnailUrl: thumbnail,
        uploadDate: uploadDate,
      }}
      thumbnail={thumbnail}
      poster="maxresdefault"
      aspectWidth={21}
      aspectHeight={9}
      rel={rel}
      referrerPolicy='strict-origin-when-cross-origin'
      webp={true}
    />
  );
};
