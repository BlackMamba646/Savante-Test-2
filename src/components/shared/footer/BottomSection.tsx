import { ROUTING } from "@/config/constant.config";
import Link from "next/link";
import React from "react";

export const BottomSection = () => {
  return (
    <div
      className='flex flex-col-reverse laptop:flex-row items-start laptop:items-center justify-center
        spacing-padding-x tablet:px-[40px] laptop:spacing-padding-x py-1 tablet:py-3 gap-1 laptop:gap-0'
    >
      <p
        className='text-[10px] laptop:text-[12px] text-terciary-foreground tracking-normal tablet:tracking-[0.6px] laptop:tracking-normal
        normal-case tablet:uppercase laptop:normal-case font-light leading-[180%] opacity-60 laptop:opacity-80'
      >
        © 2026 - Savante Realty. All Rights Reserved.
        <a
          href='https://www.propphy.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[10px] laptop:text-[12px] text-terciary-foreground leading-[180%]'
        >
          Built with 🤍 by Propphy
        </a>
      </p>
      <ul className='flex flex-row gap-4 flex-wrap tablet:hidden'>
        <li>
          <Link
            href={ROUTING.PRIVACY_POLICY}
            target='_blank'
            className='text-[14px] text-secondary/60 font-light 
                    leading-[180%] hover:underline transition-all duration-200'
            title='About Us'
            aria-label='About Us Link'
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.TERMS_AND_CONDITIONS}
            target='_blank'
            title='Terms & Conditions'
            aria-label='Terms & Conditions'
            className='text-[14px] text-secondary/60 font-light 
                    leading-[180%] group hover:underline transition-all duration-200'
          >
            Terms & C
            <span className='hidden tablet:inline-block group-hover:underline'>
              onditions
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.COOKIE_POLICY}
            target='_blank'
            className='text-[14px] text-secondary/60 font-light 
                    leading-[180%] hover:underline transition-all duration-200'
            title='About Us'
            aria-label='About Us Link'
          >
            Cookie Policy
          </Link>
        </li>
      </ul>
    </div>
  );
};
