import { AreaBackgroundCard } from "@/components/common/card/AreaBackgroundCard";
import { AreaModel } from "@/interfaces";
import React from "react";

interface AreasProps {
  areas?: AreaModel[];
}

export const ExploreAreas = (props: AreasProps) => {
  const { areas } = props;

  // Layout con orden diferente en mobile/tablet y laptop
  const gridClasses = [
    "col-span-2 order-4 laptop:order-1 laptop:col-span-2 laptop:col-start-1 laptop:row-start-1",
    "col-span-1 order-2 laptop:order-2 laptop:col-start-3 laptop:row-start-1",
    "col-span-1 order-3 laptop:order-3 laptop:col-start-4 laptop:row-start-1",
    "col-span-1 order-5 laptop:order-4 laptop:col-start-1 laptop:row-start-2",
    "col-span-1 order-6 laptop:order-5 laptop:col-start-2 laptop:row-start-2",
    "col-span-2 order-1 laptop:order-6 laptop:col-span-2 laptop:col-start-3 laptop:row-start-2",
  ];

  return (
    <section className='relative bg-surface-background overflow-hidden'>
      <div
        className='relative max-w-[1440px] mx-auto flex flex-col spacing-padding-y spacing-padding-x 
        gap-[26px]'
      >
        <h2 className='text-primary-foreground tracking-[-1.38px]'>
          Explore Key Investment Areas
        </h2>
        <ul className='grid grid-cols-2 grid-rows-4 laptop:grid-cols-4 laptop:grid-rows-2 gap-2'>
          {areas?.map((area, index) => (
            <AreaBackgroundCard
              key={area.id}
              index={index}
              title={area.attributes.Area_name}
              image={area.attributes.Image.data.attributes.url}
              slug={area.attributes.slug}
              className={gridClasses[index]}
              disableAnimation={false}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
