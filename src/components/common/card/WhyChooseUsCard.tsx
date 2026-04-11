import { Buildings } from "@/components/shared/icons/buildings";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { cn } from "@/lib/utils";
import React from "react";

interface WhyChooseUsCardProps {
  index: number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  disableAnimation?: boolean;
  isActive?: boolean;
}

export const WhyChooseUsCard = ({
  index,
  icon,
  title,
  description,
  disableAnimation = false,
  isActive = false,
}: WhyChooseUsCardProps) => {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-3 tablet:gap-4 laptop:gap-5 rounded-2xl p-6 h-full",
        "transition-colors duration-500 ease-in-out",
        isActive
          ? "bg-surface-container-background dark"
          : "bg-surface-container-background"
      )}
    >
      <div className='flex flex-row gap-2.5 items-center py-2.5'>
        <figure className='relative text-terciary-foreground'>
          {icon || <Buildings size={20} />}
        </figure>
        <h5 className='text-secondary tracking-[-0.4px]'>
          {String(index).padStart(2, "0")}
        </h5>
      </div>
      <p className='text-secondary quote-text font-semibold tracking-[-0.78px] leading-[140%]'>
        {title}
      </p>
      <p
        className='text-terciary-foreground text-[14px] laptop:text-[15px] font-normal leading-[180%] 
        tracking-normal max-w-[480px]'
      >
        {description}
      </p>
    </div>
  );

  return disableAnimation ? (
    <li className='h-full'>{content}</li>
  ) : (
    <AnimationReveal
      y={10}
      delay={0.7 + index * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='li'
      className='h-full'
    >
      {content}
    </AnimationReveal>
  );
};

