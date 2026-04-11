"use client";
import { useState } from "react";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ProjectModel } from "@/interfaces/project-response.interface";
import { LinkButton } from "../button/LinkButton";
import { ROUTING } from "@/config/constant.config";
import { ProjectsSlider } from "../list/ProjectsSlider";
import { ActionSlider } from "../navigation/ActionSlider";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface LatestProjectsProps {
  title?: string;
  kicker?: string;
  cta?: string;
  projects?: ProjectModel[];
}

export const LatestProjects = ({
  title,
  kicker,
  cta,
  projects,
}: LatestProjectsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const totalProjects = projects?.length || 0;

  const handlePrevClick = () => {
    const newIndex =
      selectedIndex === 0 ? totalProjects - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex =
      selectedIndex === totalProjects - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };

  return (
    <section className='relative overflow-hidden px-1 tablet:px-0'>
      <div className='relative mx-auto pt-[24px] flex flex-col gap-0 z-50 w-full'>
        {/* Header */}
        <header
          className='max-w-[1440px] mx-auto w-full flex flex-col spacing-padding-x 
          py-5 bg-surface-background gap-1'
        >
          <span className='text-secondary text-[12px] leading-[180%] font-medium uppercase tracking-[0.96px]'>
            Future Living, Today
          </span>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.1}
            duration={0.3}
            opacity={1}
            type='h2'
            className='text-primary-foreground tracking-[-1.38px]'
          >
            {title || "Top New Projects Opportunities"}
          </AnimationReveal>
        </header>
        {/* Projects Slider */}
        <ProjectsSlider
          projects={projects || []}
          selectedIndex={selectedIndex}
          onIndexChange={setSelectedIndex}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
        {/* Footer */}
        <footer className='bg-surface-container-background dark hidden laptop:block'>
          <div className='max-w-[1440px] mx-auto w-full flex flex-row justify-between spacing-padding-x py-2.5'>
            <span className='text-accent-foreground big-uppercase leading-[180%] italic font-crimson'>
              Latest Launches
            </span>
            <AnimationReveal
              x={0}
              y={5}
              delay={1.4}
              duration={0.3}
              opacity={1}
              type='div'
              className='flex items-center'
            >
              <LinkButton
                href={ROUTING.OFF_PLAN}
                text={"Explore all properties"}
                textClassName='leading-[95%] heading-secondary! text-secondary'
                state={"default"}
                customClassName='btn-secondary-variant cursor-pointer gap-2'
                iconClassName='text-accent-solid'
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                animateIcon={true}
                iconAnimation={"rotate"}
              />
            </AnimationReveal>
          </div>
        </footer>
        <ActionSlider
          current={selectedIndex + 1}
          count={totalProjects}
          onPrev={handlePrevClick}
          onNext={handleNextClick}
          className='spacing-padding-x bg-surface-container-background py-3! flex laptop:hidden
          [&_a]:hidden tablet:[&_a]:flex dark action-slider-tablet'
          href={ROUTING.OFF_PLAN}
        />
      </div>
    </section>
  );
};
