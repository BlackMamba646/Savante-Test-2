import { ROUTING } from "@/config/constant.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface CompanyColumnProps {
  className?: string;
  onClick?: () => void;
}

export const CompanyColumn = ({ className, onClick }: CompanyColumnProps) => {
  return (
    <article className={cn('flex flex-col gap-[26px]', className)}>
      <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
        Company
      </span>
      <ul className='flex flex-col gap-4 pb-5' aria-label='Company Links'>
        <li>
          <Link
            href={ROUTING.HOME}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='Homepage'
            aria-label='Homepage Link'
          >
            Homepage
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.BLOGS}
            title='Guides'
            aria-label='Guides Link'
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
          >
            News
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.ABOUT_US}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='About Us'
            aria-label='About Us Link'
          >
            About Us
          </Link>
        </li>
        <li>
          <button
            onClick={onClick}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='Contact'
            aria-label='Contact Link'
          >
            Contact
          </button>
        </li>
      </ul>
    </article>
  );
};
