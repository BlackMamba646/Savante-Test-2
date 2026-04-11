import Rating from "@/components/common/text/Rating";
import { TrustCounter } from "@/components/common/text/TrustCounter";
import { GoogleMinimal } from "@/components/shared/icons/google-minimal";
import { GoogleLogo } from "@/components/shared/icons/logo/google-logo";
import { Quotes } from "@/components/shared/icons/quotes";

export const About = () => {
  return (
    <article
      className='relative flex flex-col laptop:flex-row gap-4 laptop:gap-10 pt-[24px] laptop:pt-10 pb-10 w-auto laptop:w-11/12 max-w-[1360px] mx-auto z-10
      border-t-[1px] border-secondary-stroke spacing-padding-x laptop:px-0'
    >
      <header className='flex flex-row items-center laptop:items-start justify-between'>
        <figure className='relative text-primary-foreground h-[22px] laptop:h-[34px] hidden tablet:block'>
          <Quotes />
        </figure>
        <div className='flex flex-row items-center gap-3 laptop:hidden'>
          <div className='flex flex-row gap-2.5 items-center'>
            <p className='font-geist leading-[100%] text-secondary-foreground text-[15px] tablet:text-[15px] font-medium'>
              5.0
            </p>
            <Rating rating={5} size={16} numberOfStars={1} className='flex' />
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
      </header>
      <div className='flex-1 flex flex-col gap-2 laptop:gap-0'>
        <blockquote className='text-secondary leading-[180%] tracking-[0.8px] uppercase quote-text font-crimson'>
          Their market knowledge and communication were top-notch.
        </blockquote>
        <p
          className='text-secondary text-[12px] tablet:text-[10px] leading-[200%] tablet:leading-[180%] normal-case 
          tablet:uppercase font-normal tablet:font-medium tracking-normal tablet:tracking-[0.6px]'
        >
          I highly recommend Savante to anyone buying or selling a home.
        </p>
      </div>
      <div className='hidden laptop:block'>
        <TrustCounter rating={5} size='big' />
      </div>
    </article>
  );
};
