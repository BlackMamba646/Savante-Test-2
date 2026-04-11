import Link from "next/link";
import React from "react";

interface LinkItemProps {
  href: string;
  title: string;
  ariaLabel: string;
  target?: "_blank" | "_self";
  rel?: "noopener noreferrer";
  prefetch?: boolean;
}

export const LinkItem = ({
  href,
  title,
  ariaLabel,
  target,
  rel,
  prefetch,
}: LinkItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className='text-[14px] text-secondary/60 font-light font-montserrat
                    leading-[180%] hover:underline transition-all duration-200'
        title={title}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        prefetch={prefetch}
      >
        {title}
      </Link>
    </li>
  );
};
