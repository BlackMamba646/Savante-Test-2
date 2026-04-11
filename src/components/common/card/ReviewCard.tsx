import React from "react";
import Rating from "../text/Rating";
import { GoogleMinimal } from "@/components/shared/icons/google-minimal";
import Image from "next/image";
import { MinimalQuote } from "@/components/shared/icons/minimal-quote";

interface ReviewCardProps {
  userName?: string;
  rating?: number;
  firstParagraph?: string;
  secondParagraph?: string;
  profileImage?: string;
}

export const ReviewCard = ({
  userName,
  rating,
  firstParagraph,
  secondParagraph,
  profileImage,
}: ReviewCardProps) => {
  return (
    <div className='flex flex-col tablet:flex-row gap-2.5 select-none'>
      <div className='flex flex-row gap-3 tablet:gap-0 items-center tablet:items-start'>
        <div className='flex flex-row -space-x-[10px] tablet:-space-x-[16px]'>
          <figure className='tablet:h-[26px] h-[14px] text-accent-solid self-start relative z-10'>
            <MinimalQuote />
          </figure>
          <div className='flex tablet:pt-3 pt-1 relative z-0'>
            {profileImage ? (
              <figure className='tablet:w-[54px] tablet:h-[54px] w-[38px] h-[38px] rounded-full overflow-hidden aspect-square'>
                <Image
                  src={profileImage || "/images/profile-example.png"}
                  alt='Review 1'
                  width={54}
                  height={54}
                  className='object-cover'
                />
              </figure>
            ) : (
              <figure
                className='tablet:w-[54px] tablet:h-[54px] w-[38px] h-[38px] rounded-full 
              overflow-hidden aspect-square bg-[#7E57C2] flex items-center justify-center'
              >
                <span className='text-white text-[24px] leading-[90%] uppercase font-medium flex items-center justify-center'>
                  {userName?.charAt(0)}
                </span>
              </figure>
            )}
          </div>
        </div>
        <div className='tablet:hidden flex flex-col gap-1 flex-1'>
          <div className='flex flex-row gap-1'>
            <figure className='relative self-center'>
              <GoogleMinimal size={12} />
            </figure>
            <Rating rating={rating ?? 5} size={16} className='gap-1!' />
          </div>
          <span
            className='text-terciary-foreground text-[10px] leading-[180%] uppercase 
          tracking-[0.6px] font-medium'
          >
            {userName}
          </span>
        </div>
      </div>

      <article
        className='flex flex-col px-5 py-5 tablet:py-[26px] tablet:px-[34px] gap-[26px] rounded-3xl inner-border-all 
        max-w-[290px] tablet:max-w-[400px] laptop:max-w-[580px]'
      >
        <div className='flex flex-col gap-3 pt-2'>
          <p className='text-primary-foreground quote-text leading-[140%] tracking-[-0.4px] font-semibold line-clamp-3'>
            {firstParagraph}
          </p>
          <p className='text-terciary-foreground text-[14px] leading-[180%] tracking-normal line-clamp-3'>
            {secondParagraph}
          </p>
        </div>
        <div className='hidden tablet:flex flex-row gap-[10px] items-center inner-border-top pt-4'>
          <span
            className='text-terciary-foreground text-[12px] leading-[180%] uppercase 
          tracking-[0.96px] font-medium translate-y-[1.5px]'
          >
            {userName}
          </span>
          <Rating rating={rating ?? 5} size={16} className='gap-1!' />
          <figure className='relative self-center'>
            <GoogleMinimal size={12} />
          </figure>
        </div>
      </article>
    </div>
  );
};
