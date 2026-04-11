import { LogoMobile } from "@/components/shared/icons/logo/logo-mobile";

export const ImageLoader = () => {
  return (
    <div className='w-full h-full bg-surface-container-background animate-pulse'>
      <figure className='grayscale-100 w-full h-full flex items-center justify-center'>
        <LogoMobile size={100} />
      </figure>
      <div className='flex flex-col gap-2'>
        <div className='w-full h-5 bg-surface-container-background animate-pulse'></div>
        <div className='w-full h-5 bg-surface-container-background animate-pulse'></div>
      </div>
    </div>
  );
};

import React from 'react'

/*
"use client";
import { AREAS } from "@/data/areas-size";
import { AreaModel } from "@/interfaces";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";
import React from "react";
import { CaretArrow } from "../../shared/icons/caret-arrow";

interface AreasSliderProps {
  selectedArea?: string;
  className?: string;
  areas?: AreaModel[];
}

export const AreasSlider = ({
  selectedArea,
  className,
  areas,
}: AreasSliderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectArea = (areaId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchParams.get("area") === areaId) {
      params.delete("area");
    } else {
      params.set("area", areaId);
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const isSelected = (areaId: string) => {
    const urlArea = searchParams.get("area");
    return selectedArea === areaId || urlArea === areaId;
  };

  const handlePrevClick = () => {
    console.log("prev");
  };

  const handleNextClick = () => {
    console.log("next");
  };

  return (
    <div className={`${className} items-center`}>
      <button
        type='button'
        className='bg-white group hover:bg-shades-gray-100 outline-1 outline-primary-stroke p-3 
        opacity-40 hover:opacity-100 rounded-full transition-all duration-200'
        onClick={handlePrevClick}
      >
        <figure
          className='text-terciary-foreground'
          aria-label='Previous image'
        >
          <CaretArrow size={9} direction='left' />
        </figure>
      </button>
      <div className='flex-1 flex flex-row gap-2.5 overflow-x-auto'>
        {areas
          ? areas.map((area) => (
              <button
                key={area.id}
                onClick={() => selectArea(area.attributes.slug)}
                className={`cursor-pointer py-2.5 px-4 border-[1px] rounded-lg overflow-hidden transition-all ease-in-out duration-200 ${
                  isSelected(area.attributes.slug)
                    ? "bg-surface-container-background border-primary-stroke text-white"
                    : "bg-transparent border-secondary-stroke hover:bg-surface-container-background/50 hover:border-secondary-stroke"
                }`}
              >
                <span
                  className={`text-[14px] leading-[180%] whitespace-nowrap ${
                    isSelected(area.attributes.slug)
                      ? "text-terciary-foreground font-medium"
                      : "text-terciary-foreground"
                  }`}
                >
                  {area.attributes.Area_name}
                </span>
              </button>
            ))
          : AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => selectArea(area.id)}
                className={`cursor-pointer py-2.5 px-4 outline-1 rounded-lg overflow-hidden transition-all duration-200 ${
                  isSelected(area.id)
                    ? "bg-surface-container-background outline-primary-stroke"
                    : "bg-transparent outline-1 outline-secondary-stroke hover:bg-surface-container-background/50 hover:border-secondary-stroke"
                }`}
              >
                <span
                  className={`text-[14px] leading-[180%] whitespace-nowrap ${
                    isSelected(area.id)
                      ? "text-terciary-foreground font-medium"
                      : "text-terciary-foreground"
                  }`}
                >
                  {area.name}
                </span>
              </button>
            ))}
      </div>
      <button
        type='button'
        className='bg-white group hover:bg-shades-gray-100 outline-1 outline-primary-stroke p-3 
        opacity-40 hover:opacity-100 rounded-full transition-all duration-200'
        onClick={handleNextClick}
      >
        <figure
          className='text-terciary-foreground'
          aria-label='Previous image'
        >
          <CaretArrow size={9} direction='right' />
        </figure>
      </button>
    </div>
  );
};

*/
