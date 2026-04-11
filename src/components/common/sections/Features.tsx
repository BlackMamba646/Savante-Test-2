import { LogosList } from "@/components/common/list/LogosList";
import { BigStatsLeft } from "@/components/common/text/BigStatsLeft";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { cn } from "@/lib/utils";

interface FeaturesProps {
  className?: string;
}

export const Features = ({ className }: FeaturesProps) => {
  return (
    <div className={cn('relative bg-surface-container-background dark', className)}>
      <div
        className='relative max-w-[1440px] mx-auto py-[40px] spacing-padding-x 
        laptop:px-[112px] spacing-gap tablet:gap-5 flex flex-col tablet:flex-row'
      >
        <BigStatsLeft
          title='Years of experience'
          value='20+'
          className='hidden laptop:flex'
        />
        <article
          className='flex-1 flex flex-col gap-4 items-start laptop:items-center 
          shadow-none tablet:inner-border-right laptop:shadow-none'
        >
          <AnimationReveal
            x={0}
            y={5}
            delay={0.2}
            duration={0.3}
            opacity={1}
            type='p'
            className='text-secondary quote-text font-semibold tracking-[-0.4px] 
            max-w-[280px] text-start laptop:text-center'
          >
            Direct Access to Top UAE Developers
          </AnimationReveal>
          <LogosList type='big' />
        </article>
        <div className='flex-1 laptop:flex-none flex justify-center flex-row tablet:flex-col 
        gap-4 tablet:gap-0 flex-wrap tablet:flex-nowrap'>
          <BigStatsLeft
            title='Clients successfully guided'
            value='100+'
            largeLabel
            className='flex-1 tablet:flex-none flex-col items-start tablet:items-center tablet:flex-row [&_p]:whitespace-nowrap laptop:[&_p]:whitespace-normal!'
          />
          <BigStatsLeft
            title='Years of experience'
            value='20+'
            className='flex-1 tablet:flex-none flex-col items-start tablet:items-center tablet:flex-row laptop:hidden [&_p]:whitespace-nowrap laptop:[&_p]:whitespace-normal!'
          />
        </div>
      </div>
    </div>
  );
};
