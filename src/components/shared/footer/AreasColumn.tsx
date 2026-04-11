import { ROUTING } from "@/config/constant.config";
import { AreaModel } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/dist/client/link";
import React from "react";
import { LinkItem } from "./LinkItem";

interface AreasColumnProps {
  className?: string;
  areas?: AreaModel[];
}

export const AreasColumn = ({ className, areas }: AreasColumnProps) => {
  return (
    <article className={cn("flex flex-col gap-[26px]", className)}>
      <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
        Buy properties in
      </span>
      <ul className='flex flex-col gap-4 pb-5' aria-label='Areas Links'>
        {areas?.map((area) => (
          <LinkItem
            key={area.id}
            href={`${ROUTING.PROPERTIES_BY_AREAS}/${area.attributes.slug}`}
            title={area.attributes.Area_name}
            ariaLabel={area.attributes.Area_name}
          />
        ))}
      </ul>
    </article>
  );
};
