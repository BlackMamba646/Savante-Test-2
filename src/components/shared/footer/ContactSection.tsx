import { ContactModel } from "@/interfaces";
import { cn } from "@/lib/utils";
import React from "react";
import { At } from "../icons/at";
import { Phone } from "../icons/phone";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "../icons/arrow-up-right";

interface ContactSectionProps {
  className?: string;
  contactInfo?: ContactModel;
  onClick?: () => void;
}

export const ContactSection = ({
  className,
  contactInfo,
  onClick,
}: ContactSectionProps) => {
  return (
    <article
      className={cn(
        "hidden tablet:block relative w-full bg-surface-container-background",
        className
      )}
    >
      <div
        className='relative flex flex-row justify-between items-center py-5 max-w-[1440px] 
        mx-auto px-10 gap-5 z-10'
      >
        <div className='flex flex-col gap-1 justify-center'>
          <div className='flex flex-row gap-1 items-center'>
            <figure className='relative text-terciary-foreground'>
              <At size={20} />
            </figure>
            <p className='text-secondary text-[16px] font-semibold leading-[180%] tracking-[-0.32px]'>
              {contactInfo?.Email}
            </p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <figure className='relative text-terciary-foreground'>
              <Phone size={20} />
            </figure>
            <p className='text-secondary text-[12.5px] font-medium uppercase leading-[180%] tracking-[0.96px]'>
              {contactInfo?.Phone}
            </p>
          </div>
        </div>
        <TextButton
          onClick={onClick}
          text='Connect with us'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          customClassName='btn-primary-fill-variant py-3 px-6 justify-center gap-[6px] rounded-full w-max'
          textClassName='uppercase text-[12px] font-medium tracking-[0.96px]'
          animateIcon={true}
          iconAnimation='rotate'
          iconRotation={45}
        />
      </div>
    </article>
  );
};
