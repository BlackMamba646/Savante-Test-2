import { ListYourPropertyForm } from "@/components/common/form/ListYourPropertyForm";
import { About } from "@/components/common/sections/About";
import { TrustCounter } from "@/components/common/text/TrustCounter";
import Image from "next/image";

export const HeroListYourProperty = () => {
  return (
    <section className='relative overflow-hidden dark'>
      {/* Background Image */}
      <figure className='absolute inset-0 z-0'>
        <Image
          src='/images/list-your-property/hero-list-your-property-background.webp'
          alt='List your property background'
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

      {/* Content */}
      <div
        className='relative max-w-[1440px] mx-auto flex items-center laptop:items-start flex-col pb-5 pt-[112px] laptop:pt-[112px] 
      spacing-padding-x laptop:px-20 gap-10 z-50'
      >
        {/* Gradient Overlay */}
        <div
          className='hidden tablet:block laptop:hidden absolute top-0 left-0 w-full h-full -z-1'
          style={{
            background: `linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 50%, var(--color-stops-gray-60, rgba(0, 0, 0, 0.80))`,
          }}
        ></div>
        <div
          className='block tablet:hidden absolute top-0 left-0 w-full h-full -z-1'
          style={{
            background: `linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 50%, var(--color-stops-gray-60, rgba(0, 0, 0, 0.80))`,
          }}
        ></div>
        <div className='flex flex-col laptop:flex-row items-center w-full gap-10'>
          <div className='flex-1 flex flex-col items-start gap-[24px] w-full laptop:w-auto'>
            <div className='flex flex-col gap-2.5 pt-0 laptop:pt-5'>
              <TrustCounter
                rating={5}
                size='medium'
                className='flex-col! gap-2! animate-fade-in delay-100 duration-300'
              />
              <h2
                className='text-primary-foreground font-semibold tracking-[-0.92px] text-left font-plus
                animate-fade-in-left delay-300 animate-distance-xs duration-300'
              >
                List Your Property With Confidence
              </h2>
            </div>
            <div className='w-[48px] h-[1px] bg-accent-solid animate-fade-in delay-500 duration-300'></div>
            <p className='text-primary-foreground text-[15px] leading-[180%] w-fit max-w-[500px] font-crimson
            animate-fade-in delay-500 duration-300'>
              Looking to sell or rent your property in the UAE? Partner with
              Savante Realty and benefit from expert market positioning,
              qualified buyers, and end-to-end support designed to maximise your
              return.
            </p>
          </div>
          {/* List your property form */}
          <ListYourPropertyForm formKey='list-your-property-form' />
        </div>
      </div>
      <About />
    </section>
  );
};
