import React from "react";
import { Info } from "../common/text/Info";
import { formatFeatures } from "@/utils/utils";
import { ENVIRONMENT } from "@/config/env.config";
import { Bed } from "../shared/icons/bed";
import { Toilet } from "../shared/icons/toilet";
import { Polygon } from "../shared/icons/polygon";
import { Buildings } from "../shared/icons/buildings";

interface PropertyFeaturesProps {
  property_type: string;
  price: string;
  square_feet: string;
  beds: number;
  baths: number;
}

export const PropertyFeatures = (props: PropertyFeaturesProps) => {
  const { property_type, price, square_feet, beds, baths } = props;
  return (
    <div className='flex flex-col tablet:flex-row gap-[24px] tablet:spacing-gap'>
      <div className='flex flex-col gap-0 animate-fade-in-left delay-700 animate-distance-xs duration-300'>
        <span className='text-[12px] font-plus text-terciary-foreground font-light leading-[200%]'>
          Prices From
        </span>
        <span className='text-[18px] font-plus text-accent-foreground font-medium leading-[160%]'>
          {formatFeatures.formatNumber(Number(price)) +
            " " +
            ENVIRONMENT.CURRENCY}
        </span>
      </div>
      <ul className='flex flex-row gap-4 tablet:gap-6 items-center flex-wrap'>
        <li className='flex flex-row gap-[5px] items-center
        animate-fade-in-up delay-800 animate-distance-xs duration-300'>
          <figure className='text-secondary'>
            <Bed size={20} />
          </figure>
          <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
            {beds === 0 ? "Studio" : beds}{" "}
            {beds > 0 && (
              <span className='hidden tablet:inline-block'>
                {beds > 1 ? "Beds" : "Bed"}
              </span>
            )}
          </span>
        </li>
        <li className='flex flex-row gap-[5px] items-center
        animate-fade-in-up delay-900 animate-distance-xs duration-300'>
          <figure className='text-secondary'>
            <Toilet size={20} />
          </figure>
          <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
            {baths} <span className="hidden tablet:inline-block">Baths</span>
          </span>
        </li>
        <li className='flex flex-row gap-[5px] items-center
        animate-fade-in-up delay-1000 animate-distance-xs duration-300'>
          <figure className='text-secondary'>
            <Polygon size={20} />
          </figure>
          <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
            {square_feet} <span className="hidden tablet:inline-block">SQ.FT</span>
          </span>
        </li>
        <li className='hidden tablet:flex flex-row gap-[5px] items-center
        animate-fade-in-up delay-1100 animate-distance-xs duration-300'>
          <figure className='text-secondary'>
            <Buildings size={20} />
          </figure>
          <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
            {property_type}
          </span>
        </li>
      </ul>
    </div>
  );
};

/*
<div className='flex flex-col gap-6'>
        <div className='hidden tablet:flex flex-col'>
            <p className='text-[15px] text-terciary-foreground leading-[180%] line-clamp-1'>
              {property_type}{" "}
              <span className='text-accent font-bold px-0.5'>
                For {operation}
              </span>{" "}
              in {address}
            </p>
            <h1 className='text-primary leading-[120%] tracking-[-2px] text-[3.25rem]'>
              {title}
            </h1>
        </div>
        <div className='flex flex-col laptop:flex-row gap-5 laptop:gap-10 items-start laptop:items-center w-full'>
          <span className='font-semibold text-[20px] tablet:text-[26px] laptop:text-[30px] tracking-wide leading-[180%] uppercase text-accent-foreground'>
            {formatFeatures.formatCurrency(Number(price))} AED
          </span>
          <ul className='flex flex-row gap-4 items-center flex-wrap'>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure className='text-accent-foreground'>
                <Bed size={18} />
              </figure>
              <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
                {beds === 0 ? "Studio" : beds}{" "}
                {beds > 0 && (
                  <span className='hidden tablet:inline-block'>
                    {beds > 1 ? "Beds" : "Bed"}
                  </span>
                )}
              </span>
            </li>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure className='text-accent-foreground'>
                <Toilet size={18} />
              </figure>
              <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
                {baths} Baths
              </span>
            </li>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure className='text-accent-foreground'>
                <Polygon size={18} />
              </figure>
              <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
                {total_area} SQ.FT
              </span>
            </li>
            <li className='flex flex-row gap-[5px] items-center'>
              <figure className='text-accent-foreground'>
                <Buildings size={18} />
              </figure>
              <span className='text-[15px] font-plus text-terciary-foreground font-light leading-[180%]'>
                {property_type}
              </span>
            </li>
          </ul>
        </div>
      </div>
*/
