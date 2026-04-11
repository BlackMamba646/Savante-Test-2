import { cn } from "@/lib/utils";
import React from "react";

interface FeatureItemProps {
  type: "item-check" | "item-text";
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

export const FeatureItem = ({
  type,
  text,
  icon,
  className,
}: FeatureItemProps) => {
  return (
    <div className={cn("flex flex-row items-center gap-3", className)}>
      <figure className='relative rounded-full outline-1 outline-primary-stroke p-[6px] text-terciary-foreground'>
        {icon}
      </figure>
      <p className='text-secondary leading-[200%] text-[12px] font-plus'>{text}</p>
    </div>
  );
};
