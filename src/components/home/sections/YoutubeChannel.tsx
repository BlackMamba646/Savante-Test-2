import { LinkButton } from "@/components/common/button/LinkButton";
import { VideoCard } from "@/components/common/card/VideoCard";
import { YoutubeVideo as FeaturedYoutubeVideo } from "@/components/shared/components/YoutubeVideo";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { Youtube } from "@/components/shared/icons/youtube";
import { CONTACT_INFO } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { YoutubeVideo } from "@/interfaces/youtube-response.interface";

interface YoutubeChannelProps {
  videos: YoutubeVideo[];
}

export const YoutubeChannel = ({ videos }: YoutubeChannelProps) => {
  const videoList = Array.isArray(videos) ? videos : [];
  
  const featuredVideo = videoList[0];
  const otherVideos = videoList.slice(1);

  if (!featuredVideo) {
    console.warn("YouTube: No featured video available");
    return null;
  }

  return (
    <section className='relative overflow-hidden bg-surface-container-background'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-[64px] 
      flex flex-col gap-10'
      >
        <div
          className='relative self-center aspect-video outline-[2px] tablet:outline-[4px] 
          laptop:outline-[6px] outline-surface-background 
          rounded-xl tablet:rounded-2xl laptop:rounded-3xl overflow-hidden video-card-border w-full max-w-[1104px]'
          aria-label={`Watch ${featuredVideo.title || ""} in YouTube`}
        >
          <FeaturedYoutubeVideo
            videoId={featuredVideo.id}
            title={featuredVideo.title || ""}
            description={featuredVideo.description}
            thumbnail={featuredVideo.thumbnail.maxres}
            uploadDate={featuredVideo.publishedAt}
          />
        </div>
        <div className='flex flex-col gap-[26px] items-center'>
          <div className='flex flex-col gap-1'>
            <p
              className='text-secondary text-[12px] uppercase font-medium 
              leading-[180%] tracking-[0.96px] text-center'
            >
              Make Informed Decisions
            </p>
            <h2 className='text-accent-foreground font-medium tracking-[-1.38px] text-center'>
              Dubai & UAE Real Estate Video Reviews
            </h2>
          </div>
          <LinkButton
            href={CONTACT_INFO.youtubeLink}
            text='Watch on YouTube'
            customClassName='btn-primary-fill-variant w-max rounded-full [&_figure]:text-icon-primary-button
            overflow-hidden justify-center py-3 px-6 gap-2'
            textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
            showLeftIcon={true}
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            leftIcon={Youtube}
            animateIcon={true}
            iconSize={10}
            iconClassName='h-[20px]! w-auto scale-90'
            target='_blank'
            rel='noopener noreferrer'
          />
        </div>

        {otherVideos.length > 0 && (
          <ul className='flex flex-row gap-3 w-full'>
            {otherVideos.map((video) => (
              <VideoCard
                key={video.id}
                videoId={video.id || ""}
                thumbnail={video.thumbnail.high}
                alt={video.title || ""}
                description={video.description}
                title={video.title || ""}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
