import { cn } from "@/lib/utils";
import { PodcastCard } from "../common/card/PodcastCard";
import { YoutubeVideo } from "@/interfaces/youtube-response.interface";
import { AnimationReveal } from "../ui/animation-reveal";

interface PodcastListProps {
  className?: string;
  videos?: YoutubeVideo[];
  title?: string;
  kicker?: string;
}

export const PodcastList = ({
  className,
  videos = [],
  title = "Our Media",
  kicker = "Watch on YouTube",
}: PodcastListProps) => {
  return (
    <div
      className={cn("flex-1 flex flex-col py-5 px-16 gap-[34px]", className)}
    >
      <AnimationReveal
        x={-5}
        y={0}
        delay={1}
        duration={0.3}
        type='header'
        opacity={1}
        className='flex flex-col gap-1'
      >
        <h2 className='text-accent-foreground tracking-[-1.38px] leading-[120%]'>
          {title}
        </h2>
        <span className='text-secondary text-[10px] leading-[180%] font-medium uppercase tracking-[0.6px]'>
          {kicker}
        </span>
      </AnimationReveal>
      <AnimationReveal
        x={0}
        y={5}
        delay={1.1}
        duration={0.5}
        type='ul'
        opacity={1}
        className='flex flex-col gap-4 w-full'
      >
        {videos.map((video, index) => {
          const thumbnailUrl =
            video.thumbnail?.medium ||
            video.thumbnail?.high ||
            "/images/social/youtube/thumbnail-example.jpg";

          // Format date from ISO string
          const formattedDate = new Date(video.publishedAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <PodcastCard
              index={index}
              key={video.id}
              id={video.id}
              title={video.title}
              bannerImage={thumbnailUrl}
              url={video.url}
              date={formattedDate}
              category='YouTube'
              disableAnimation={true}
            />
          );
        })}
      </AnimationReveal>
    </div>
  );
};
