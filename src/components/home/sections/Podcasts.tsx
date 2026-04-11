import { LinkButton } from "@/components/common/button/LinkButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { Play } from "@/components/shared/icons/play";
import { CONTACT_INFO } from "@/config/constant.config";
import Image from "next/image";
import { PodcastList } from "../PodcastList";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { YoutubeVideo } from "@/interfaces/youtube-response.interface";
import { decodeHtmlEntities } from "@/utils/html-entities";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface PodcastsProps {
  videos?: YoutubeVideo[];
}

export const Podcasts = ({ videos = [] }: PodcastsProps) => {
  // Return null if no videos available
  if (!videos || videos.length === 0) {
    return null;
  }

  // Get the latest video (first item) and remaining videos
  const [latestVideo, ...remainingVideos] = videos;

  const thumbnailUrl =
    latestVideo?.thumbnail?.maxres ||
    latestVideo?.thumbnail?.high ||
    "/images/social/youtube/thumbnail-example.jpg";

  return (
    <section className='relative bg-surface-background'>
      <div className='max-w-[1440px] mx-auto flex flex-col laptop:flex-row px-2 tablet:px-2.5 laptop:px-0 py-2.5 gap-0'>
        <div
          className='bg-[#000000] laptop:bg-transparent flex flex-col laptop:flex-row
          rounded-[28px] tablet:rounded-[50px] laptop:rounded-none
          p-[12px] tablet:p-[34px] laptop:p-0 gap-[20px] tablet:gap-[34px] laptop:gap-0'
        >
          <article
            className='relative flex flex-col tablet:flex-row laptop:flex-col gap-5 laptop:py-10 laptop:pr-10 laptop:pl-[112px] 
            bg-transparent laptop:bg-transparent dark items-stretch
            laptop:rounded-br-[64px] laptop:rounded-tr-[64px] max-w-full laptop:max-w-[600px]'
          >
            <AnimationReveal
              x={-25}
              y={0}
              delay={0.2}
              duration={0.4}
              type='div'
              opacity={1}
              className='absolute hidden laptop:block top-0 right-0 w-[100vw] h-full bg-transparent laptop:bg-surface-background 
            z-5 rounded-br-[64px] rounded-tr-[64px] border'
            ></AnimationReveal>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.4}
              duration={0.3}
              type='figure'
              opacity={1}
              className='relative z-10 flex-none tablet:flex-1 laptop:flex-none h-[200px] tablet:h-[160px] laptop:h-[240px] rounded-[24px] overflow-hidden'
            >
              <Image
                src={thumbnailUrl}
                alt={latestVideo?.title || "YouTube Video"}
                width={500}
                height={500}
                className='w-full h-full object-cover'
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1014, 580)
                )}`}
              />
            </AnimationReveal>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.6}
              duration={0.3}
              type='div'
              opacity={1}
              className='relative z-10 flex-1 laptop:w-full flex flex-col gap-2 tablet:gap-5 pb-0 laptop:pb-3'
            >
              <div className='flex-1 flex flex-col gap-2 pb-3 laptop:pb-0'>
                <span
                  className='text-terciary-foreground text-[10px] leading-[180%] font-medium 
              uppercase tracking-[0.6px]'
                >
                  YouTube Video
                </span>
                <h5 className='text-primary-foreground tracking-[-0.78px] line-clamp-2'>
                  {decodeHtmlEntities(latestVideo?.title || "Latest Video")}
                </h5>
              </div>

              <LinkButton
                href={latestVideo?.url || CONTACT_INFO.youtubeLink}
                text='Watch on YouTube'
                customClassName='btn-primary-fill-alpha-variant rounded-full [&_figure]:text-icon-primary-button
            overflow-hidden justify-center py-3 px-6 gap-2 flex laptop:hidden'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
                showLeftIcon={true}
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                leftIcon={Play}
                iconSize={10}
                iconClassName='size-[18px]! w-auto'
                target='_blank'
                rel='noopener noreferrer'
              />
            </AnimationReveal>

            <AnimationReveal
              x={0}
              y={5}
              delay={0.8}
              duration={0.5}
              type='div'
              opacity={1}
              className='relative z-10 hidden laptop:flex flex-row gap-2 dark'
            >
              <LinkButton
                href={latestVideo?.url || CONTACT_INFO.youtubeLink}
                text='Watch on YouTube'
                customClassName='btn-primary-fill-alpha-variant flex-1 rounded-full [&_figure]:text-icon-primary-button
            overflow-hidden justify-center py-3 px-6 gap-2'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
                showLeftIcon={true}
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                leftIcon={Play}
                iconClassName='size-[18px]! w-auto'
                target='_blank'
                rel='noopener noreferrer'
              />
              <LinkButton
                href={CONTACT_INFO.youtubeLink}
                text='Subscribe Now'
                customClassName='btn-primary-outline-alpha-variant rounded-full [&_figure]:background-primary-button
            overflow-hidden justify-center py-3 px-6 gap-1'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap'
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                iconClassName='size-[18px]! w-auto'
                target='_blank'
                rel='noopener noreferrer'
              />
            </AnimationReveal>
          </article>

          <PodcastList
            className='flex laptop:hidden dark bg-transparent tablet:bg-surface-container-background 
            px-1! tablet:px-9! laptop:px-16 py-5! rounded-2xl'
            videos={remainingVideos}
            title='More Videos'
            kicker='Watch on YouTube'
          />

          <PodcastList
            className='hidden laptop:flex'
            videos={remainingVideos}
            title='More Videos'
            kicker='Watch on YouTube'
          />
        </div>
      </div>
    </section>
  );
};
