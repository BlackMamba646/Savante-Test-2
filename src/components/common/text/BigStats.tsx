import { extractNumbersFromText } from "@/utils/utils";
import React, { FC } from "react";
import { AnimatedCounter } from "./AnimatedCounter";
import { cn } from "@/lib/utils";

interface BigStatsProps {
  id?: number;
  title: string;
  value: string;
  bodyText?: string;
  icon?: FC;
  headingType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  customClassName?: string;
  iconClassName?: string;
  showIconLeft?: boolean;
  showIconRight?: boolean;
}

export const BigStats = ({
  id,
  title,
  value,
  bodyText,
  icon,
  headingType = "h4",
  customClassName,
  iconClassName,
  showIconLeft = true,
  showIconRight = false,
}: BigStatsProps) => {
  const {
    sign = "",
    prefix = "",
    number = "",
    unit = "",
  } = extractNumbersFromText(title);
  const HeadingTag = headingType;

  const iconElement = icon && (
    <figure className={cn("relative w-[22px]", iconClassName)}>
      {React.createElement(icon)}
    </figure>
  );

  return (
    <li
      className={cn(
        "flex w-full max-w-full tablet:max-w-[360px]",
        customClassName
      )}
    >
      <div className={"flex flex-col gap-1 laptop:gap-0 w-full"}>
        <div className={"flex flex-row items-center gap-1"}>
          {showIconLeft && iconElement}
          <HeadingTag className='text-accent-foreground font-medium'>
            {sign}
            {prefix}
            {number && <AnimatedCounter value={number} duration={2} />}
            {unit}
          </HeadingTag>
          {showIconRight && iconElement}
        </div>
        <div className={"title-body-text flex flex-col gap-0 tablet:gap-[16px] laptop:gap-[26px] pt-0 laptop:pt-1"}>
          <p
            className='font-crimson laptop:font-plus text-primary-foreground laptop:text-secondary leading-[160%] opacity-100 tablet:opacity-80
            font-medium quote-text first-letter:uppercase tracking-[-0.4px]'
          >
            {value}
          </p>
          <span
            className='text-terciary-foreground text-[12px] tablet:text-[14px] laptop:text-[15px] 
            tracking-normal leading-[180%]'
          >
            {bodyText}
          </span>
        </div>
      </div>
    </li>
  );
};
