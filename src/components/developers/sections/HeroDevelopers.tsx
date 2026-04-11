import { TrustCounter } from "@/components/common/text/TrustCounter";
import { SearchAgents } from "@/components/our-team/SearchAgents";
import Image from "next/image";
import { SearchDevelopers } from "../SearchDevelopers";

export const HeroDevelopers = () => {
  return (
    <section className='relative dark'>
      <figure className='absolute inset-0 z-0 bg-surface-container-background '>
        <Image
          src='/images/developers/hero-developers-background.webp'
          alt='Hero background'
          fill
          priority={true}
          className='object-cover'
          sizes='100vw'
        />
      </figure>

      {/* Gradient Overlay */}
      <div
        className='absolute inset-0 z-5'
        style={{
          background: `linear-gradient(180deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%)`,
        }}
      />

      <div
        className='relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center items-center h-full 
        pt-[112px] pb-[96px] tablet:pb-[40px] spacing-padding-x spacing-gap'
      >
        <div className='flex flex-col gap-2.5 pt-12 tablet:pt-10 items-center w-full tablet:w-auto'>
          <div className='w-[48px] h-[1px] bg-accent-solid animate-fade-in delay-100'></div>
          <div className='flex flex-col gap-1 items-center animate-fade-in-up delay-300
            animate-distance-xs duration-300'>
            <h1 className='text-primary-foreground tracking-[-1.8px] text-center'>
              Developers in Dubai
            </h1>
            <TrustCounter
              rating={5}
              size='medium'
            />
          </div>
        </div>
        <SearchDevelopers />
      </div>
    </section>
  );
};
