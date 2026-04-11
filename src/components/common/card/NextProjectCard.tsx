import React from "react";
import { TextButton } from "../button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import Image from "next/image";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";

interface NextProjectCardProps {
  index: number;
  totalProjects: number;
  projectTitle: string;
  projectImage: string;
  handleNext: () => void;
}

export const NextProjectCard = ({
  index,
  totalProjects,
  projectTitle,
  projectImage,
  handleNext,
}: NextProjectCardProps) => {
  return (
    <article
      className='flex flex-row gap-0 p-0 rounded-2xl overflow-hidden select-none
                    bg-on-surface-background tablet:bg-surface-container-background w-full'
      onClick={handleNext}
    >
      <div className='flex flex-col gap-5 p-4 tablet:p-5 flex-1'>
        <div className='flex flex-col gap-2 pb-0 tablet:pb-4'>
          <span
            className='text-terciary-foreground text-[10px] leading-[180%] font-medium uppercase 
                          tracking-[0.96px] line-clamp-1 opacity-60'
          >
            {index + 1}/{totalProjects}
          </span>
          <p
            className='text-accent-foreground leading-[180%] tablet:leading-[140%] font-bold tablet:font-semibold text-[15px] 
            tablet:text-[16px] tracking-normal tablet:tracking-[-0.32px] line-clamp-2'
          >
            {projectTitle}
          </p>
        </div>
        <TextButton
          text={"Next in view"}
          textClassName='leading-[95%] heading-secondary! text-secondary text-[11px]'
          state={"default"}
          customClassName='btn-secondary-variant w-max gap-1.5 hidden tablet:flex'
          iconClassName='text-accent-solid rotate-45 size-[18px]!'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          onClick={handleNext}
        />
      </div>
      <figure className='hidden tablet:block min-h-full overflow-hidden w-[200px]'>
        <Image
          src={
            projectImage
              ? ENVIRONMENT.API_URL + projectImage
              : "/images/fallback-image.webp"
          }
          alt={projectTitle}
          width={500}
          height={500}
          loading='eager'
          className='object-cover h-full'
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(400, 500)
          )}`}
        />
      </figure>
    </article>
  );
};
