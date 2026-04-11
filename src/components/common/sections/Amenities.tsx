import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

interface AmenitiesProps {
  items?: string | string[];
  title?: string;
  className?: string;
}

export const Amenities = ({ items, title, className }: AmenitiesProps) => {
  let itemsArray: string[] = [];

  if (typeof items === "string") {
    itemsArray = items
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  } else if (Array.isArray(items)) {
    itemsArray = items;
  }

  if (itemsArray.length === 0) {
    return null;
  }

  const totalCols = 4;
  const baseCount = Math.floor(itemsArray.length / totalCols);
  const rem = itemsArray.length % totalCols;
  const columns: string[][] = [];

  let start = 0;
  for (let col = 0; col < totalCols; col++) {
    const extra = col < rem ? 1 : 0;
    const end = start + baseCount + extra;
    columns.push(itemsArray.slice(start, end));
    start = end;
  }

  return (
    <section
      id='amenities'
      className={`bg-white relative overflow-hidden ${className}`}
    >
      <div className='flex flex-col gap-[26px] w-full'>
        <h3
          className='text-primary-foreground tracking-[-1.6px] leading-[140%] 
            line-clamp-2 font-medium'
        >
          {title}
        </h3>
        <div
          className='grid grid-cols-1 grid-rows-[auto] tablet:grid-cols-2 tablet:grid-rows-2 
          laptop:grid-cols-[repeat(4,1fr)] laptop:grid-rows-1 gap-[10px] tablet:gap-[40px] laptop:gap-[40px]'
        >
          {columns.map((colItems, colIdx) => (
            <ul
              className='flex flex-col gap-2.5 tablet:gap-3 mobile:basis-[268px]'
              key={colIdx}
            >
              {colItems.map((feature, idx) => (
                <AnimationReveal
                  x={0}
                  y={10}
                  delay={0.2 + idx * 0.1 + colIdx * 0.1}
                  duration={0.5}
                  opacity={1}
                  key={idx}
                  className='flex flex-row items-center gap-2.5 py-1 tablet:py-1.5'
                >
                  <span
                    className='text-accent-foreground font-crimson quote-text translate-y-1.5 tablet:translate-y-1 laptop:translate-y-0.5 leading-[100%] laptop:leading-[110%] font-semibold 
                  uppercase self-start'
                  >
                    {String(
                      columns
                        .slice(0, colIdx)
                        .reduce((acc, col) => acc + col.length, 0) +
                        idx +
                        1
                    ).padStart(2, "0")}
                  </span>
                  <p className='leading-[180%] text-[14px] first-letter:uppercase text-secondary-foreground font-montserrat'>
                    {feature}
                  </p>
                </AnimationReveal>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
