"use client";
import React from "react";
import { TextButton } from "../button/TextButton";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { cn } from "@/lib/utils";
import { LinkButton } from "../button/LinkButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface ActionSliderProps {
  current: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  href?: string;
}

export const ActionSlider = ({
  current,
  count,
  onPrev,
  onNext,
  className,
  href,
}: ActionSliderProps) => {
  return (
    <footer
      className={cn(
        "flex flex-col tablet:flex-row py-0 tablet:py-1 items-center w-full gap-[24px] tablet:gap-10",
        className
      )}
    >
      <span
        className='hidden laptop:inline-block text-[14px] leading-[180%] font-medium uppercase 
        tracking-[0.96px] text-secondary-foreground font-helvetica-neue'
      >
        {current}/{count}
      </span>

      <div className='flex flex-row gap-4 items-center flex-1 w-full tablet:w-auto'>
        <span
          className='hidden tablet:inline-block laptop:hidden text-[12px] leading-[180%] font-medium uppercase 
          tracking-[0.96px] text-secondary font-helvetica-neue'
        >
          {current}/{count}
        </span>

        <TextButton
          text={"Prev"}
          textClassName='leading-[95%]'
          state={"default"}
          customClassName='btn-secondary-variant **:text-text-secondary-button select-none **:heading-secondary hidden laptop:flex'
          showLeftIcon={true}
          leftIcon={CaretArrow}
          iconSize={10}
          iconClassName='rotate-90!'
          ariaLabel='Previous review'
          title='Go to previous review'
          onClick={onPrev}
        />

        <div className='flex-1 w-full h-1 bg-primary-stroke overflow-hidden'>
          <div
            className='h-full bg-accent-foreground transition-all duration-300 ease-out'
            style={{ width: `${(current / count) * 100}%` }}
          ></div>
        </div>

        <button
          onClick={onPrev}
          className='block tablet:hidden text-terciary-foreground'
          aria-label='Previous review'
        >
          <CaretArrow size={10} direction='left' />
        </button>

        <TextButton
          text={"Prev"}
          textClassName='leading-[95%]'
          state={"default"}
          customClassName='btn-secondary-variant **:text-text-secondary-button select-none **:heading-secondary hidden tablet:flex laptop:hidden'
          showLeftIcon={true}
          leftIcon={CaretArrow}
          iconSize={10}
          iconClassName='rotate-90!'
          ariaLabel='Previous review'
          title='Go to previous review'
          onClick={onPrev}
        />

        <span
          className='inline-block tablet:hidden text-[14px] leading-[180%] font-medium uppercase 
          tracking-[0.96px] text-secondary-foreground font-helvetica-neue'
        >
          {current}/{count}
        </span>

        <button
          onClick={onNext}
          className='block tablet:hidden text-terciary-foreground'
          aria-label='Next review'
        >
          <CaretArrow size={10} direction='right' />
        </button>

        <TextButton
          text={"Next"}
          textClassName='leading-[95%]'
          state={"default"}
          customClassName='btn-secondary-variant **:text-text-secondary-button select-none **:heading-secondary hidden tablet:flex laptop:flex'
          iconClassName='rotate-[-90deg]'
          showRightIcon={true}
          rightIcon={CaretArrow}
          ariaLabel='Next review'
          title='Go to next review'
          onClick={onNext}
        />
      </div>

      <AnimationReveal
        x={0}
        y={5}
        delay={1.2}
        duration={0.3}
        opacity={1}
        whileInView={true}
        type='div'
        className='flex self-start'
      >
        <LinkButton
          text='View All'
          href={href || "#"}
          customClassName='btn-primary-fill-variant w-full tablet:w-max rounded-full justify-center 
        py-3 px-6 laptop:hidden flex'
          textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          animateIcon={true}
          iconAnimation='rotate'
          iconRotation={45}
        />
      </AnimationReveal>
    </footer>
  );
};
