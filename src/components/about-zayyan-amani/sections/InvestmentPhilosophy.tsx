import { Quotes } from "@/components/shared/icons/quotes";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

export const InvestmentPhilosophy = () => {
  return (
    <section className='relative overflow-hidden'>
      <div
        className='max-w-[1440px] mx-auto flex flex-col laptop:flex-row spacing-padding-x spacing-padding-y 
      gap-[20px] tablet:gap-[40px] laptop:gap-[64px]'
      >
        <article
          className='flex-none laptop:flex-1 flex flex-col px-0 laptop:spacing-padding-x 
        pt-5 pb-5 laptop:pb-0 gap-5'
        >
          <AnimationReveal
            x={-5}
            y={0}
            delay={0.2}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='h2'
            className='text-primary-foreground font-crimson tracking-[-1.38px]'
          >
            Philosophy Rooted in Clarity and Conviction
          </AnimationReveal>
          <AnimationReveal
            x={-5}
            y={0}
            delay={0.4}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='flex flex-col gap-5 max-w-full laptop:max-w-[580px]'
          >
            <p className='text-terciary-foreground text-[15px] leading-[180%] tracking-normal'>
              Zayyan&apos;s approach to real estate is built on one core belief:
              better decisions come from better understanding.
            </p>
            <p className='text-terciary-foreground text-[15px] leading-[180%] tracking-normal'>
              Many investors enter new markets with uncertainty, assumptions, or
              incomplete information. Zayyan&apos;s role is to close those
              knowledge gaps, using data, historical context, and on-the-ground
              insight to reduce risk and build confidence before any decision is
              made.
            </p>
          </AnimationReveal>
        </article>
        <AnimationReveal
          x={0}
          y={5}
          delay={0.6}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='div'
          className='flex-none laptop:flex-1 flex flex-col gap-2 laptop:gap-5 py-2 
          max-w-full laptop:max-w-[720px] self-start laptop:self-end 
          pl-0 laptop:pl-5 pr-0 laptop:pr-10'
        >
          <figure className='relative text-primary-foreground h-[22px] tablet:h-[28px] laptop:h-[34px] my-2 self-start'>
            <Quotes />
          </figure>
          <p className='text-terciary-foreground text-[10px] leading-[180%] tracking-[0.6px] uppercase'>
            He believes real estate should never be sold through pressure or
            urgency, but through education, transparency, and long-term
            thinking.
          </p>
          <p
            className='text-accent-solid quote-text leading-[180%] tracking-[0.8px] uppercase 
                font-crimson'
          >
            Every recommendation is shaped by fundamentals: market demand,
            regulatory strength, cash-flow potential, and long-term
            sustainability.
          </p>
        </AnimationReveal>
      </div>
    </section>
  );
};
