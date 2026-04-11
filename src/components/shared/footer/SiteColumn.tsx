import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTING } from "@/config/constant.config";

interface SiteColumnProps {
  className?: string;
}

export const SiteColumn = ({ className }: SiteColumnProps) => {
  return (
    <article className={cn("flex flex-col gap-[26px]", className)}>
      <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
        Site
      </span>
      <ul className='flex flex-col gap-4 pb-5' aria-label='Site Links'>
        <li>
          <Link
            href={ROUTING.PRIVACY_POLICY}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='Privacy Policy'
            aria-label='Privacy Policy Link'
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.TERMS_AND_CONDITIONS}
            title='Terms and Conditions'
            aria-label='Terms and Conditions Link'
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
          >
            Terms and Conditions
          </Link>
        </li>
        <li>
          <Link
            href={ROUTING.COOKIE_POLICY}
            className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
            title='Cookie Policy'
            aria-label='Cookie Policy Link'
          >
            Cookie Policy
          </Link>
        </li>
      </ul>
    </article>
  );
};
