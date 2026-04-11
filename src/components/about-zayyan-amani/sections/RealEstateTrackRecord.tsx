import { Note } from "@/components/common/text/Note";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import Image from "next/image";
import React from "react";

export const RealEstateTrackRecord = () => {
  return (
    <section
      className='relative overflow-hidden inner-border-bottom shadow-secondary-stroke 
      bg-surface-container-background dark'
    >
      <div
        className='max-w-[1440px] mx-auto flex flex-col-reverse tablet:flex-row-reverse laptop:flex-row spacing-padding-x 
      spacing-padding-y gap-[16px] tablet:gap-[24px] laptop:gap-[40px]'
      >
        <div
          className='flex-none laptop:flex-1 w-[100vw] tablet:w-[260px] laptop:w-auto h-[260px] tablet:h-[260px] 
          laptop:h-[270px] relative self-center'
        >
          <AnimationReveal
            x={0}
            y={0}
            delay={0.2}
            duration={0.5}
            opacity={1}
            whileInView={true}
            type='figure'
            className='absolute px-0 laptop:px-2 translate-y-0 tablet:translate-y-[-50%] w-full tablet:w-[478px] 
            h-[500px] tablet:h-[500px] laptop:w-auto laptop:h-auto 
            top-0 tablet:top-1/2 left-0'
          >
            <Image
              src='/images/about-zayyan-amani/zayyan-grid-photos.webp'
              alt='Real Estate Track Record'
              width={800}
              height={800}
              className='object-cover w-full h-full mobile:h-auto'
            />
          </AnimationReveal>
        </div>
        <div
          className='flex-none tablet:flex-1 flex flex-col pb-2.5 pl-0 laptop:pl-2.5 pt-2.5 pr-0 laptop:pr-[40px] 
          gap-[34px] self-center laptop:self-auto'
        >
          <AnimationReveal
            x={0}
            y={0}
            delay={0.4}
            duration={0.5}
            opacity={1}
            whileInView={true}
            type='p'
            className='laptop:flex-1 text-terciary-foreground text-[15px] leading-[180%] font-normal tracking-normal'
          >
            By his mid-twenties, Zayyan had launched his own real estate
            ventures, gaining hands-on experience across deal sourcing,
            brokering, rental strategies, and asset control.
          </AnimationReveal>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.6}
            duration={0.5}
            opacity={1}
            whileInView={true}
            type='div'
          >
            <Note
              textCaption='His work spanned residential, commercial, and government-backed housing'
              hightlightText='Ultimately contributing to the management and control of property assets valued at over AED 40 million.'
            />
          </AnimationReveal>
        </div>
      </div>
    </section>
  );
};
