import { YoutubeLogo } from "@/components/shared/icons/logo/youtube-logo";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface VideoCardProps {
  videoId: string;
  thumbnail: string;
  alt: string;
  description: string;
  title: string;
  className?: string;
}

export const VideoCard = ({
  videoId,
  thumbnail,
  alt,
  description,
  title,
  className,
}: VideoCardProps) => {
  return (
    <li
      className={cn(
        "relative w-full rounded-xl tablet:rounded-2xl laptop:rounded-3xl border-[0px]",
        "tablet:border-[4px] laptop:border-[6px] border-surface-background select-none",
        "overflow-hidden shadow-xl cursor-pointer aspect-video group last:hidden tablet:last:block",
        className
      )}
      title={title}
    >
      <Link
        aria-label={`Watch ${title} in YouTube`}
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target='_blank'
        rel='noopener noreferrer'
        className='relative outline-[6px] outline-surface-background'
      >
        <Image
          src={thumbnail}
          alt={title}
          width={430}
          height={240}
          className='object-cover w-full h-full'
        />
      </Link>
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 
        transition-transform duration-300 ease-out pointer-events-none'
      >
        <figure className='relative h-[36px]'>
          <YoutubeLogo />
        </figure>
      </div>
    </li>
  );
};
