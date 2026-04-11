import { LogosList } from "@/components/common/list/LogosList";
import { Features } from "@/components/common/sections/Features";
import { BigStatsLeft } from "@/components/common/text/BigStatsLeft";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import React from "react";

export const AboutSavanteRealty = () => {
  return (
    <section className='relative overflow-hidden'>
      <div className='max-w-[1440px] mx-auto py-0 laptop:py-[34px] px-0 flex flex-col laptop:flex-row gap-0'>
        <article
          className='flex-1 flex flex-col gap-[20px] laptop:gap-[34px] spacing-padding-x spacing-padding-y 
          laptop:py-[64px] laptop:px-[80px]'
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
            The Face Behind Savante Realty
          </AnimationReveal>
          <div className='hidden laptop:flex flex-row gap-5 pt-4 items-center'>
            <div className='flex-1 flex flex-col gap-4'>
              <LogosList />
              <AnimationReveal
                x={0}
                y={5}
                delay={0.5}
                duration={0.3}
                opacity={1}
                whileInView={true}
                type='p'
                className='text-secondary leading-[140%] quote-text 
              tracking-[-0.4px] font-semibold max-w-[280px]'
              >
                Direct Access to Top UAE Developers
              </AnimationReveal>
            </div>
            <BigStatsLeft
              title='Years of experience'
              value='20+'
              className='laptop:max-w-[160px]!'
            />
            <BigStatsLeft
              title='Clients successfully guided'
              value='100+'
              largeLabel
              className='laptop:max-w-[226px]!'
            />
          </div>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.7}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='p'
            className='text-terciary-foreground text-[15px] leading-[180%]'
          >
            With a background shaped by hands-on market experience and close
            collaboration with leading developers, Zayyan brings a practical,
            client-first approach to every transaction. His focus goes beyond
            property selection, ensuring each client is properly set up with the
            right strategy, support, and long-term perspective.
          </AnimationReveal>
        </article>
        <Features className='block laptop:hidden' />
        <AnimationReveal
          x={10}
          y={0}
          delay={0.9}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='figure'
          className='relative w-full max-w-full laptop:max-w-[500px] h-[320px] tablet:h-[500px] laptop:h-auto laptop:rounded-tl-3xl laptop:rounded-bl-3xl 
          overflow-hidden mx-auto rounded-none'
        >
          <Image
            src='/images/about/zayyan-about.webp'
            alt='Savante Realty'
            fill
            className='object-cover w-full h-full'
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(100, 100)
            )}`}
          />
        </AnimationReveal>
      </div>
    </section>
  );
};
