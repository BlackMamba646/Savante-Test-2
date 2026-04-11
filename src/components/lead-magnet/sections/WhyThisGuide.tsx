"use client";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { guideData } from "@/data/guide";
import React from "react";
import { FeatureItem } from "../FeatureItem";
import { Check } from "@/components/shared/icons/check";

export const WhyThisGuide = () => {
  return (
    <section className='relative bg-surface-container-background overflow-hidden'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-20 flex 
      flex-col laptop:flex-row gap-[20px] tablet:gap-[36px] laptop:gap-10'
      >
        <div className='flex-1 flex flex-col gap-[26px] py-5 max-w-[600px]'>
          <h4 className='text-primary-foreground tracking-[-1.08px] font-crimson text-center tablet:text-left'>
            Why This Guide Is Worth Your Time
          </h4>
          <TextButton
            text='Get the Free Guide'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-max self-start hidden tablet:flex'
            textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
            animateIcon={true}
            iconAnimation='rotate'
            iconRotation={45}
          />
        </div>
        <ul
          className='flex-1 grid grid-cols-1 tablet:grid-cols-2 grid-rows-[auto] tablet:grid-rows-3 gap-y-[16px] 
          gap-x-[34px] self-start pl-2.5 pr-10 list-none'
        >
          {guideData.map((item) => (
            <FeatureItem
              key={item.id}
              type='item-text'
              text={item.title}
              icon={<Check size={10} />}
              className='[&_p]:text-[14px]'
            />
          ))}
        </ul>
        <TextButton
          text='Get the Free Guide'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-full 
          self-auto flex tablet:hidden justify-center'
          textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
          animateIcon={true}
          iconRotation={45}
        />
      </div>
    </section>
  );
};
