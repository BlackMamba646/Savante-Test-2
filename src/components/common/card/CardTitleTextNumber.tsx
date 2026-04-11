import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

interface CardTitleTextNumberProps {
  index: number;
  title: string;
  bodyText: string;
}

export const CardTitleTextNumber = ({
  index,
  title,
  bodyText,
}: CardTitleTextNumberProps) => {
  return (
    <React.Fragment>
      <li
        role="group"
        aria-label={title}
        className="flex flex-col gap-3 py-2.5"
      >
        <div className="flex flex-col gap-[14px] tablet:gap-[26px] laptop:gap-[34px]">
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.2}
            duration={0.3}
            type="div"
            opacity={1}
            className="w-[32px] h-[4px] bg-accent-foreground"
          ></AnimationReveal>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.4 + index * 0.2}
            duration={0.5}
            type="p"
            opacity={1}
            className="text-[14px] laptop:text-[16px] text-primary-foreground font-medium tracking-[1.12px] 
        tablet:tracking-[1.28px] uppercase"
          >
            {title}
          </AnimationReveal>
        </div>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.5 + index * 0.2}
          duration={0.5}
          type="p"
          opacity={1}
          className="text-[14px] text-terciary-foreground font-montserrat leading-[180%]"
        >
          {bodyText}
        </AnimationReveal>
      </li>
      <div
        aria-hidden="true"
        role="separator"
        className="h-full w-[1px] bg-primary-stroke hidden laptop:block [&:nth-last-child(3n+1)]:hidden"
      ></div>
    </React.Fragment>
  );
};
