import { Note } from "@/components/common/text/Note";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import React from "react";

export const AdvisoryPhilosophy = () => {
  return (
    <section className='relative overflow-hidden bg-surface-container-background dark'>
      <div
        className='max-w-[1440px] mx-auto flex flex-col laptop:flex-row spacing-padding-x laptop:px-[80px] 
        spacing-padding-y gap-[26px] laptop:gap-[64px]'
      >
        <AnimationReveal
          x={-5}
          y={0}
          delay={0.2}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='div'
          className='flex-1'
        >
          <Note
            textCaption='This journey shapes how he works'
            hightlightText='Practical, transparent, and deeply aware that property decisions are some of the most important financial choices people make.'
          />
        </AnimationReveal>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.4}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='p'
          className='text-terciary-foreground text-[15px] leading-[180%] font-normal 
          tracking-normal max-w-full laptop:max-w-[480px]'
        >
          In 2023, Zayyan relocated to Dubai, drawn by its regulatory clarity,
          investor-friendly environment, and long-term economic vision. Today,
          he focuses on advising investors, founders, and high-net-worth
          individuals, helping them navigate the Dubai property market with
          clarity, data, and conviction.
        </AnimationReveal>
      </div>
    </section>
  );
};
