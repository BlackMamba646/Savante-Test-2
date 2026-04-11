"use client";
import { TestimonyModel } from "@/interfaces";
import React from "react";
import { ReviewCard } from "../card/ReviewCard";
import { TrustCounter } from "../text/TrustCounter";
import { ActionSlider } from "../navigation/ActionSlider";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface ReviewsProps {
  reviews: TestimonyModel[];
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  const { emblaRef, scrollPrev, scrollNext, currentSlide, totalSlides } =
    useEmblaCarouselHook({
      loop: true,
      align: "start",
    });

  return (
    <section className='relative overflow-hidden'>
      <div
        className='relative max-w-[1440px] mx-auto flex flex-col laptop:flex-row 
        spacing-padding-x spacing-padding-y gap-[64px] laptop:spacing-gap'
      >
        <div className='flex flex-col justify-between p-0 min-w-[380px] max-w-[380px] w-full'>
          <AnimationReveal
            x={-5}
            y={0}
            delay={0.2}
            duration={0.3}
            opacity={1}
            type='div'
            className='flex flex-col gap-5'
          >
            <TrustCounter rating={5} size='medium' />
            <h2 className='text-primary-foreground tracking-[-1.38px] font-crimson'>
              Hear It From Them
            </h2>
          </AnimationReveal>
          <ActionSlider
            current={currentSlide}
            count={totalSlides}
            onPrev={scrollPrev}
            onNext={scrollNext}
            className='hidden laptop:flex'
          />
        </div>

        {/* Carousel Container */}
        <AnimationReveal
          x={0}
          y={5}
          delay={0.4}
          duration={0.5}
          opacity={1}
          type='div'
          className='overflow-hidden max-w-[100vw] min-w-full w-[100vw] laptop:w-auto'
        >
          <div className='flex-1 max-w-full cursor-grab' ref={emblaRef}>
            <ul className='flex flex-row -ml-3 laptop:-ml-4'>
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className='min-w-auto laptop:w-[700px] shrink-0 pr-0 pl-3 laptop:pl-4'
                >
                  <ReviewCard
                    userName={review.attributes.Name}
                    rating={review.attributes.Rating}
                    firstParagraph={review.attributes.Testimony_part1}
                    secondParagraph={review.attributes.Testimony_part2}
                  />
                </li>
              ))}
            </ul>
          </div>
        </AnimationReveal>

        <ActionSlider
          current={currentSlide}
          count={totalSlides}
          onPrev={scrollPrev}
          onNext={scrollNext}
          className='flex laptop:hidden'
        />
      </div>
    </section>
  );
};
