"use client";
import { TextButton } from "@/components/common/button/TextButton";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import React from "react";

interface EverythingYouNeedProps {
  key?: number;
  isReverse?: boolean;
  index?: number;
  title?: string;
  content?: React.ReactNode;
  image?: string;
}

export const EverythingYouNeed = (props: EverythingYouNeedProps) => {
  const { title, content, image, index, isReverse } = props;

  const [showContactModal, setShowContactModal] = React.useState(false);

  return (
    <section className='bg-surface-background overflow-hidden'>
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
      <div
        className={`max-w-[1440px] spacing-padding-x spacing-padding-y
          mx-auto overflow-hidden grid grid-cols-1 grid-rows-[1fr_auto] 
          laptop:grid-cols-2 laptop:grid-rows-[auto] spacing-gap
          ${
            !isReverse
              ? "laptop:[&>*:first-child]:order-2 laptop:[&>*:last-child]:order-1"
              : ""
          }`}
      >
        <div className='order-2 laptop:order-1 flex flex-col gap-9 tablet:gap-10 laptop:gap-16 justify-start laptop:justify-between'>
          <div className='flex flex-col gap-[24px]'>
            <div className='flex flex-col gap-4 pt-3'>
              <div className='h-[1px] bg-accent-foreground w-[40px]'></div>
              <AnimationReveal
                x={-10}
                y={0}
                delay={0.1}
                duration={0.3}
                type='h3'
                opacity={1}
                className='text-primary tracking-[-1.2px] font-medium 
                line-clamp-2 text-primary-foreground leading-[140%]'
              >
                {title}
              </AnimationReveal>
            </div>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.3}
              duration={0.5}
              type='div'
              opacity={1}
              className='flex flex-col gap-6 text-[15px] font-normal text-terciary-foreground leading-[180%] 
               tracking-normal w-full text-wrap font-montserrat max-w-[900px]'
            >
              {content}
            </AnimationReveal>
          </div>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.7}
            duration={0.3}
            type='div'
            opacity={1}
          >
            <TextButton
              text='Contact us'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-max'
              textClassName='uppercase text-[12px] tracking-[0.96px] font-medium whitespace-nowrap'
              animateIcon={true}
              iconAnimation='rotate'
              iconRotation={45}
              onClick={() => setShowContactModal(true)}
            />
          </AnimationReveal>
        </div>
        <figure
          className='order-1 laptop:order-2 relative laptop:h-full h-[220px] 
        tablet:h-[340px] rounded-2xl overflow-hidden self-center max-h-full laptop:max-h-[600px]'
        >
          <Image
            src={image ?? ""}
            alt={title ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
