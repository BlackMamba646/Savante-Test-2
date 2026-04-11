import { LeadMagnetForm } from "@/components/common/form/LeadMagnetForm";
import { ServiceForm } from "@/components/common/form/ServiceForm";
import Rating from "@/components/common/text/Rating";
import { TrustCounter } from "@/components/common/text/TrustCounter";
import { GoogleMinimal } from "@/components/shared/icons/google-minimal";
import { heroFeaturesData } from "@/data/guide";
import Image from "next/image";
import React from "react";
import { FeatureItem } from "../FeatureItem";
import { Check } from "@/components/shared/icons/check";

export const HeroLeadMagnet = () => {
  return (
    <section className='relative overflow-hidden dark'>
      {/* Background Image */}
      <figure className='absolute inset-0 z-0'>
        <Image
          src={"/images/lead-magnet/hero-lead-magnet-background.webp"}
          alt='Hero service background'
          fill
          priority={true}
          className='object-cover'
          sizes='100vw'
        />
      </figure>

      {/* Gradient Overlay */}
      <div
        className='hidden laptop:block absolute inset-0 z-5'
        style={{
          background: `linear-gradient(0deg, var(--color-stops-gray-100, #000) 0%, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 100%)`,
        }}
      />
      <div
        className='hidden tablet:block laptop:hidden absolute inset-0 z-5'
        style={{
          background: `linear-gradient(0deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-100, #000) 100%)`,
        }}
      />

      <div
        className='block tablet:hidden absolute inset-0 z-5'
        style={{
          background: `linear-gradient(0deg, var(--color-stops-gray-20, rgba(0, 0, 0, 0.20)) 0%, var(--color-stops-gray-100, #000) 100%)`,
        }}
      />

      {/* Content */}
      <div
        className='relative max-w-[1440px] mx-auto flex items-center laptop:items-start flex-col pb-[0px] tablet:pb-[64px] pt-[112px] laptop:pt-[112px] 
      px-0 tablet:spacing-padding-x gap-10 z-50'
      >
        <div className='flex flex-col laptop:flex-row items-center w-full gap-10 tablet:gap-[24px] laptop:gap-10'>
          <div className='flex-1 flex flex-col items-start gap-4 w-full laptop:w-auto pt-4 tablet:pt-10 spacing-padding-x tablet:px-0'>
            <div className='w-[48px] h-[1px] bg-accent-solid block tablet:hidden'></div>
            <div className='flex flex-col gap-2'>
              <TrustCounter
                rating={5}
                size='medium'
                className='hidden tablet:flex'
              />
              <h2 className='text-primary-foreground tracking-[-1.38px] text-left font-crimson line-clamp-4'>
                Simple Guide to Invest in Dubai
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
            <div className='w-[48px] h-[1px] bg-accent-solid hidden tablet:block'></div>
            <p
              className='text-terciary-foreground text-[14px] leading-[180%] w-fit max-w-full 
            tablet:max-w-[600px] font-plus line-clamp-3'
            >
              A practical, no-fluff resource designed to help you understand the
              fundamentals, avoid common mistakes, and take action with
              confidence.
            </p>
            <ul className='hidden laptop:grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-2.5 pt-[34px]'>
              {heroFeaturesData.map((item) => (
                <FeatureItem
                  key={item.id}
                  type='item-text'
                  text={item.title}
                  icon={<Check size={10} />}
                />
              ))}
            </ul>
          </div>
          {/* Service form */}
          <LeadMagnetForm formKey='lead-magnet-form' />
          <ul className='hidden tablet:grid laptop:hidden grid-cols-2 grid-rows-2 gap-x-5 gap-y-2.5 self-start'>
            {heroFeaturesData.map((item) => (
              <FeatureItem
                key={item.id}
                type='item-text'
                text={item.title}
                icon={<Check size={10} />}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
