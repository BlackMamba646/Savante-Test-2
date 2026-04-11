import Image from "next/image";
import React from "react";
import { TextLabel } from "../text/TextLabel";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ArrowSquareOut } from "@/components/shared/icons/arrow-square-out";
import { LinkButton } from "../button/LinkButton";
import { decodeHtmlEntities } from "@/utils/html-entities";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface PodcastCardProps {
  id: string | number;
  title: string;
  bannerImage: string;
  url: string;
  date: string;
  category: string;
  index: number;
  disableAnimation?: boolean;
}

export const PodcastCard = ({
  id,
  title,
  bannerImage,
  url,
  date,
  category,
  index,
  disableAnimation,
}: PodcastCardProps) => {
  const content = (
    <>
      <figure className='relative overflow-hidden w-[80px] tablet:w-auto tablet:min-w-[124px] h-[60px] tablet:h-[62px] self-center'>
        <Image
          src={bannerImage}
          alt={title}
          width={150}
          height={75}
          className='object-cover w-full h-full'
        />
      </figure>
      <div className='flex flex-col gap-2.5 flex-1'>
        <div className='flex flex-col gap-0'>
          <span
            className='text-terciary-foreground text-[10px] leading-[180%] font-medium 
          uppercase tracking-[0.6px]'
          >
            {category} - {date}
          </span>
          <p
            className='text-primary-foreground quote-text font-semibold leading-[140%] 
          tracking-[-0.4px] line-clamp-1 uppercase'
            title={decodeHtmlEntities(title)}
          >
            {decodeHtmlEntities(title)}
          </p>
        </div>
        <LinkButton
          href={url}
          aria-label={`Go to video ${title}`}
          target='_blank'
          rel='noopener noreferrer'
          text={"Go to video"}
          textClassName='leading-[95%] text-secondary heading-secondary'
          state='default'
          customClassName='btn-secondary-variant self-start [&_figure]:text-accent-foreground opacity-90 gap-2'
          showRightIcon={true}
          rightIcon={ArrowSquareOut}
          iconClassName='size-[18px]!'
        />
      </div>
    </>
  );

  return disableAnimation ? (
    <li className='flex flex-row gap-3 tablet:gap-5'>{content}</li>
  ) : (
    <AnimationReveal
      x={0}
      y={5}
      delay={1.1 + index * 0.1}
      duration={0.3}
      opacity={1}
      whileInView={true}
      type='li'
      className='flex flex-row gap-3 tablet:gap-5'
    >
      {content}
    </AnimationReveal>
  );
};
