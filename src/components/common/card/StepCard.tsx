import { StepProps } from "@/data/steps";
import { cn } from "@/lib/utils";
import React from "react";

interface StepCardProps extends StepProps {
  isActive?: boolean;
}

export const StepCard = ({
  index,
  title,
  description,
  icon,
  isActive = false,
}: StepCardProps) => {
  return (
    <li className='flex flex-row gap-2 tablet:gap-4 relative z-10'>
      <div className='flex flex-col gap-3 justify-center items-center'>
        {/* La unica dierencia ver como ponerlo solo en el primero:p */}
        {index === 1 && (
          <div className='relative z-[100] w-2 h-2 bg-accent-foreground rounded-full'></div>
        )}
        <div className='relative z-0 flex-1 bg-secondary-stroke/80 border-[0px] tablet:border-0 border-secondary-stroke flex flex-col justify-start items-start gap-2.5 overflow-hidden'>
          <div className='self-stretch bg-accent-foreground'></div>
        </div>
        <div className='relative z-[100] w-2 h-2 bg-accent-foreground rounded-full'></div>
      </div>
      <div
        className={cn(
          "bg-surface-container-background flex tablet:flex-row",
          "flex-col gap-3 p-4 tablet:p-6 w-full rounded-xl tablet:rounded-3xl overflow-hidden transition-all ease-in-out duration-300",
          isActive && "dark"
        )}
      >
        <div className='flex flex-col gap-2.5 flex-1'>
          <div className='flex flex-col gap-[34px]'>
            <h3 className='text-accent-foreground font-medium uppercase leading-[140%] tracking-[-1.6px] font-crimson'>
              {String(index).padStart(2, "0")}
            </h3>
            <p className='quote-text text-primary-foreground line-clamp-2
                        leading-[140%] tracking-[-0.4px] font-semibold'>
              {title}
            </p>
          </div>
          <p className='text-[15px] text-terciary-foreground leading-[180%]'>
            {description}
          </p>
        </div>
        <div
          className='self-end tablet:self-start bg-on-surface-background flex items-center justify-center 
        p-6 rounded-xl overflow-hidden outline-1 outline-secondary-stroke/40 tablet:outline-0'
        >
          <figure className='relative text-icon-secondary-button'>
            {React.createElement(icon)}
          </figure>
        </div>
      </div>
    </li>
  );
};
