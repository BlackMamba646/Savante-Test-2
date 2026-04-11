import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InstagramReel } from "@/interfaces/instagram-response.interface";
import { PlayCircle, PlayCircleIcon } from "lucide-react";
import { AnimationReveal } from "../ui/animation-reveal";

interface PostsGridProps {
  reels?: InstagramReel[];
}

export const PostsGrid = ({ reels = [] }: PostsGridProps) => {
  if (!reels || reels.length === 0) {
    return (
      <ul
        className='grid grid-cols-2 w-full tablet:w-auto tablet:grid-cols-4 self-center laptop:self-auto 
      grid-rows-2 gap-2'
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <PostItemStatic key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul
      className='grid grid-cols-2 w-full tablet:w-auto tablet:grid-cols-4 self-center laptop:self-auto 
    grid-rows-2 gap-2'
    >
      {reels.slice(0, 8).map((reel, index) => (
        <PostItem key={reel.id} reel={reel} index={index} />
      ))}
    </ul>
  );
};

const PostItem = ({ reel, index }: { reel: InstagramReel; index: number }) => {
  const hideOnMobile = index >= 4;

  return (
    <AnimationReveal
      x={0}
      y={0}
      delay={0.5 + index * 0.1}
      duration={0.3}
      opacity={1}
      type='li'
      className={`relative w-full tablet:w-[150px] h-[228px] ${
        hideOnMobile ? "hidden tablet:block" : ""
      } group`}
    >
      <Link
        href={reel.url}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block w-full h-full'
        title={`View reel on Instagram`}
        aria-label={`View reel ${reel.caption}`}
      >
        <Image
          src={reel.thumbnailUrl || reel.displayUrl}
          alt={reel.caption || `Reel ${index + 1}`}
          width={150}
          height={228}
          className='object-cover w-full h-full transition-transform duration-300'
        />

        <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity'>
          <PlayCircleIcon className='w-10 h-10 text-white drop-shadow-lg' />
        </div>
      </Link>
    </AnimationReveal>
  );
};

const PostItemStatic = () => {
  return (
    <li className='relative w-full tablet:w-[150px] h-[228px] [&:nth-child(n+5)]:hidden tablet:[&:nth-child(n+5)]:block'>
      <Image
        src='/images/social/instagram/example.jpg'
        alt='Instagram post'
        width={150}
        height={228}
        className='object-cover w-full h-full rounded-lg'
      />
    </li>
  );
};
