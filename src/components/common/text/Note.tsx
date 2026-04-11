import { cn } from "@/lib/utils";
import React from "react";

interface NoteProps {
  textCaption?: string;
  hightlightText?: string;
  bodyText?: string;
  className?: string;
}

export const Note = ({
  textCaption,
  hightlightText,
  bodyText,
  className,
}: NoteProps) => {
  return (
    <div className={cn("flex flex-col gap-2 laptop:gap-5 py-2", className)}>
      <span
        className='text-terciary-foreground text-[12px] tablet:text-[10px] normal-case tablet:uppercase
      tablet:tracking-[0.6px] tracking-normal leading-[200%] tablet:leading-[180%] font-normal tablet:font-medium'
      >
        {textCaption}
      </span>
      <div className='flex flex-col gap-2'>
        <p className='text-accent-solid quote-text leading-[180%] tracking-[0.8px] uppercase font-crimson max-w-[900px]'>
          {hightlightText}
        </p>
        {bodyText && (
          <p className='text-terciary-foreground text-[14px] leading-[180%] tracking-normal'>
            {bodyText}
          </p>
        )}
      </div>
    </div>
  );
};
