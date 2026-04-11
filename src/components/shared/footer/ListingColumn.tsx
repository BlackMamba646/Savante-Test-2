import { ROUTING } from "@/config/constant.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ListingColumnProps {
  className?: string;
}

export const ListingColumn = ({ className }: ListingColumnProps) => {
  return (
    <article className={cn("flex flex-col gap-[26px]", className)}>
      <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
        Listing
      </span>
      <ul className='flex flex-col gap-4 pb-5' aria-label='Company Links'>
        <li>
          <Link
            href={ROUTING.FOR_SALE}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='For Sale'
            aria-label='For Sale Link'
          >
            Buy
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.FOR_RENT}
            title='For Rent'
            aria-label='For Rent Link'
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
          >
            Rent
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.OFF_PLAN}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='Off Plan'
            aria-label='Off Plan Link'
          >
            New Developments
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.LIST_YOUR_PROPERTY}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='List Your Property'
            aria-label='List Your Property Link'
          >
            List Your Property
          </Link>
        </li>
      </ul>
    </article>
  );
};
