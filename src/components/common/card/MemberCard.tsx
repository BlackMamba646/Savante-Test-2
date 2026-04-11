import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface MemberCardProps {
  id: string | number;
  name: string;
  role: string;
  languages: string[];
  image: string;
  slug: string;
  hasLanguages?: boolean;
}

export const MemberCard = (props: MemberCardProps) => {
  const { id, name, role, languages, image, slug = "/", hasLanguages } = props;

  return (
    <Link
      href={slug}
      className='flex flex-col gap-4 group'
      aria-label={`View ${name} details`}
    >
      <figure className='relative rounded-2xl overflow-hidden'>
        <Image
          src={image}
          alt={`${name} profile image`}
          height={400}
          width={700}
          className='object-cover h-[240px] w-full transition-transform duration-300 group-hover:scale-105'
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1014, 580)
          )}`}
        />
        <div className='absolute bottom-2.5 right-2.5 pl-2.5'>
          {hasLanguages && (
            <ul className='flex flex-row gap-2 overflow-hidden flex-wrap'>
              {languages?.map((language: string) => (
                <li
                  key={`language-${language}`}
                  className='rounded-xl py-2 px-3 bg-surface-container-background outline-1 
                  outline-secondary-stroke text-[12px] leading-[110%] text-secondary'
                >
                  {language}
                </li>
              ))}
            </ul>
          )}
        </div>
      </figure>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-[15px] text-primary-foreground uppercase font-bold line-clamp-1'>
            {name}
          </span>
          <p className='text-xs text-terciary-foreground font-normal leading-[180%]'>
            {role}
          </p>
        </div>
      </div>
    </Link>
  );
};
