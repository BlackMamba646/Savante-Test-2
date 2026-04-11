"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CalendarDot } from "@/components/shared/icons/calendar-dot";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { MapPinArea } from "@/components/shared/icons/map-pin-area";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import Image from "next/image";
import Link from "next/link";
import { ROUTING } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
/* import Fade from "embla-carousel-fade"; */
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageLoader } from "../skeleton/ImageLoader";
import { useMobile } from "@/hooks/use-mobile";
import { Bed } from "@/components/shared/icons/bed";
import { Toilet } from "@/components/shared/icons/toilet";
import { Polygon } from "@/components/shared/icons/polygon";
import { IconButton } from "@/components/common/button/IconButton";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/shared/icons/arrow";
import { formatFeatures } from "@/utils/utils";
import { TextButton } from "../button/TextButton";

type ModeType = "dark" | "light";

interface ProjectSlideCardProps {
  index: number;
  title?: string;
  address?: string;
  paragraph?: string;
  handover?: string;
  developer?: string;
  price?: string;
  unitTypes?: string;
  mainImage?: string;
  images?: string[];
  slug?: string;
}

export const ProjectSlideCard = (props: ProjectSlideCardProps) => {
  const {
    index,
    title,
    address,
    paragraph,
    handover,
    developer,
    price,
    unitTypes,
    mainImage,
    images = [],
    slug,
  } = props;

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setSelectedIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    scrollPrev();
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    scrollNext();
  };

  const isTabletOrBelow = useMobile(1232);
  const getStateClasses = (): ModeType => {
    return isTabletOrBelow ? "dark" : "light";
  };

  return (
    <article
      className={`select-none cursor-grab grid grid-cols-1 laptop:grid-cols-[1fr_460px] grid-rows-1 gap-0 tablet:gap-[24px] laptop:gap-2
          px-0 tablet:spacing-padding-x py-0 laptop:px-0 laptop:py-0 ${getStateClasses()}`}
    >
      <div className="flex laptop:hidden flex-col gap-5 py-[24px] spacing-padding-x tablet:py-0 tablet:px-0">
        <div className="flex flex-col gap-2">
          <h5 className="tracking-[-0.52px] font-medium text-secondary-foreground">
            {title}
          </h5>
          <ul className="flex flex-row gap-4 items-center">
            {unitTypes && (
              <div
                className="hidden tablet:flex items-center flex-row gap-1 laptop:gap-2"
              >
                <p className="text-terciary-foreground leading-[180%] text-[14px]">
                  Unit Types:
                </p>
                <span className="text-accent-foreground text-[14px] leading-[180%] line-clamp-1">
                  {unitTypes}ss
                </span>
              </div>
            )}
            <span className="hidden tablet:block text-[14px] leading-[180%] text-terciary-foreground">
              {address}
            </span>
          </ul>
        </div>
        <p className="text-[14px] leading-[180%] text-terciary-foreground">
          {paragraph}
        </p>
      </div>
      <figure className="light relative h-[240px] tablet:h-[360px] laptop:h-[466px] min-w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            slidesToScroll: 1,
            dragFree: false,
            watchDrag: false,
          }}
          className="embla__fade w-full h-full"
        >
          <CarouselContent className="relative w-full m-0 h-[360px] laptop:h-[466px]">
            {images.map((image: string, imgIndex: number) => (
              <CarouselItem
                key={imgIndex}
                className={`relative basis-full transition-opacity shrink-0 m-0 pr-0 pl-0 duration-0 ease-in-out ${
                  imgIndex === selectedIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative w-full h-full">
                  <ImageLoader />
                  <Image
                    src={`${ENVIRONMENT.API_URL}${image}`}
                    alt={`${title} image ${imgIndex + 1}`}
                    fill
                    className="object-cover laptop:object-fill w-full h-full"
                    priority={imgIndex === 0}
                    loading="eager"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 py-5 px-5 laptop:py-10 laptop:px-20 z-100">
          <div className="relative size-full flex flex-col justify-between tablet:justify-end laptop:justify-between items-end">
            <Link
              href={`${ROUTING.OFF_PLAN}/${slug}`}
              className="w-max flex tablet:hidden"
            >
              <IconButton
                big={true}
                icon={ArrowUpRight}
                iconSize={10}
                customClassName="btn-icon-variant"
                onClick={() => {}}
              />
            </Link>
            <figcaption className="hidden laptop:flex w-max flex-row items-center gap-3 py-3 px-5 bg-white/90 backdrop-blur-[20px]">
              <span className="uppercase leading-[180%] text-[12px] tracking-[0.96px] font-normal">
                Starting price
              </span>
              <p className="text-[18px] text-accent-foreground leading-[180%] font-medium tracking-wide uppercase">
                AED{" "}
                <span className="font-medium">
                  {formatFeatures.formatCurrency(Number(price))}
                </span>
              </p>
            </figcaption>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-3 items-end">
                <button
                  onClick={handlePrevClick}
                  className="btn-indicator-icon-variant shadow-none"
                >
                  <figure className="relative">
                    <CaretArrow direction="left" size={10} />
                  </figure>
                </button>
                <button
                  onClick={handleNextClick}
                  className="btn-indicator-icon-variant shadow-none"
                >
                  <figure className="relative">
                    <CaretArrow direction="right" size={10} />
                  </figure>
                </button>
              </div>
              <Link
                href={`${ROUTING.OFF_PLAN}/${slug}`}
                className="hidden tablet:flex laptop:hidden"
              >
                <TextButton
                  text={"View Details"}
                  state={"default"}
                  customClassName="btn-primary-fill-variant"
                  showRightIcon={true}
                  rightIcon={ArrowUpRight}
                  animateIcon={true}
                  iconAnimation={"rotate"}
                  onClick={() => {}}
                />
              </Link>
            </div>
          </div>
        </div>
      </figure>
      <article className="hidden laptop:flex bg-white flex-col py-[64px] justify-center spacing-padding-x gap-[34px]">
        <div className="flex flex-col gap-1">
          <h5 className="tracking-[-0.52px] font-medium text-secondary-foreground">
            {title}
          </h5>
          <span className="text-[14px] leading-[180%] text-terciary-foreground line-clamp-1">
            {address}
          </span>
        </div>
        <p className="text-[14px] leading-[180%] text-terciary-foreground">
          {paragraph}
        </p>
        {unitTypes ? (
          <div
            className="flex-1 items-center 
    flex flex-row gap-1 laptop:gap-2 w-full"
          >
            <p className="text-terciary-foreground leading-[180%] text-[15px]">
              Unit Types:
            </p>
            <span className="text-accent-foreground text-[15px] leading-[180%] line-clamp-1">
              {unitTypes}
            </span>
          </div>
        ) : (
          <ul className="hidden flex-row gap-4">
            <li className="flex flex-row gap-[5px] items-center">
              <figure className="text-accent-foreground" aria-label="Bedrooms">
                <Bed size={18} />
              </figure>
              <span className="text-sm font-plus text-terciary-foreground font-light leading-[180%]">
                3
              </span>
            </li>
            <li className="flex flex-row gap-[5px] items-center">
              <figure className="text-accent-foreground" aria-label="Bathrooms">
                <Toilet size={18} />
              </figure>
              <span className="text-sm font-plus text-terciary-foreground font-light leading-[180%]">
                1
              </span>
            </li>
            <li className="flex flex-row gap-[5px] items-center">
              <figure
                className="text-accent-foreground"
                aria-label="Square Feet"
              >
                <Polygon size={18} />
              </figure>
              <span className="text-sm font-plus text-terciary-foreground font-light leading-[180%] uppercase">
                10.372 SQ. FT
              </span>
            </li>
          </ul>
        )}
        <Link href={`${ROUTING.OFF_PLAN}/${slug}`}>
          <TextButton
            text={"View details"}
            state={"default"}
            customClassName="btn-primary-fill-variant w-max"
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            iconSize={10}
            animateIcon={true}
            iconAnimation={"rotate"}
          />
        </Link>
      </article>
      {/* <footer className="hidden tablet:flex laptop:hidden py-1 gap-4 items-center justify-stretch">
        <span className="text-[12px] leading-[180%] font-medium uppercase tracking-[0.96px] text-secondary-foreground">
          {currentIndex! + 1}/{totalProjects}
        </span>
        <div className="flex-1 w-full h-1 bg-secondary-stroke/20 overflow-hidden">
          <div
            className="h-full bg-accent-foreground transition-all duration-300 ease-out"
            style={{
              width: `${((currentIndex! + 1) / totalProjects!) * 100}%`,
            }}
          ></div>
        </div>
        <button
          className="flex flex-row gap-2 items-center"
          onClick={onPrevClick}
        >
          <figure className="relative text-icon-secondary-button">
            <Arrow size={20} direction="left" />
          </figure>
          <span className="uppercase leading-[95%] text-[15px] text-text-secondary-button">
            Prev
          </span>
        </button>
        <button
          className="flex flex-row gap-2 items-center"
          onClick={onNextClick}
        >
          <span className="uppercase leading-[95%] text-[15px] text-text-secondary-button">
            Next
          </span>
          <figure className="relative text-icon-secondary-button">
            <Arrow size={20} direction="right" />
          </figure>
        </button>
      </footer> */}
    </article>
  );
};
