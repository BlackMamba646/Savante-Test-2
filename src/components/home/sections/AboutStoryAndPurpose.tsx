import { Note } from "@/components/common/text/Note";
import { Quotes } from "@/components/shared/icons/quotes";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

export const AboutStoryAndPurpose = () => {
  return (
    <section className='relative flex flex-col pb-[56px] dark space-y-0 laptop:-space-y-10'>
      <div
        className='relative pt-[20px] laptop:pt-[64px] spacing-padding-x tablet:px-[64px] pb-[20px] laptop:pb-[252px] 
        h-[300px] laptop:h-auto'
      >
        <div
          className='absolute hidden laptop:block top-0 left-0 w-full h-full z-5'
          style={{
            background: `linear-gradient(90deg, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 0%, var(--color-stops-gray-20, rgba(0, 0, 0, 0.20)) 50%), url("https://savante.propphy.com/uploads/Airbrush_image_extender_9cc33d2d91.jpeg") lightgray 50% / cover no-repeat`,
          }}
        ></div>

        <div
          className='absolute block laptop:hidden top-0 left-0 w-full h-full z-5'
          style={{
            background: `linear-gradient(180deg, var(--color-stops-gray-20, rgba(0, 0, 0, 0.20)) 50%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%), url("https://savante.propphy.com/uploads/Airbrush_image_extender_9cc33d2d91.jpeg") lightgray 50% / cover no-repeat`,
          }}
        ></div>

        <AnimationReveal
          x={-5}
          y={0}
          delay={0.5}
          duration={0.3}
          opacity={1}
          type='header'
          className='relative max-w-[1440px] mx-auto flex flex-col gap-1 z-50 justify-end 
          laptop:justify-start h-full laptop:h-auto'
        >
          <span className='text-terciary-foreground text-[12px] leading-[180%] font-medium uppercase tracking-[0.96px]'>
            Visualize your property investment returns
          </span>
          <h2 className='text-primary-foreground tracking-[-1.38px]'>
            Our Story & Purpose
          </h2>
        </AnimationReveal>
      </div>

      <article
        className='relative rounded-none laptop:rounded-3xl py-[34px] laptop:spacing-padding-y 
        spacing-padding-x laptop:px-[64px] bg-surface-container-background 
        max-w-[1380px] w-full mx-auto gap-10 z-80'
      >
        <div className='flex flex-col laptop:flex-row gap-10 laptop:gap-20'>
          <AnimationReveal
            x={-5}
            y={0}
            delay={0.7}
            duration={0.3}
            opacity={1}
            type='div'
            className='flex flex-col gap-2 laptop:gap-5 py-2 max-w-[720px] flex-1'
          >
            <figure className='relative text-primary-foreground h-[22px] laptop:h-[34px] my-2 self-start'>
              <Quotes />
            </figure>
            <div className='flex flex-col gap-2'>
              <p
                className='text-accent-solid quote-text leading-[180%] tracking-[0.8px] uppercase 
                font-crimson'
              >
                Our goal is to make your investment journey seamless,
                transparent, and rewarding.
              </p>
              <p className='text-terciary-foreground text-[14px] leading-[180%] tracking-normal'>
                CEO Zayyan Amani
              </p>
            </div>
          </AnimationReveal>
          <div className='flex-1 flex flex-col gap-10'>
            <AnimationReveal
              x={0}
              y={5}
              delay={0.9}
              duration={0.3}
              opacity={1}
              type='p'
              className='text-secondary text-[15px] leading-[180%] tracking-normal'
            >
              Savante Realty was built on the belief that investing or
              relocating to the UAE should be seamless, transparent, and
              empowering. Led by CEO Zayyan Amani, our founders bring over two
              decades of combined experience in real estate, business setup, and
              client advisory, creating a firm that goes far beyond traditional
              property sales.
            </AnimationReveal>
            <AnimationReveal
              x={0}
              y={5}
              delay={1.0}
              duration={0.3}
              opacity={1}
              type='p'
              className='text-secondary text-[15px] leading-[180%] tracking-normal'
            >
              Zayyan’s vision is rooted in providing a smarter, more supportive
              pathway for global investors and new residents. His hands-on
              leadership ensures that every client receives personalised
              guidance and access to the UAE’s most promising opportunities.
            </AnimationReveal>
          </div>
        </div>
      </article>
    </section>
  );
};
