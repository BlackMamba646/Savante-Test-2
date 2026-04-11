import { ROUTING } from "@/config/constant.config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DeveloperCardProps {
  id: string | number;
  name: string;
  logo: string;
  numberOfProjects: number;
  slug: string;
}

export const DeveloperCard = ({
  id,
  name,
  logo,
  numberOfProjects,
  slug,
}: DeveloperCardProps) => {
  const href = `${ROUTING.DEVELOPERS}/${slug}`;

  return (
    <article className='flex flex-col gap-2 relative'>
      <Link href={href}>
        <figure
          className='relative h-[158px] flex items-center justify-center outline-1
         outline-secondary-stroke bg-surface-container-background rounded-xl overflow-hidden
         hover:outline-primary-stroke transition-all duration-300 ease'
        >
          <Image
            src={logo}
            alt={`${name} logo`}
            width={300}
            height={200}
            className='object-contain w-full max-w-[150px] max-h-[78px]'
          />
        </figure>
      </Link>
      <div className='flex flex-row gap-1 tablet:gap-2 justify-start tablet:justify-center leading-[180%] whitespace-nowrap text-ellipsis overflow-hidden'>
        <h2 className='text-terciary-foreground text-[14px] font-plus tablet:text-[15px] leading-[180%]'>
          {name}
        </h2>
        <span className='text-terciary-foreground text-[14px] tablet:text-[15px] leading-[180%]'>
          -
        </span>
        <span className='text-terciary-foreground text-[14px] tablet:text-[15px] leading-[180%]'>
          {numberOfProjects} Projects
        </span>
      </div>
    </article>
  );
};
