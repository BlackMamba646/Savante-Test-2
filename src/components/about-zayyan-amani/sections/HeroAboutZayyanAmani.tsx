"use client";
import Image from "next/image";
import { TextButton } from "../../common/button/TextButton";
import { ArrowUpRight } from "../../shared/icons/arrow-up-right";
import { ThePropertyGuy } from "../ThePropertyGuy";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { useState } from "react";

export const HeroAboutZayyanAmani = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <section className='relative overflow-hidden dark'>
      <ContactModal
        isOpen={isContactModalOpen}
        title='Get in touch with me'
        onClose={() => setIsContactModalOpen(false)}
      />
      {/* Background Image */}
      <figure className='absolute inset-0 z-0 bg-surface-container-background '>
        <Image
          src='/images/about-zayyan-amani/hero-about-zayyan-amani-background.webp'
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
        className='relative max-w-[1440px] mx-auto flex flex-col laptop:flex-row pb-20 pt-[112px] laptop:pt-[144px] 
      spacing-padding-x laptop:px-20 gap-10 z-50 items-start tablet:items-center laptop:items-start'
      >
        <div className='flex-1 flex flex-col gap-3 items-start tablet:items-center laptop:items-start'>
          <figure className='relative'>
            <ThePropertyGuy />
          </figure>
          <div className='pt-5'>
            <h2
              className='text-center laptop:text-start text-primary-foreground font-semibold tracking-[-0.92px] 
            font-plus animate-fade-in-up laptop:animate-fade-in-left animate-distance-xs delay-100 duration-300'
            >
              Meet Zayyan Amani
            </h2>
          </div>
          <div
            className='hidden laptop:block w-[32px] h-[1px] bg-accent-solid
          animate-fade-in-left animate-distance-xs delay-200 duration-300'
          ></div>
        </div>
        <div className='flex-1 flex flex-col items-start tablet:items-center laptop:items-start gap-[24px]'>
          <div className='w-[32px] h-[1px] bg-accent-solid'></div>
          <p
            className='text-start tablet:text-center laptop:text-start text-primary-foreground text-[15px] leading-[180%] 
          max-w-[500px] font-crimson animate-fade-in delay-300 duration-300'
          >
            Real estate advisor, investor, and founder focused on helping people
            build, protect, and grow wealth through informed property decisions
            in Dubai.
          </p>
          <div className='animate-fade-in-up animate-distance-xs delay-500 duration-300'>
            <TextButton
              text='Contact us'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-max 
            self-start tablet:self-center laptop:self-start'
              textClassName='uppercase text-[12px] tracking-[0.96px] font-medium'
              iconClassName='text-icon-primary-button'
              animateIcon={true}
              onClick={() => setIsContactModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
