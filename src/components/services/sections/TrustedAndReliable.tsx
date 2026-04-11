import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import React from "react";

interface TrustedAndReliableProps {
  title?: string;
  description?: string;
  phrase?: string;
  image?: string;
}

export const TrustedAndReliable = (props: TrustedAndReliableProps) => {
  const { title, description, phrase, image } = props;

  return (
    <section className='relative bg-white overflow-hidden'>
      <div className='mx-auto spacing-padding-y spacing-padding-x flex flex-col max-w-[1440px] w-full gap-6'>
        <header className='flex flex-row items-center justify-center'>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.1}
            duration={0.3}
            type='h2'
            opacity={1}
            className='text-primary-foreground font-crimson tracking-[-1.38px] w-full text-center'
          >
            Trusted and Reliable
          </AnimationReveal>
        </header>
        <article
          className='flex flex-col laptop:flex-row gap-[26px] tablet:gap-0 rounded-none tablet:rounded-3xl 
        bg-transparent tablet:bg-surface-container-background overflow-hidden dark trusted-and-reliable-content'
        >
          <figure
            className='relative h-[280px] tablet:h-[400px] rounded-3xl tablet:rounded-none overflow-hidden 
            laptop:h-auto max-w-full laptop:max-w-[600px] w-full'
          >
            <Image
              src={ENVIRONMENT.API_URL + image}
              alt={`Trusted and Reliable image`}
              fill
              className='object-cover w-full h-full'
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(100, 100)
              )}`}
            />
          </figure>
          <div
            className='flex-1 flex flex-col gap-[26px] py-0 tablet:spacing-padding-y laptop:py-20 px-0 
            tablet:spacing-padding-x laptop:px-16'
          >
            <p
              className='text-accent-solid quote-text font-semibold max-w-[900px]
            leading-[140%] tracking-[-0.4px]'
            >
              {phrase}
            </p>
            <p
              className='text-terciary-foreground text-[15px] max-w-full laptop:max-w-[700px] 
              font-normal leading-[180%]'
            >
              {description}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
