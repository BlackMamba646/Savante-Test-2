"use client";
import Navbar from "@/components/shared/navbar/navbar";
import Image from "next/image";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { DeveloperModel } from "@/interfaces/developers-response.interface";
import { ProjectModel } from "@/interfaces/project-response.interface";
import { ENVIRONMENT } from "@/config/env.config";
import { formatFeatures } from "@/utils/utils";
import { TrustCounter } from "@/components/common/text/TrustCounter";

interface HeroDeveloperDetailProps {
  developer: DeveloperModel;
  projects: ProjectModel[];
  averageReview?: number;
  numberOfReviews?: number;
}

export const HeroDeveloperDetail = (props: HeroDeveloperDetailProps) => {
  const { developer, projects, averageReview, numberOfReviews } = props;

  const mainImageUrl =
    projects.at(0)?.attributes?.Main_image?.data?.attributes?.url;

  const backgroundImage = mainImageUrl
    ? `${ENVIRONMENT.API_URL}${mainImageUrl}`
    : "/images/developers/hero-developer-fallback-background.webp";

  const priceNumbers = projects
    .map((el: ProjectModel) => {
      const str = el.attributes.Starting_price.toString();
      if (!str) return 0;
      const num = Number(str.replaceAll(/\D/g, ""));
      return isNaN(num) ? 0 : num;
    })
    .filter((n) => n > 0);

  const startingPrice = priceNumbers.length > 0 ? Math.min(...priceNumbers) : 0;

  return (
    <div
      className='relative dark pt-[112px] tablet:pt-[112px] laptop:pt-[112px] 
      pb-[40px] tablet:pb-[80px] px-5 tablet:px-10 laptop:px-16 z-50 overflow-hidden'
    >
      <figure className='absolute inset-0 z-0 bg-surface-container-background '>
        <Image
          src={backgroundImage}
          alt='Hero background'
          fill
          priority={true}
          className='object-cover'
          sizes='100vw'
        />
      </figure>

      <div
        className='absolute top-0 left-0 w-full h-full z-5'
        style={{
          background: `linear-gradient(180deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%)`,
        }}
      ></div>

      <div className='relative z-10 max-w-[1440px] mx-auto flex flex-col h-full'>
        <div className='flex-1 flex flex-col justify-center items-center tablet:pb-0 gap-[96px] tablet:gap-[26px]'>
          <div className='flex flex-col gap-3 pt-[26px] tablet:pt-[26px] laptop:pt-10 items-center'>
            <div className='w-[48px] h-[1px] bg-accent-solid animate-fade-in delay-100 duration-300'></div>
            <div className='flex flex-col items-center gap-4 tablet:gap-2 w-full'>
              <h1
                className='text-primary-foreground text-center leading-[120%] 
                font-semibold tracking-[-1.48px] animate-fade-in-up delay-300 animate-distance-xs duration-300'
              >
                {developer.attributes.Name} New Projects
              </h1>
              <div
                className='flex flex-col gap-3 tablet:gap-0 tablet:flex-row items-start tablet:items-center
              animate-fade-in delay-500 duration-300'
              >
                <TrustCounter rating={averageReview || 5} />
              </div>
            </div>
          </div>
          <ul
            className='flex flex-col tablet:flex-row gap-y-[10px] tablet:gap-y-[20px] gap-x-[40px] items-center justify-start 
          tablet:justify-center w-full'
          >
            <li
              className='flex flex-row items-center tablet:flex-col gap-0 tablet:items-start justify-between 
            tablet:justify-start w-full tablet:w-auto animate-fade-in-up delay-700 animate-distance-xs duration-300'
            >
              <span className='text-[12px] leading-[180%] text-terciary-foreground'>
                Prices from
              </span>
              <h5 className='uppercase text-accent-foreground font-plus leading-[180%] font-semibold text-[12px] tablet:text-[18px]'>
                {startingPrice === 0 ? (
                  <span className='text-accent-foreground normal-case'>
                    Not available
                  </span>
                ) : (
                  <span>
                    {formatFeatures.formatCurrency(startingPrice)} AED
                  </span>
                )}
              </h5>
            </li>
            <li
              className='flex flex-row items-center tablet:flex-col gap-0 tablet:items-start justify-between 
            tablet:justify-start w-full tablet:w-auto animate-fade-in-up delay-800 animate-distance-xs duration-300'
            >
              <span className='text-[12px] leading-[180%] text-terciary-foreground'>
                Founded In
              </span>
              <p className='uppercase text-accent-foreground font-plus leading-[180%] text-[12px] tablet:text-[18px]'>
                {developer.attributes.Founded_in}
              </p>
            </li>
            <li
              className='flex flex-row items-center tablet:flex-col gap-0 tablet:items-start justify-between 
            tablet:justify-start w-full tablet:w-auto animate-fade-in-up delay-900 animate-distance-xs duration-300'
            >
              <span className='text-[12px] leading-[180%] text-terciary-foreground'>
                Projects
              </span>
              <p className='uppercase text-accent-foreground font-plus leading-[180%] text-[12px] tablet:text-[18px]'>
                {projects.length}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
