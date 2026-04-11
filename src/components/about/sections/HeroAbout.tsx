"use client";
import { TextButton } from "@/components/common/button/TextButton";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { About } from "@/components/common/sections/About";
import Rating from "@/components/common/text/Rating";
import { TrustCounter } from "@/components/common/text/TrustCounter";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { GoogleMinimal } from "@/components/shared/icons/google-minimal";
import Image from "next/image";
import React, { useState } from "react";

export const HeroAbout = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className='relative overflow-hidden dark'>
      {/* Background Image */}
      <figure className='absolute inset-0 z-0 bg-surface-container-background '>
        <Image
          src='/images/about/hero-about-background.webp'
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

      {/* Content */}
      <div
        className='relative max-w-[1440px] mx-auto flex items-center laptop:items-start flex-col pb-16 pt-[112px] laptop:pt-[128px] 
      spacing-padding-x laptop:px-20 gap-10 z-50'
      >
        <div className='flex flex-col gap-6 items-center w-full'>
          <div className='flex flex-col gap-2.5 items-center pt-[20px]'>
            <div
              className='flex flex-row gap-2.5 items-center animate-fade-in delay-100'
            >
              <p
                className='text-primary-foreground text-[12px] uppercase font-medium tracking-[0.96px] 
                leading-[180%]'
              >
                Welcome to Savante Realty
              </p>
              {/* Trust counter component */}
              <div className='hidden tablet:block'>
                <TrustCounter rating={5} size='medium' />
              </div>
            </div>
            <h2 className='text-primary-foreground font-semibold tracking-[-0.92px] text-center 
            laptop:text-left font-plus animate-fade-in-up animate-distance-xs duration-300 delay-300'>
              Built on Expertise, Driven by Results
            </h2>
            <div className='flex flex-row items-center gap-3 tablet:hidden'>
              <div className='flex flex-row gap-2.5 items-center'>
                <p className='font-geist leading-[100%] text-secondary-foreground text-[15px] tablet:text-[15px] font-medium'>
                  5.0
                </p>
                <Rating
                  rating={5}
                  size={16}
                  numberOfStars={1}
                  className='flex'
                />
              </div>
              <div className='flex flex-row gap-1.5 items-end'>
                <p className='leading-[100%] text-secondary text-[12px] italic font-crimson opacity-80'>
                  Reviews
                </p>
                <figure className='py-[2px] text-accent-foreground'>
                  <GoogleMinimal />
                </figure>
              </div>
            </div>
          </div>
          {/* Separator */}
          <div className='w-[48px] h-[1px] bg-accent-solid'></div>
          <p className='text-center text-primary-foreground text-[15px] leading-[180%] w-fit 
          max-w-[500px] font-crimson animate-fade-in delay-500'>
            Savante Realty is a modern real estate advisory offering end-to-end
            support for investors and residents looking to establish themselves
            in the UAE.
          </p>
        </div>
        <TextButton
          text='Contact us'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-max self-center
          animate-fade-in delay-700'
          textClassName='uppercase text-[12px] tracking-[0.96px] font-medium'
          animateIcon={true}
          iconAnimation='rotate'
          iconRotation={45}
          iconClassName='text-icon-primary-button'
          onClick={() => setIsContactModalOpen(true)}
        />
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
