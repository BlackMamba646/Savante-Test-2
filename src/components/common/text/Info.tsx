import { AnimationReveal } from "@/components/ui/animation-reveal";
import { cn } from "@/lib/utils";
import React from "react";

interface InfoProps {
  label: string;
  value: string | string[];
  big?: boolean;
  type?: "number" | "text";
  delay?: number;
  disableAnimation?: boolean;
  className?: string;
}

export const Info = ({
  label,
  value,
  big = false,
  type = "number",
  delay = 0,
  disableAnimation = false,
  className = "",
}: InfoProps) => {
  const content = (
    <>
      <p className='text-terciary-foreground leading-[200%] text-[12px] font-normal'>
        {label}
      </p>
      <p className='text-accent-foreground leading-[100%] text-[12px] tablet:text-[14px] font-medium self-center tablet:self-start'>
        <span className='inline-block'>{value}</span>
      </p>
    </>
  );

  if (disableAnimation) {
    return (
      <div
        className={cn(
          "flex flex-row tablet:flex-col items-start tablet:items-start gap-0 tablet:gap-1",
          className
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <AnimationReveal
      x={0}
      y={5}
      delay={delay}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='div'
      className={cn(
        "flex flex-row tablet:flex-col items-start tablet:items-start gap-2 tablet:gap-1 last:hidden tablet:last:flex",
        className
      )}
    >
      {content}
    </AnimationReveal>
  );
};
