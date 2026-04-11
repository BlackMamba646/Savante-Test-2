"use client";
import { Buildings } from "@/components/shared/icons/buildings";
import React, { useState } from "react";
import { GalleryModal } from "@/components/common/modal/GalleryModal";
import { HeroGallery } from "@/components/properties/HeroGallery";
import { PropertyFeatures } from "@/components/properties/PropertyFeatures";
import { MapPinArea } from "@/components/shared/icons/map-pin-area";

interface HeroProps {
  title: string;
  property_type: string;
  operation: string;
  price: string;
  address: string;
  baths: number;
  beds: number;
  total_area: string;
  main_image: string;
  images: string[];
  youtubeUrl: string;
  isMobile: boolean;
  description: string;
}

export const HeroPropertyDetail = (props: HeroProps) => {
  const {
    title,
    property_type,
    operation,
    price,
    address,
    baths,
    beds,
    total_area,
    main_image,
    images,
    youtubeUrl,
    isMobile,
    description,
  } = props;

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      className='spacing-padding-x pb-9 tablet:pb-10 pt-[96px] laptop:pb-10 max-w-[1440px] 
    mx-auto flex flex-col gap-[24px]'
    >
      {isGalleryOpen && (
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={images}
        />
      )}
      <div className='tablet:hidden flex flex-col gap-2.5'>
        <div className='flex flex-row gap-1 items-center animate-fade-in delay-300 duration-300'>
          <figure className='text-secondary'>
            <Buildings size={20} />
          </figure>
          <p className='text-terciary-foreground text-[16px] leading-[180%] font-normal'>
            {property_type}{" "}
            <span className='text-accent-solid font-semibold px-0.5 tracking-[-0.32px]'>
              For {operation}
            </span>{" "}
          </p>
        </div>
        <h1
          data-size='title'
          className='text-primary animate-fade-in-left delay-400 animate-distance-xs duration-300'
        >
          {title}
        </h1>
        <div className='flex flex-row gap-1.5 items-center animate-fade-in-up delay-500 animate-distance-xs duration-300'>
          <figure className='text-terciary-foreground'>
            <MapPinArea size={20} />
          </figure>
          <p className='text-terciary-foreground heading-secondary font-medium leading-[160%] line-clamp-1'>
            {address}
          </p>
        </div>
      </div>

      <HeroGallery
        youtubeUrl={youtubeUrl}
        setShowVideo={setShowVideo}
        showVideo={showVideo}
        main_image={main_image}
        title={title}
        isMobile={isMobile}
        images={images}
        setIsGalleryOpen={setIsGalleryOpen}
        description={description}
      />

      <div className='flex flex-col gap-[24px]'>
        <div className='hidden tablet:flex flex-col gap-0'>
          <h2
            className='text-primary-foreground tracking-[-1.38px]
          animate-fade-in-left delay-400 animate-distance-xs duration-300'
          >
            {title}
          </h2>
          <p
            className='text-terciary-foreground text-[16px] leading-[180%] font-normal
          animate-fade-in delay-600 animate-distance-xs duration-300'
          >
            {property_type}{" "}
            <span className='text-accent-solid font-semibold px-0.5'>
              For {operation}
            </span>{" "}
            in {address}
          </p>
        </div>
        <PropertyFeatures
          property_type={property_type}
          price={price}
          square_feet={total_area}
          beds={beds}
          baths={baths}
        />
      </div>
    </section>
  );
};
