"use client";
import { AREAS } from "@/data/areas-size";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
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

  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useEmblaCarouselHook({
      align: "start",
      loop: false,
      dragFree: false,
    });

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

  return (
    <div className={`${className} items-center`}>
      <button
        type='button'
        className={`bg-white group hover:bg-shades-gray-100 outline-1 outline-primary-stroke p-3 
        rounded-full transition-all duration-200 opacity-40 hover:opacity-100`}
        onClick={scrollPrev}
      >
        <figure
          className='text-terciary-foreground'
          aria-label='Previous slide'
        >
          <CaretArrow size={9} direction='left' />
        </figure>
      </button>

      <div className='flex-1 overflow-hidden' ref={emblaRef}>
        <div className='flex gap-2.5'>
          {areas
            ? areas.map((area, index) => (
                <button
                  key={area.id}
                  className={`animate-fade-in-up animate-distance-xs duration-300 delay-${
                    index * 100
                  }`}
                  onClick={() => selectArea(area.attributes.slug)}
                >
                  <div
                    className={`shrink-0 cursor-pointer py-2.5 px-4 border-[1px] rounded-lg overflow-hidden transition-all ease-in-out duration-200 ${
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
                  </div>
                </button>
              ))
            : AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => selectArea(area.id)}
                  className={`shrink-0 cursor-pointer py-2.5 px-4 outline-1 rounded-lg overflow-hidden transition-all duration-200 ${
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
      </div>

      <button
        type='button'
        className={`bg-white group hover:bg-shades-gray-100 outline-1 outline-primary-stroke p-3 
          rounded-full transition-all duration-200 opacity-40 hover:opacity-100`}
        onClick={scrollNext}
      >
        <figure className='text-terciary-foreground' aria-label='Next slide'>
          <CaretArrow size={9} direction='right' />
        </figure>
      </button>
    </div>
  );
};
