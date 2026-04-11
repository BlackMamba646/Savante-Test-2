"use client";
import { ReactNode } from "react";

interface AdditionalInformationProps {
  content: ReactNode;
}

export const AdditionalInformation = ({
  content,
}: AdditionalInformationProps) => {
  return (
    <section
      className='max-w-[1440px] mx-auto flex flex-col-reverse laptop:flex-row spacing-padding-x spacing-padding-y 
      gap-16 tablet:gap-16 laptop:gap-16 overflow-hidden'
    >
      {content && (
        <div
          className='flex flex-col gap-4 text-primary-foreground leading-[180%]
          [&_h2]:text-primary-foreground [&_h2]:font-medium! [&_h2]:tracking-[-1.92px] [&_h2]:mt-2
          [&_h3]:font-medium! [&_h3]:tracking-[-1.92px] [&_h3]:mt-2
          [&_h4]:font-medium! [&_h4]:tracking-[-1.92px] [&_h4]:mt-2
          [&_p]:text-secondary [&_p]:text-[15px] [&_p]:leading-[180%] [&_p]:font-montserrat
          [&_a]:text-primary-foreground [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-4
          [&_ul]:font-montserrat [&_li]:text-[15px] [&_li]:leading-[180%] [&_ul]:font-normal [&_li]:text-secondary
          [&_table]:inner-border-all-container [&_table]:mb-2 [&_thead]:border-b-[1px] [&_thead]:border-primary-stroke
          [&_td]:px-2 [&_th]:py-1.5 [&_th]:bg-[#000000] [&_th]:text-[#F6F6F6] [&_tr]:border-b-[1px] [&_tr]:border-primary-stroke
          [&_td]:py-1.5 [&_th]:text-start [&_th]:px-2'
        >
          {content}
        </div>
      )}
    </section>
  );
};