/* import { CardTitleTextNumber } from "@/components/common/card/CardTitleTextNumber";
import { WhyUs as WhyUsType } from "@/interfaces/about-us-interface";
import React from "react";

export const WhyUs = ({ whyUs }: { whyUs: WhyUsType }) => {
  
  return (
    <section className='relative'>
      <div className='relative max-w-[1440px] mx-auto flex flex-col spacing-gap spacing-padding-x spacing-padding-y'>
        <h2 className='text-primary-foreground font-medium tracking-[-1.92px]'>
          {whyUs.Title}
        </h2>
        <ul
          className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-[repeat(5,auto)] grid-rows-[auto] laptop:grid-rows-2 gap-x-5 gap-y-6 
          laptop:gap-y-0 px-0 py-2.5 laptop:px-5 laptop:py-0'
        >
          {whyUs.About_item?.map((item, index) => (
            <CardTitleTextNumber
              key={item.id}
              index={index}
              title={item.Title}
              bodyText={item.Paragraph}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
 */