"use client";
import Image from "next/image";
import { About } from "../../common/sections/About";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { useState } from "react";
import { VideoOptimized } from "../VideoOptimized";

export const HeroHome = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className='relative overflow-hidden dark'>
      {/* Background Image */}
      <figure className='absolute inset-0 z-0 bg-surface-container-background '>
        <Image
          src='/images/home/hero-background.webp'
          alt='Hero background'
          fill
          priority={true}
          className='object-cover animate-fade-in-up'
          sizes='100vw'
        />
      </figure>

      {/* Gradient Overlay */}
      <div
        className='absolute inset-0 z-5'
        style={{
          background: `linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 50%, var(--color-stops-gray-100, #000) 100%)`,
        }}
      />

      {/* Content */}
      <div
        className='relative max-w-[1440px] mx-auto flex items-center laptop:items-start flex-col pb-16 pt-[112px] laptop:pt-[144px] 
      spacing-padding-x laptop:px-20 gap-10 z-50'
      >
        {/* Gradient Overlay */}
        <div
          className='hidden tablet:block laptop:hidden absolute top-0 left-0 w-full h-full -z-1'
          style={{
            background: `linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 0%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%)`,
          }}
        ></div>
        <div
          className='block tablet:hidden absolute top-0 left-0 w-full h-full -z-1'
          style={{
            background: `linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 50%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%)`,
          }}
        ></div>

        {/* Two-column layout: Text + Video */}
        <div className='flex flex-col laptop:flex-row items-center laptop:items-start w-full gap-10'>
          {/* Left column: Text content */}
          <div className='flex-1 flex flex-col items-center laptop:items-start gap-4 self-auto laptop:self-center'>
            {/* <div className='flex flex-row gap-2.5 items-center'>
              <p
                className='text-primary-foreground text-[12px] uppercase font-medium tracking-[0.96px] 
                leading-[180%] hidden tablet:block'
              >
                Welcome to Savante Realty
              </p>
              
              <TrustCounter rating={5} size='medium' />
            </div> */}
            <div className='flex flex-col gap-0 items-center laptop:items-start 
            animate-fade-in laptop:animate-fade-in-left delay-300 laptop:delay-300'>
              <h2 className='text-primary-foreground font-semibold tracking-[-1.2px] text-center laptop:text-left font-plus'>
                Your Gateway to Smart UAE{" "}
                <span className='inline tablet:hidden'>
                  Property Investment
                </span>
              </h2>
              <h1 className='text-primary-foreground tracking-[-1.2px] italic hidden tablet:block'>
                Property Investment
              </h1>
            </div>
            <p
              className='text-primary-foreground text-[12px] uppercase font-medium tracking-[0.96px] 
                leading-[180%] block tablet:hidden animate-fade-in delay-1000'
            >
              Welcome to Savante Realty
            </p>
            <p
              className='text-primary-foreground text-[15px] leading-[180%] w-fit 
              max-w-[500px] font-plus text-center laptop:text-left 
              animate-fade-in laptop:animate-fade-in-left delay-500 laptop:delay-500'
            >
              End-to-end support for investors and relocators. From off-plan
              opportunities to visas, banking, and tenant management.
            </p>

            {/* CTA Button */}
            <TextButton
              text='Get in Touch'
              state='default'
              customClassName='btn-primary-fill-variant w-full tablet:w-auto justify-center py-3 px-6 rounded-4xl mt-4
              animate-fade-in-up delay-700'
              textClassName='uppercase text-[12px] tracking-[0.96px] leading-[140%] font-medium'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              animateIcon={true}
              iconAnimation='rotate'
              onClick={() => setIsContactModalOpen(true)}
              iconSize={18}
              iconClassName='text-icon-primary-button'
            />
          </div>

          {/* Right column: VSL Video */}
          <VideoOptimized
            thumbnailUrl='/images/home/video-thumbnail.webp'
            className='animate-fade-in delay-900'
          />
        </div>
      </div>

      <About />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};
