import { LinkButton } from "@/components/common/button/LinkButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { YoutubeLogo } from "@/components/shared/icons/logo/youtube-logo";
import { Youtube } from "@/components/shared/icons/youtube";
import { CONTACT_INFO } from "@/config/constant.config";
import Image from "next/image";
import Link from "next/link";

const staticVideos = [
  {
    id: "np39GDLVI1U",
    title:
      "Rarest Off-plan opportunity in Dubai/RAK - 100% + Miraggio Source of Fate",
    thumbnail: "https://img.youtube.com/vi/np39GDLVI1U/maxresdefault.jpg",
  },
  {
    id: "73itjiyxQr4",
    title: "THE BEST OFFPLAN IN RAK Miraggio RAK wynn Casino",
    thumbnail: "https://img.youtube.com/vi/73itjiyxQr4/maxresdefault.jpg",
  },
  {
    id: "W7pvlIMRVJk",
    title: "Why Millionaires are investing in RAK Wynn Casino Al Marjan",
    thumbnail: "https://img.youtube.com/vi/W7pvlIMRVJk/maxresdefault.jpg",
  },
  {
    id: "ef8xU79fib4",
    title:
      "Millionaires buying Jacob & Co Residences - LAUNCH Al Marjan Island, Wynn Casino RAK",
    thumbnail: "https://img.youtube.com/vi/ef8xU79fib4/maxresdefault.jpg",
  },
];

export const YoutubeChannelStatic = () => {
  return (
    <section className='relative overflow-hidden bg-surface-container-background'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-[64px] 
        flex flex-col gap-10'
      >
        <Link
          href={`https://www.youtube.com/watch?v=${staticVideos[0].id}`}
          target='_blank'
          rel='noopener noreferrer'
          className='relative self-center aspect-video outline-[2px] tablet:outline-[4px] 
          laptop:outline-[6px] outline-surface-background 
          rounded-xl tablet:rounded-2xl laptop:rounded-3xl overflow-hidden video-card-border w-full max-w-[1104px]
          group block'
          aria-label={`Watch ${staticVideos[0].title} in YouTube`}
        >
          <Image
            src={staticVideos[0].thumbnail}
            alt={staticVideos[0].title}
            width={1104}
            height={621}
            className='w-full h-full object-cover'
          />
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 
        transition-transform duration-300 ease-out pointer-events-none'
          >
            <figure className='relative h-[48px]'>
              <YoutubeLogo />
            </figure>
          </div>
        </Link>

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

        {/* Video cards */}
        <ul className='flex flex-row gap-3 w-full'>
          {staticVideos.slice(1).map((video) => (
            <li
              key={video.id}
              className='flex-1 rounded-xl tablet:rounded-2xl laptop:rounded-3xl border-[0px]
              tablet:border-[4px] laptop:border-[6px] border-surface-background
              overflow-hidden shadow-xl aspect-video group last:hidden tablet:last:block'
            >
              <Link
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='relative block w-full h-full'
                aria-label={`Watch ${video.title} in YouTube`}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={430}
                  height={240}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                />
                <div
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 
        transition-transform duration-300 ease-out pointer-events-none'
                >
                  <figure className='relative h-[40px]'>
                    <YoutubeLogo />
                  </figure>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
