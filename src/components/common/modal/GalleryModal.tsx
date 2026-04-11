"use client";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Close } from "@/components/shared/icons/close";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { Arrow } from "@/components/shared/icons/arrow";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";

interface GalleryNavButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  direction: "left" | "right";
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export const GalleryModal = ({
  isOpen,
  onClose,
  images,
}: GalleryModalProps) => {
  // Carousel principal
  const {
    emblaRef: mainRef,
    emblaApi: mainApi,
    scrollPrev,
    scrollNext,
    currentSlide,
    totalSlides,
  } = useEmblaCarouselHook({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    duration: 30,
  });

  // Carousel de thumbnails
  const { emblaRef: thumbRef, emblaApi: thumbApi } = useEmblaCarouselHook({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Sincronizar thumbnails cuando cambia el carousel principal
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  // Sincronizar el carousel de thumbnails con el principal
  useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const onSelect = () => {
      const selectedIndex = mainApi.selectedScrollSnap();
      thumbApi.scrollTo(selectedIndex);
    };

    mainApi.on("select", onSelect);

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const progressPercentage =
    totalSlides > 0 ? (currentSlide / totalSlides) * 100 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 flex items-center justify-center z-[9999] py-0 tablet:py-5
          px-0 tablet:spacing-padding-x light '
          style={{
            background:
              "var(--color-gray-color-stops-60, rgba(12, 12, 12, 0.60))",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
            className='flex flex-col pb-0 pt-10 tablet:pt-10 tablet:pb-10 px-5 tablet:px-10 bg-white w-full h-full tablet:h-[820px] max-h-full 
            max-w-full tablet:max-w-[1400px] gap-4 overflow-hidden rounded-none tablet:rounded-3xl'
          >
            <div className='flex flex-row justify-between w-full items-center'>
              <h3 className='text-primary-foreground big-uppercase font-medium uppercase'>
                Gallery
              </h3>
              <button
                onClick={onClose}
                className='cursor-pointer bg-[#F6F6F6] backdrop-blur-sm self-start
                rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform'
              >
                <figure className='fill-accent-foreground'>
                  <Close size={16} />
                </figure>
              </button>
            </div>
            <ul className='flex tablet:hidden flex-col gap-2.5 w-full overflow-y-auto scrollbar-hide'>
              {images.map((item, index) => (
                <figure key={index} className='relative h-full w-full'>
                  <Image
                    src={ENVIRONMENT.API_URL + item || ""}
                    alt='Gallery Image'
                    width={540}
                    height={240}
                    loading={"eager"}
                    className='h-[240px] object-cover w-full'
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(710, 360)
                    )}`}
                  />
                </figure>
              ))}
            </ul>
            <div className='hidden tablet:block relative flex-1 min-h-0 w-full cursor-grab rounded-xl overflow-hidden'>
              <div ref={mainRef} className='w-full h-full overflow-hidden'>
                <div className='flex h-full'>
                  {images.map((item, index) => (
                    <div key={index} className='flex-[0_0_100%] min-w-0 h-full'>
                      <figure className='relative h-full w-full'>
                        <Image
                          src={ENVIRONMENT.API_URL + item || ""}
                          alt='Gallery Image'
                          width={1400}
                          height={600}
                          loading={"eager"}
                          className='h-full w-full object-cover'
                          placeholder={`data:image/svg+xml;base64,${toBase64(
                            shimmer(710, 360)
                          )}`}
                        />
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
              <GalleryNavButton
                direction='left'
                onClick={(e) => {
                  e.stopPropagation();
                  scrollPrev();
                }}
                className='left-2 tablet:left-4'
              />
              <GalleryNavButton
                direction='right'
                onClick={(e) => {
                  e.stopPropagation();
                  scrollNext();
                }}
                className='right-2 tablet:right-4'
              />
            </div>
            <div className='hidden tablet:block overflow-hidden select-none'>
              <div ref={thumbRef} className='overflow-hidden'>
                <div className='flex gap-1'>
                  {images.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => onThumbClick(index)}
                      className={`relative cursor-pointer flex-[0_0_128px] min-w-0 transition-all 
                        duration-200 rounded-lg overflow-hidden bg-stops-gray-60`}
                    >
                      {currentSlide === index + 1 && (
                        <div className='absolute inset-0'></div>
                      )}
                      <Image
                        src={ENVIRONMENT.API_URL + item || ""}
                        alt={`Gallery thumbnail ${index + 1}`}
                        width={128}
                        height={64}
                        loading={"eager"}
                        className='h-[64px] min-w-[128px] object-cover'
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(710, 360)
                        )}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <footer
              className='hidden py-2 tablet:flex flex-col tablet:flex-row justify-between w-full items-start 
              tablet:items-center gap-[34px] tablet:gap-0'
            >
              <div className='flex flex-row-reverse tablet:flex-row justify-center font-sans items-center gap-5 laptop:gap-7 w-full'>
                <div className='flex flex-row gap-3 items-center'>
                  <button
                    onClick={scrollPrev}
                    className='cursor-pointer block tablet:hidden text-accent-foreground'
                  >
                    <CaretArrow size={19} direction='left' />
                  </button>
                  <span className='text-[12px] text-secondary-foreground font-semibold leading-[180%] whitespace-nowrap'>
                    {currentSlide} / {totalSlides}
                  </span>
                  <button
                    onClick={scrollNext}
                    className='cursor-pointer block tablet:hidden text-accent-foreground'
                  >
                    <CaretArrow size={19} direction='right' />
                  </button>
                </div>
                <div className='flex-1 flex flex-row gap-4 items-center laptop:flex-row-reverse w-full laptop:w-auto'>
                  <div
                    className='hidden tablet:flex order-2 laptop:order-3 flex-row laptop:flex-row gap-2 items-center cursor-pointer select-none hover:opacity-70 transition-opacity'
                    onClick={scrollPrev}
                  >
                    <figure className='text-icon-secondary-button rotate-0'>
                      <Arrow size={20} direction='left' />
                    </figure>
                    <span className='text-[15px] leading-[95%] text-text-secondary-button'>
                      Prev
                    </span>
                  </div>
                  <div className='flex-1 order-1 laptop:order-2 w-full tablet:w-full laptop:w-[320px] h-1 bg-gray-200 overflow-hidden rounded-full'>
                    <div
                      className='h-full bg-accent-foreground transition-all duration-300 ease-out'
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  <div
                    className='hidden tablet:flex order-3 laptop:order-1 flex-row-reverse laptop:flex-row-reverse gap-2 items-center cursor-pointer select-none hover:opacity-70 transition-opacity'
                    onClick={scrollNext}
                  >
                    <figure className='text-icon-secondary-button'>
                      <Arrow size={20} direction='right' />
                    </figure>
                    <span className='text-[15px] leading-[95%] text-text-secondary-button'>
                      Next
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const GalleryNavButton = ({
  onClick,
  className = "",
  direction,
}: GalleryNavButtonProps) => (
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
      aria-label={direction === "left" ? "Anterior" : "Siguiente"}
    >
      <CaretArrow size={8} direction={direction} />
    </figure>
  </button>
);
