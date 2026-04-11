import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import { extractVideoId } from "@/utils/utils";
import { YoutubeVideo } from "@/components/shared/components/YoutubeVideo";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface OverviewProps {
  title?: string;
  firstSubtitle?: string;
  firstDescription?: string;
  contentImage?: string;
  secondSubtitle?: string;
  secondDescription?: string;
  youtubeUrl?: string;
}

export const Overview = ({
  title,
  firstSubtitle,
  firstDescription,
  contentImage,
  secondSubtitle,
  secondDescription,
  youtubeUrl,
}: OverviewProps) => {
  return (
    <section id='overview' className='relative pt-16'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.1}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='span'
            className='text-primary-foreground text-[12px] font-medium leading-[180%] 
          uppercase tracking-[0.96px]'
          >
            Overview
          </AnimationReveal>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.3}
            duration={0.5}
            opacity={1}
            whileInView={true}
            type='h3'
            className='text-primary-foreground tracking-[-1.6px] leading-[140%] 
            line-clamp-2 font-medium'
          >
            {title}
          </AnimationReveal>
          <div className='w-[48px] h-[1px] bg-accent-foreground'></div>
        </div>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.3}
          duration={0.5}
          opacity={1}
          className='flex flex-col pt-2.5 gap-2.5'
        >
          <p
            className='text-secondary text-[12px] font-medium leading-[180%] 
            uppercase tracking-[0.96px]'
          >
            {firstSubtitle}
          </p>
          <p className='text-secondary leading-[180%] text-[14px] tablet:text-[15px] font-montserrat'>
            {firstDescription}
          </p>
        </AnimationReveal>
        {youtubeUrl ? (
          <YoutubeVideo
            videoId={extractVideoId(youtubeUrl)}
            title={title || ""}
            description={firstDescription + "YouTube video by " + title}
            className='w-full h-full object-cover'
            rel='preload'
          />
        ) : (
          <AnimationReveal
            x={0}
            y={0}
            delay={0.7}
            duration={0.3}
            opacity={1}
            type='figure'
            className='h-[320px] w-full'
          >
            <Image
              src={ENVIRONMENT.API_URL + (contentImage || "")}
              alt={title || ""}
              width={1100}
              height={600}
              className='h-full object-cover w-full'
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1014, 580)
              )}`}
            />
          </AnimationReveal>
        )}
        <AnimationReveal
          x={-10}
          y={0}
          delay={0.5}
          duration={0.3}
          opacity={1}
          className='flex flex-col gap-2.5'
        >
          <p className='text-secondary quote-text font-semibold leading-[160%] tracking-[-0.4px]'>
            {secondSubtitle}
          </p>
          <p className='text-secondary leading-[180%] text-[14px] tablet:text-[15px] font-montserrat'>
            {secondDescription}
          </p>
        </AnimationReveal>
      </div>
    </section>
  );
};
