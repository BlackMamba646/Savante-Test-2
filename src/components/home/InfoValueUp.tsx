import { cn } from "@/lib/utils";
import React from "react";
import { AnimatedCounter } from "../common/text/AnimatedCounter";

interface InfoValueUpProps {
  type?: "vertical" | "horizontal" | "one-line";
  big?: boolean;
  value: string;
  label: string;
  className?: string;
  role?: React.HTMLAttributes<HTMLDivElement>["role"];
  animated?: boolean;
}

export const InfoValueUp = ({
  type = "vertical",
  big = false,
  value,
  label,
  className = "",
  role = "",
  animated = false,
}: InfoValueUpProps) => {
  return (
    <div className={cn("flex flex-col gap-0", className)} role={role}>
      <p className='text-accent-foreground quote-text font-semibold tracking-[-0.4px]'>
        {animated ? <AnimatedCounter value={value} duration={2} /> : value}
      </p>
      <span className='text-terciary-foreground text-[12px] font-medium leading-[200%]'>
        {label}
      </span>
    </div>
  );
};
