"use client";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { MapPinArea } from "@/components/shared/icons/map-pin-area";
import { IconButton } from "@/components/common/button/IconButton";
import { ROUTING } from "@/config/constant.config";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { ENVIRONMENT } from "@/config/env.config";
import { formatFeatures, formatProjectType } from "@/utils/utils";
import { InfoValueUp } from "@/components/home/InfoValueUp";
import { LinkButton } from "../button/LinkButton";
import { Info } from "../text/Info";

interface OffPlanCardProps {
  id: string;
  title: string;
  address: string;
  handover: string;
  developer: string;
  projectType: string[];
  slug: string;
  mainImage: string;
  status: string;
  unitTypes: string;
  images: string[];
  startingPrice: number;
  developerName?: string;
}

export const OffPlanCard = (props: OffPlanCardProps) => {
  const {
    id,
    title,
    address,
    handover,
    developer,
    projectType,
    slug,
    mainImage,
    status,
    unitTypes,
    images,
    startingPrice,
    developerName,
  } = props;

  const [shouldLoadEager, setShouldLoadEager] = useState(false);

  const { emblaRef, scrollPrev, scrollNext, currentSlide, totalSlides } =
    useEmblaCarouselHook({
      loop: true,
      skipSnaps: false,
      dragFree: false,
      watchDrag: false,
    });

  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setShouldLoadEager(true);
    scrollPrev();
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setShouldLoadEager(true);
    scrollNext();
  };
  // use images array if available, otherwise fallback to mainImage
  const displayImages = images && images.length > 0 ? images : [mainImage];

  const anchorProps = {
    href: `${ROUTING.OFF_PLAN}/${slug}`,
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <li
      className='group/card rounded-2xl tablet:overflow-hidden flex flex-col tablet:flex-row gap-3 tablet:gap-[24px] laptop:gap-0 p-0 
    bg-transparent laptop:bg-surface-container-background'
    >
      <div className='flex-1 flex flex-col gap-0 max-w-full tablet:max-w-[450px] min-h-auto tablet:min-h-full'>
        <figure className='relative w-full z-10 h-[220px] tablet:h-full overflow-hidden rounded-tl-2xl rounded-tr-2xl tablet:rounded-tr-none tablet:rounded-bl-none'>
          <NavigationButton
            onClick={handlePrevClick}
            direction='left'
            className='left-4'
          />

          <div className='overflow-hidden h-full' ref={emblaRef}>
            <div className='flex h-full'>
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className='flex-[0_0_100%] min-w-0 relative h-full'
                >
                  <Image
                    src={image}
                    alt={`${title} image ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    loading={shouldLoadEager ? "eager" : "lazy"}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(1014, 580)
                    )}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <NavigationButton
            onClick={handleNextClick}
            direction='right'
            className='right-4'
          />
        </figure>
        {/* Progress bar */}
        <div className='h-[4px] w-full bg-secondary-stroke relative overflow-hidden'>
          <div
            className='h-full bg-accent-foreground transition-all duration-300 ease-out'
            style={{
              width: `${
                totalSlides > 0 ? (currentSlide / totalSlides) * 100 : 0
              }%`,
            }}
          />
        </div>
      </div>
      {/* Dark Container */}
      <div
        className='flex-1 hidden laptop:flex flex-col py-4 px-5 gap-[34px] bg-surface-container-background 
      rounded-tr-2xl rounded-br-2xl min-w-[200px] max-w-[300px] dark'
      >
        <div className='flex flex-col gap-2.5'>
          <InfoValueUp
            label='Starting Price'
            value={`${ENVIRONMENT.CURRENCY} ${formatFeatures.formatNumber(
              startingPrice
            )}`}
            className='[&_p]:[word-spacing:4px] [&_span]:font-normal'
          />
          <InfoValueUp
            label='Handover'
            value={handover}
            className='[&_span]:font-normal'
          />
        </div>
        <LinkButton
          href={`${ROUTING.OFF_PLAN}/${slug}`}
          text='View Project'
          target='_self'
          rel='noopener noreferrer'
          customClassName='relative z-10 dark btn-primary-dark-fill-variant 
              rounded-full [&_figure]:text-icon-primary-button
              overflow-hidden justify-center py-3 px-6 gap-2 hidden tablet:flex'
          textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          iconSize={9}
          iconClassName='w-auto text-icon-primary-button'
        />
      </div>
      {/* Light Container */}
      <article
        className='flex-1 flex flex-col px-0 py-0 tablet:py-4 laptop:py-0 laptop:px-[26px] gap-2.5 
      laptop:gap-[34px] self-center w-full tablet:w-auto'
      >
        <div className='flex flex-col gap-1'>
          <p className='text-secondary text-[12px] leading-[200%]'>
            By{" "}
            <span className='text-accent-solid font-bold uppercase tracking-[0.96px] pl-[2px]'>
              {developerName}
            </span>
          </p>
          <h5 className='text-primary-foreground line-clamp-1 font-plus tracking-[-0.52px] font-medium'>
            {title}
          </h5>
          <div className='flex flex-row gap-2 items-center'>
            <figure className='text-terciary-foreground'>
              <MapPinArea size={20} />
            </figure>
            <p
              className='text-[14px] leading-[180%] text-terciary-foreground 
          line-clamp-1'
            >
              {address}
            </p>
          </div>
        </div>

        <LinkButton
          href={`${ROUTING.OFF_PLAN}/${slug}`}
          target='_self'
          rel='noopener noreferrer'
          text={`From ${ENVIRONMENT.CURRENCY} ${formatFeatures.formatNumber(
            Number(startingPrice)
          )}`}
          ariaLabel='View project details'
          state='default'
          customClassName='btn-primary-fill-variant w-full rounded-full overflow-hidden justify-center py-3 px-6
          hidden tablet:flex laptop:hidden'
          textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px]'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          animateIcon={true}
          iconAnimation={"rotate"}
          iconSize={10}
          iconClassName='scale-90'
          iconRotation={45}
        />

        <div className='flex flex-col tablet:flex-row gap-1 tablet:gap-4 laptop:gap-5'>
          <Info
            label='Project Type'
            value={formatProjectType(projectType)}
            disableAnimation={true}
            className='justify-between tablet:justify-start [&_span]:text-accent-solid tablet:[&_span]:tracking-normal 
            [&_span]:tracking-[-0.4px]'
          />
          {unitTypes && (
            <Info
              label='Unit Types'
              value={unitTypes}
              disableAnimation={true}
              className='justify-between tablet:justify-start [&_span]:text-accent-solid tablet:[&_span]:tracking-normal 
            [&_span]:tracking-[-0.4px]'
            />
          )}
        </div>
      </article>
      <LinkButton
        href={`${ROUTING.OFF_PLAN}/${slug}`}
        target='_blank'
        rel='noopener noreferrer'
        text={`From ${ENVIRONMENT.CURRENCY} ${formatFeatures.formatNumber(
          Number(startingPrice)
        )}`}
        ariaLabel='View project details'
        state='default'
        customClassName='btn-primary-outline-alpha-variant w-full rounded-full overflow-hidden justify-center py-3 px-6
          flex tablet:hidden'
        textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px]'
        showRightIcon={true}
        rightIcon={ArrowUpRight}
        iconSize={9}
      />
    </li>
  );
};

interface NavigationButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  direction: "left" | "right";
}

const NavigationButton = ({
  onClick,
  className = "",
  direction,
}: NavigationButtonProps) => (
  <button
    type='button'
    className={cn(
      "group flex items-center justify-center cursor-pointer absolute h-8 w-8 top-1/2 -translate-y-1/2",
      "bg-stops-mode-40 backdrop-blur-[20px] hover:bg-accent-foreground rounded-full z-10 transition-all duration-200",
      className
    )}
    onClick={onClick}
  >
    <figure
      className='text-white group-hover:text-white'
      aria-label='Previous image'
    >
      <CaretArrow size={8} direction={direction} />
    </figure>
  </button>
);

/*
<div className='flex flex-col gap-[34px] justify-between flex-1'>
        <div className='flex flex-col gap-2 max-w-[580px]'>
          <div className='flex flex-row gap-1'>
            <p className='text-secondary-foreground leading-[180%] text-[12px] font-montserrat'>
              Handover
            </p>
            <span
              className='text-accent-foreground font-medium text-[12px] 
          leading-[180%] uppercase tracking-[0.96px] translate-y-[1px]'
            >
              {handover}
            </span>
          </div>
          <h5 className='text-primary-foreground line-clamp-2 tracking-[-0.52px] font-medium'>
            {title}
          </h5>
          <div className='flex flex-row gap-2.5 items-center'>
            <figure className='text-terciary-foreground'>
              <MapPinArea size={20} />
            </figure>
            <p
              className='text-[14px] leading-[180%] text-terciary-foreground 
          line-clamp-1 font-montserrat'
            >
              {address}
            </p>
          </div>
        </div>
        <div
          className={`flex flex-col tablet:flex-row items-center gap-5 laptop:gap-10 max-w-full tablet:max-w-[600px]`}
        >
          <div
            className='flex-none laptop:flex-none items-center tablet:items-start laptop:items-start border-b-[1px] tablet:border-b-0 border-secondary-stroke
            flex flex-row tablet:flex-col laptop:flex-col gap-1 laptop:gap-0 w-full tablet:w-auto'
          >
            <p className='flex-1 text-terciary-foreground leading-[180%] text-[12px]'>
              Project Type
            </p>
            <span className='text-accent-foreground text-[18px] leading-[180%] font-medium'>
              {Array.isArray(projectType)
                ? projectType.join(", ")
                : projectType}
            </span>
          </div>
          {unitTypes && (
            <div
              className='flex-none laptop:flex-none items-center tablet:items-start laptop:items-start border-b-[1px] tablet:border-b-0 border-secondary-stroke
            flex flex-row tablet:flex-col laptop:flex-col gap-1 laptop:gap-0 w-full tablet:w-auto'
            >
              <p className='flex-1 text-terciary-foreground leading-[180%] text-[12px]'>
                Unit Types
              </p>
              <span className='text-accent-foreground text-[18px] leading-[180%] line-clamp-1'>
                {unitTypes}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='hidden laptop:flex flex-col gap-0'>
        <p className='text-secondary-foreground leading-[180%] text-[12px] font-montserrat'>
          Starting Price
        </p>
        <span
          className='text-accent-foreground big-lowercase leading-[180%] 
      font-medium tracking-[-0.4px]'
        >
          {formatFeatures.formatNumber(startingPrice)} {ENVIRONMENT.CURRENCY}
        </span>
      </div>
      <div className='relative hidden laptop:block self-start'>
        <IconButton
          big={true}
          icon={ArrowUpRight}
          iconSize={10}
          customClassName='btn-icon-dark-variant-alpha px-5 
      group-hover/card:[&_figure]:rotate-45'
          animateIcon={true}
          iconAnimation={"rotate"}
          iconRotation={45}
        />
      </div>
*/
