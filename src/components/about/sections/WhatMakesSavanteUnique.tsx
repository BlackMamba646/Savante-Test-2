import { Note } from "@/components/common/text/Note";
import { SmallLogo } from "@/components/shared/icons/logo/small-logo";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

export const WhatMakesSavanteUnique = () => {
  return (
    <section className='relative bg-surface-container-background overflow-hidden'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-20
        spacing-gap gap-4 laptop:gap-20 flex flex-col laptop:flex-row items-start laptop:items-center'
      >
        <div className='flex-1 flex flex-col gap-6 tablet:gap-16 items-start'>
          <div className='flex flex-col gap-4 items-start'>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.2}
              duration={0.3}
              opacity={1}
              type='figure'
              className='relative block h-[32px]'
            >
              <SmallLogo />
            </AnimationReveal>
            <AnimationReveal
              x={-5}
              y={0}
              delay={0.4}
              duration={0.3}
              opacity={1}
              type='h2'
              className='text-primary-foreground tracking-[-1.38px] font-crimson'
            >
              What Makes Savante Realty Unique
            </AnimationReveal>
          </div>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.6}
            duration={0.3}
            opacity={1}
            type='p'
            className='text-terciary-foreground text-[15px] leading-[180%] tracking-normal max-w-full 
          tablet:max-w-[700px]'
          >
            At Savante Realty, we are committed to providing a seamless and
            stress-free experience for our clients. We are a team of experienced
            real estate professionals who are dedicated to helping you find the
            perfect home or investment property.
          </AnimationReveal>
        </div>
        <AnimationReveal
          x={5}
          y={0}
          delay={0.8}
          duration={0.3}
          opacity={1}
          type='div'
          className='max-w-full laptop:max-w-[440px]'
        >
          <Note
            textCaption='Our advisors, operations team, and partners work together to deliver a seamless experience.'
            hightlightText='Combining market insight, legal and financial coordination, and post-purchase support under one roof.'
            bodyText='This structure allows us to move faster, reduce friction, and provide clearer guidance at every stage.'
          />
        </AnimationReveal>
      </div>
    </section>
  );
};
