"use client";
import { Bed } from "@/components/shared/icons/bed";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { Polygon } from "@/components/shared/icons/polygon";
import { Toilet } from "@/components/shared/icons/toilet";
import { formatFeatures } from "@/utils/utils";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ImageLoader } from "../skeleton/ImageLoader";
import { LinkButton } from "../button/LinkButton";
import { ROUTING } from "@/config/constant.config";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { TextButton } from "../button/TextButton";
import { shimmer, toBase64 } from "@/lib/image-placeholders";

interface PropertyCardProps {
  title: string;
  address: string;
  baths: number;
  beds: number;
  images: string[];
  price: string;
  squareFeet: string;
  currency: string;
  operation: string;
  slug: string;
}

export const PropertyCard = ({
  title,
  address,
  baths,
  beds,
  images,
  price,
  squareFeet,
  currency,
  operation,
  slug,
}: PropertyCardProps) => {
  const [shouldLoadEager, setShouldLoadEager] = useState(false);

  const { emblaRef, scrollPrev, scrollNext } = useEmblaCarouselHook({
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

  return (
    <Link
      href={`/for-${operation.toLowerCase()}/${slug}`}
      target='_blank'
      rel='noopener noreferrer'
      className='relative cursor-pointer overflow-hidden h-full'
      aria-label={`View ${title} details`}
    >
      <div
        className='flex flex-col gap-4 rounded-2xl overflow-hidden bg-surface-container-background 
        drop-shadow-xs h-full select-none'
      >
        <figure className='relative overflow-hidden z-10 h-[236px]'>
          <button
            type='button'
            className='group flex items-center justify-center cursor-pointer absolute h-8 w-8 top-1/2 -translate-y-1/2 left-4 
            bg-stops-mode-40 backdrop-blur-[20px] hover:bg-accent-foreground rounded-full z-10 transition-all duration-200'
            onClick={handlePrevClick}
          >
            <figure
              className='text-white group-hover:text-white'
              aria-label='Previous image'
            >
              <CaretArrow size={8} direction='left' />
            </figure>
          </button>

          <div className='overflow-hidden h-full' ref={emblaRef}>
            <div className='flex h-full'>
              {images.map((image, index) => (
                <div
                  key={index}
                  className='flex-[0_0_100%] min-w-0 relative h-full'
                >
                  {/* <ImageLoader /> */}
                  <Image
                    src={image}
                    alt={`${title} image ${index + 1}`}
                    width={650}
                    height={250}
                    className='object-cover w-full h-full relative'
                    loading={shouldLoadEager ? "eager" : "lazy"}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(1014, 580)
                    )}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type='button'
            className='group flex items-center justify-center cursor-pointer absolute h-8 w-8 top-1/2 -translate-y-1/2 right-4 
            bg-stops-mode-40 backdrop-blur-[20px] hover:bg-accent-foreground rounded-full z-10 transition-all duration-200'
            onClick={handleNextClick}
          >
            <figure
              className='text-white group-hover:text-white'
              aria-label='Next image'
            >
              <CaretArrow size={8} direction='right' />
            </figure>
          </button>
        </figure>
        <div className='flex flex-col gap-4 px-4'>
          <div className='flex flex-col gap-1'>
            <p
              className='text-[16px] font-semibold font-plus leading-[140%] text-primary-foreground 
              tracking-[-0.32px] line-clamp-1'
            >
              {title}
            </p>
            <p className='text-[14px] text-terciary-foreground line-clamp-1 leading-[180%]'>
              <span className='text-accent-solid  font-medium leading-[100%]'>
                For {operation}
              </span>{" "}
              in {address}
            </p>
          </div>
          <ul className='flex flex-row gap-4'>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure
                className='text-terciary-foreground'
                aria-label='Bedrooms'
              >
                <Bed size={18} />
              </figure>
              <span className='text-sm font-plus text-terciary-foreground font-light leading-[180%]'>
                {beds === 0 ? "Studio" : beds}{" "}
                {beds > 0 && (
                  <span className='hidden tablet:inline-block'>
                    {beds > 1 ? "Beds" : "Bed"}
                  </span>
                )}
              </span>
            </li>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure
                className='text-terciary-foreground'
                aria-label='Bathrooms'
              >
                <Toilet size={18} />
              </figure>
              <span className='text-sm font-plus text-terciary-foreground font-light leading-[180%]'>
                {baths}{" "}
                <span className='hidden tablet:inline-block'>Baths</span>
              </span>
            </li>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure
                className='text-terciary-foreground'
                aria-label='Square Feet'
              >
                <Polygon size={18} />
              </figure>
              <span className='text-sm font-plus text-terciary-foreground font-light leading-[180%]'>
                {squareFeet} sq. ft
              </span>
            </li>
          </ul>
        </div>
        <TextButton
          text={`From ${currency} ${formatFeatures.formatNumber(
            Number(price)
          )}`}
          ariaLabel='View property details'
          state='default'
          customClassName='btn-primary-fill-variant w-full rounded-full overflow-hidden justify-center py-3 px-6'
          textClassName="uppercase text-[12px] tracking-[0.96px] font-medium"
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          animateIcon={true}
        />
      </div>
    </Link>
  );
};
