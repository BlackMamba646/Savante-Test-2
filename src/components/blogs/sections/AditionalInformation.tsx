"use client";
import { ReactNode, useEffect, useRef } from "react";

interface AdditionalInformationProps {
  content: ReactNode;
}

export const AdditionalInformation = ({
  content,
}: AdditionalInformationProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wrap all tables in a responsive wrapper
    if (contentRef.current) {
      const tables = contentRef.current.querySelectorAll('table');
      tables.forEach((table) => {
        // Check if table is already wrapped
        if (!table.parentElement?.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper table-responsive-wrapper';
          table.parentNode?.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });
    }
  }, [content]);

  return (
    <section
      className='max-w-[1440px] mx-auto flex flex-col-reverse laptop:flex-row spacing-padding-x spacing-padding-y 
      gap-16 tablet:gap-16 laptop:gap-16 overflow-hidden'
    >
      {content && (
        <div
          ref={contentRef}
          className='flex flex-col gap-4 text-primary-foreground leading-[180%]
          [&>h2]:text-primary-foreground [&>h2]:font-medium [&>h2]:tracking-[-1.92px] [&>h2]:mt-2
          [&>h3]:font-medium [&>h3]:tracking-[-1.92px] [&>h3]:mt-2
          [&>h4]:font-medium [&>h4]:tracking-[-1.92px] [&>h4]:mt-2
          [&>p]:text-secondary [&>p]:text-[15px] [&>p]:leading-[180%] [&>p]:font-montserrat
          [&>a]:text-primary-foreground [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-4
          [&>ul]:font-plus [&>li]:text-[15px] [&>li]:leading-[180%] [&>ul]:font-normal [&_li]:text-secondary
          [&>div.table-wrapper]:mb-4 [&>div.table-wrapper]:table-responsive-wrapper
          [&_table]:w-full [&_table]:min-w-[500px] [&_table]:rounded-3xl [&_table]:overflow-hidden 
          [&_table]:contain-layout
          [&_thead]:border-b-[1px] [&_thead]:border-secondary-stroke [&_table]:inner-border-all-secondary
          [&_td]:px-3 tablet:[&_td]:px-3 [&_th]:py-1.5 [&_th]:bg-[#1A1A1A] [&_th]:text-[#F6F6F6] 
          [&_tr]:border-b-[1px] [&_tr]:border-secondary-stroke [&_tr]:even:bg-surface-container-background
          [&_td]:py-1.5 [&_td]:text-[13px] tablet:[&_td]:text-[15px]
          [&_th]:text-start [&_th]:px-3 tablet:[&_th]:px-3 [&_th]:font-semibold [&_th]:text-[13px] tablet:[&_th]:text-[15px]
          [&_th]:whitespace-nowrap'
        >
          {content}
        </div>
      )}
    </section>
  );
};