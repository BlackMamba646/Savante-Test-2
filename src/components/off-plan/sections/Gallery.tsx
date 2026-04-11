"use client";
import { TextButton } from "@/components/common/button/TextButton";
import { GalleryModal } from "@/components/common/modal/GalleryModal";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ArrowsOut } from "@/components/shared/icons/arrows-out";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import React, { useState } from "react";

interface GalleryProps {
  mainImage: string;
  images: string[];
  developerLogo: string;
}

export const Gallery = ({ mainImage, images, developerLogo }: GalleryProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section id='gallery' className='relative overflow-hidden dark pt-16'>
      {isGalleryOpen && (
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={images}
        />
      )}

      <div className='relative flex flex-col tablet:flex-row pt-[26px] tablet:pt-[64px] rounded-3xl overflow-hidden'>
        {/* Imagen de fondo optimizada con Next.js Image */}
        <div className='absolute inset-0'>
          <Image
            src={ENVIRONMENT.API_URL + mainImage}
            alt='Gallery background'
            fill
            className='object-cover'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {/* Overlay con gradientes */}
          <div
            className='absolute inset-0'
            style={{
              background: `linear-gradient(90deg, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 0%, var(--color-stops-gray-40, rgba(0, 0, 0, 0.40)) 100%)`,
            }}
          />
        </div>

        <article
          className='flex-none tablet:flex-1 relative flex flex-col spacing-padding-x py-0 
        tablet:spacing-padding-y justify-between z-10 items-center tablet:items-start'
        >
          <figure className='max-w-[106px] max-h-[27px]'>
            <Image
              src={ENVIRONMENT.API_URL + developerLogo}
              alt='Developer Logo'
              width={150}
              height={78}
              className='object-contain size-full'
            />
          </figure>
          <div className='flex flex-col gap-2.5 pt-5 w-full text-center tablet:text-left tablet:w-auto'>
            <AnimationReveal
              x={-5}
              y={0}
              delay={0.2}
              duration={0.3}
              opacity={1}
              whileInView={true}
              type='h3'
              className='text-primary-foreground leading-[120%] font-semibold tracking-[-0.8px] font-plus'
            >
              Gallery
            </AnimationReveal>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.4}
              duration={0.3}
              opacity={1}
              whileInView={true}
              type='p'
              className='hidden laptop:block text-primary-foreground text-[10px] leading-[180%] font-medium 
              uppercase tracking-[0.6px]'
            >
              A rare combination of island and luxury for you
            </AnimationReveal>
          </div>
        </article>

        <div
          className='relative flex-1 flex flex-col gap-5 spacing-padding-x laptop:px-10 pt-[200px] tablet:pt-[112px] 
          pb-[26px] tablet:pb-10 z-10'
          style={{
            background: `linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 0%, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 100%)`,
          }}
        >
          <AnimationReveal
            x={0}
            y={5}
            delay={0.6}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='flex flex-row gap-2 tablet:gap-2.5'
          >
            <figure className='relative flex-1 h-[100px] overflow-hidden rounded-2xl'>
              <Image
                src={ENVIRONMENT.API_URL + images[0]}
                alt='Gallery background'
                width={300}
                height={300}
                className='object-cover size-full'
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(100, 100)
                )}`}
              />
            </figure>
            <figure className='relative flex-1 h-[100px] overflow-hidden rounded-2xl'>
              <Image
                src={ENVIRONMENT.API_URL + images[1]}
                alt='Gallery background'
                width={300}
                height={300}
                className='object-cover size-full'
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(300, 300)
                )}`}
              />
              <div
                className='absolute inset-0 flex items-center justify-center cursor-pointer
                hover:backdrop-sepia-50 transition-all duration-300 ease-out'
                style={{
                  background: `linear-gradient(0deg, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 0%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%)`,
                }}
                onClick={() => setIsGalleryOpen(true)}
              >
                <TextButton
                  text={`+ ${images.length} images`}
                  type='button'
                  state='default'
                  customClassName='btn-secondary-variant flex-col laptop:flex-row'
                  textClassName='text-secondary heading-secondary!'
                  showLeftIcon={true}
                  iconClassName='size-[16px]! text-icon-secondary-button group-hover:scale-110 transition-all duration-300 ease-out'
                  leftIcon={ArrowsOut}
                  iconSize={16}
                />
              </div>
            </figure>
          </AnimationReveal>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.8}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='w-full tablet:w-max'
          >
            <TextButton
              text={"View all images"}
              state={"default"}
              customClassName='btn-primary-dark-fill-variant w-max flex py-3! px-6! rounded-4xl 
            w-full tablet:w-max justify-center'
              textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              onClick={() => setIsGalleryOpen(true)}
            />
          </AnimationReveal>
        </div>
      </div>
    </section>
  );
};
