"use client";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ENVIRONMENT } from "@/config/env.config";
import Image from "next/image";
import React from "react";
import { ContactModal } from "../modal/ContactModal";
import { TextButton } from "../button/TextButton";
import { shimmer, toBase64 } from "@/lib/image-placeholders";

interface DescriptionProps {
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export const Description = ({
  title,
  subtitle,
  description,
  image,
}: DescriptionProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

  return (
    <section className='relative bg-surface-background'>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x overflow-hidden flex 
        laptop:flex-row flex-col-reverse spacing-gap'
      >
        <div className='flex-1 flex flex-col gap-9 tablet:gap-10 laptop:gap-16 justify-start laptop:justify-between'>
          <div className='flex flex-col gap-[24px]'>
            <div className='flex flex-col gap-4'>
              <div className='h-[1px] bg-accent-foreground w-[48px]'></div>
              <div className='flex flex-col gap-1'>
                <h3
                  className='text-primary-foreground tracking-[-1.6px] leading-[140%] line-clamp-2
                font-medium animate-fadeInLeft-hidden duration-normal delay-100'
                >
                  {title}
                </h3>
                <span
                  className='text-xs text-terciary-foreground font-semibold uppercase 
                    tracking-[0.96px] leading-[180%] animate-fadeInLeft-hidden duration-normal delay-300'
                >
                  {subtitle}
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <p
                className='text-[15px] font-normal font-montserrat text-terciary-foreground leading-[180%] 
                   tracking-normal text-pretty whitespace-pre-line animate-fadeIn-hidden duration-normal delay-500'
              >
                {description}
              </p>
            </div>
          </div>
          <TextButton
            text='Contact us'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-max'
            textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
            animateIcon={true}
            iconRotation={45}
            onClick={() => setIsContactModalOpen(true)}
          />
        </div>
        <figure
          className='flex-1 order-1 laptop:order-2 relative h-[220px] 
        tablet:h-[340px] rounded-2xl overflow-hidden self-center max-h-full laptop:max-h-[600px]'
        >
          <Image
            src={ENVIRONMENT.API_URL + image || ""}
            alt={title ?? ""}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover w-full h-full'
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(710, 360)
            )}`}
          />
        </figure>
      </div>
    </section>
  );
};
