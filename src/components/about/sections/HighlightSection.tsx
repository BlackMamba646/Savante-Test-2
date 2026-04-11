import { Quotes } from "@/components/shared/icons/quotes";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

export const HighlightSection = () => {
  return (
    <section className='relative overflow-hidden dark'>
      <div
        className='absolute top-0 left-0 w-full h-full z-5'
        style={{
          background: `linear-gradient(180deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%), url(/images/about/highlight-background.webp) lightgray 50% / cover no-repeat`,
        }}
      ></div>

      <div className='relative max-w-[1440px] mx-auto spacing-padding-x laptop:px-[112px] pt-[200px] tablet:pt-[112px] pb-[48px] tablet:pb-[56px] z-50'>
        <article className='pt-16 flex flex-col gap-2 laptop:gap-5 items-start tablet:items-center'>
          <figure className='relative text-primary-foreground h-[22px] tablet:h-[28px] laptop:h-[34px] my-2'>
            <Quotes />
          </figure>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.2}
            duration={0.3}
            opacity={1}
            type='span'
            className='text-terciary-foreground text-[12px] tablet:text-[10px] normal-case tablet:uppercase
      tablet:tracking-[0.6px] tracking-normal leading-[200%] tablet:leading-[180%] font-normal tablet:font-medium'
          >
            What truly sets our team apart is a client-first mindset.
          </AnimationReveal>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.4}
            duration={0.3}
            opacity={1}
            type='p'
            className='text-accent-solid quote-text leading-[180%] tracking-[0.8px] uppercase 
          font-crimson text-start tablet:text-center'
          >
            We focus on long-term outcomes, not quick transactions, ensuring
            every recommendation is aligned with your investment goals,
            relocation plans, or business setup needs.
          </AnimationReveal>
        </article>
      </div>
    </section>
  );
};
