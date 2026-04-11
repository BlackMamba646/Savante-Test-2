import { cn } from "@/lib/utils";
import React from "react";
import { AnimatedCounter } from "./AnimatedCounter";

interface BigStatsLeftProps {
  title: string;
  value: string;
  largeLabel?: boolean;
  className?: string;
  disableAnimation?: boolean;
}

export const BigStatsLeft = ({
  title,
  value,
  largeLabel = false,
  className,
  disableAnimation = false,
}: BigStatsLeftProps) => {
  // Extract number and suffix from value (e.g., "100+" -> number: 100, suffix: "+")
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)?$/);
  const numericValue = match ? match[1] : value;
  const suffix = match ? match[2] || "" : "";

  return (
    <div
      className={cn(`flex flex-row items-center gap-3 ${largeLabel ? "min-w-auto laptop:max-w-[234px]" : "min-w-[150px] laptop:max-w-[190px]"
        }`, className)}
    >
      <h2 className='text-accent-solid tracking-[-1.84px] leading-[120%]'>
        {disableAnimation ? <span>{numericValue}</span> : <AnimatedCounter value={numericValue} />}
        {suffix}
      </h2>
      <p
        className={`text-terciary-foreground font-medium text-[10px] leading-[180%] 
      tracking-[0.6px] uppercase ${largeLabel ? "laptop:max-w-[240px]" : "laptop:max-w-[90px]"
          }`}
      >
        {title}
      </p>
    </div>
  );
};
