import { Note } from "@/components/common/text/Note";
import { LinkButton } from "@/components/common/button/LinkButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ROUTING } from "@/config/constant.config";
import { AnimationReveal } from "@/components/ui/animation-reveal";

export const AboutZayyanAmani = () => {
  return (
    <section className='relative bg-surface-container-background dark'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-20
        spacing-gap gap-4 laptop:gap-20 flex flex-col laptop:flex-row items-start laptop:items-center'
      >
        <AnimationReveal
          x={-5}
          y={0}
          delay={0.2}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='div'
          className='max-w-[760px] flex-1'
        >
          <Note
            textCaption='Savante Realty is led by Zayyan Amani'
            hightlightText='to make investing and relocating to the UAE a structured, transparent, and stress-free experience.'
            bodyText='A real estate professional driven by a clear vision'
          />
        </AnimationReveal>
        <div className='flex flex-col max-w-full laptop:max-w-[450px] gap-4'>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.5}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='p'
            className='text-terciary-foreground text-[15px] leading-[180%] tracking-normal'
          >
            Under his leadership, Savante Realty has grown into a trusted
            advisory known for combining market expertise with full-service
            support, helping clients move forward with clarity and confidence.
          </AnimationReveal>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.7}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className="w-full laptop:w-max mt-4"
          >
            <LinkButton
              href={ROUTING.ABOUT_ZAYYAN_AMANI}
              text='Meet Zayyan'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              customClassName='btn-primary-dark-fill-variant py-3 px-6 gap-[6px] rounded-full 
              w-full justify-center'
              textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
              iconClassName='text-icon-primary-button'
            />
          </AnimationReveal>
        </div>
      </div>
    </section>
  );
};
