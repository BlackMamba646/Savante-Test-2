"use client";
import { ENVIRONMENT } from "@/config/env.config";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import { ProjectModel } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkButton } from "../button/LinkButton";
import { ROUTING } from "@/config/constant.config";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { FollowingProjectsDesktop } from "./FollowingProjectsDesktop";
import { AnimatePresence } from "motion/react";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { InfoList } from "./InfoList";
import { FollowingProjectsMobile } from "./FollowingProjectsMobile";
import { useDeviceType } from "@/hooks/use-device";

interface ProjectsSliderProps {
  projects: ProjectModel[];
  selectedIndex?: number;
  onIndexChange?: (index: number) => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

export const ProjectsSlider = ({ 
  projects, 
  selectedIndex: externalSelectedIndex,
  onIndexChange,
  onPrevClick: externalOnPrevClick,
  onNextClick: externalOnNextClick,
}: ProjectsSliderProps) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number>(0);
  const { isLaptop, isDesktop } = useDeviceType();

  const isLargeScreen = isLaptop || isDesktop;

  const selectedIndex = externalSelectedIndex ?? internalSelectedIndex;

  const { emblaRef, emblaApi } = useEmblaCarouselHook({
    loop: true,
    duration: 30,
  });

  const handleProjectChange = (index: number) => {
    if (onIndexChange) {
      onIndexChange(index);
    } else {
      setInternalSelectedIndex(index);
    }
    emblaApi?.scrollTo(index);
  };

  const handlePrevClick = () => {
    if (externalOnPrevClick) {
      externalOnPrevClick();
    } else {
      const newIndex =
        selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1;
      handleProjectChange(newIndex);
    }
  };

  const handleNextClick = () => {
    if (externalOnNextClick) {
      externalOnNextClick();
    } else {
      const newIndex =
        selectedIndex === projects.length - 1 ? 0 : selectedIndex + 1;
      handleProjectChange(newIndex);
    }
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [selectedIndex, emblaApi]);

  const selectedProject = projects?.[selectedIndex];

  const { Logo, Name: developerName } =
    selectedProject?.attributes.developer_ID?.data?.attributes || {};
  const { Area_name } =
    selectedProject?.attributes.area_ID?.data?.attributes || {};

  return (
    <div
      className='max-w-[2000px] mx-auto relative dark overflow-hidden flex flex-col laptop:flex-row 
      spacing-padding-x spacing-gap py-5 tablet:py-10 laptop:pl-16 laptop:py-0 laptop:pr-0 laptop:gap-10 w-full
      rounded-2xl tablet:rounded-none'
    >
      <div className='absolute inset-0 laptop:h-full' style={{ zIndex: 0 }}>
        <div ref={emblaRef} className='h-full w-full'>
          <div className='flex h-full'>
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project.id}
                  className='flex-[0_0_100%] min-w-0 relative h-full'
                >
                  <Image
                    src={
                      ENVIRONMENT.API_URL +
                        project.attributes?.Main_image?.data?.attributes?.url ||
                      "/images/off-plan/example.jpg"
                    }
                    alt={project.attributes?.Title ?? "Project Background"}
                    fill
                    loading={"eager"}
                    priority={index === 0}
                    className='object-cover'
                  />
                </div>
              ))
            ) : (
              <div className='flex-[0_0_100%] min-w-0 relative h-full'>
                <Image
                  src='/images/fallback-image.webp'
                  alt='Projects Background'
                  fill
                  priority
                  className='object-cover'
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gradientes para laptop */}
      <div
        className='hidden tablet:block absolute top-0 left-0 w-full h-full z-5'
        style={{
          background: `linear-gradient(90deg, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 0%, var(--color-stops-gray-40, rgba(0, 0, 0, 0.40)) 100%)`,
        }}
      ></div>

      {/* Gradientes para mobile/tablet */}
      <div
        className='block tablet:hidden absolute top-0 left-0 w-full h-full z-5'
        style={{
          background: `linear-gradient(90deg, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 0%, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 100%)`,
        }}
      ></div>

      <AnimatePresence mode='wait' key={selectedIndex}>
        <article className='relative flex flex-col pb-0 tablet:pb-5 spacing-gap z-10 w-full self-center'>
          <div className='w-full flex flex-row py-2 justify-end tablet:justify-between'>
            <AnimationReveal
              x={0}
              y={5}
              delay={1.2}
              duration={0.3}
              opacity={1}
              type='div'
              className='hidden tablet:flex flex-row gap-1 items-center'
            >
              <span className='text-terciary-foreground text-[12px] leading-[200%'>
                Handover
              </span>
              <p
                className='text-primary-foreground text-[12px] leading-[180%] 
              font-medium uppercase tracking-[0.96px]'
              >
                November 2030
              </p>
            </AnimationReveal>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.3}
              duration={0.3}
              opacity={1}
              type='figure'
              className='h-[27px] w-[106px] overflow-hidden flex'
            >
              <Image
                src={
                  ENVIRONMENT.API_URL + Logo?.data?.attributes?.url ||
                  "/images/logo-fallback.webp"
                }
                alt={(developerName || "") + " Developer Logo"}
                width={112}
                height={27}
                className='object-contain w-full h-full object-right'
              />
            </AnimationReveal>
          </div>

          <div className='flex flex-col gap-2.5 pt-0 tablet:pt-5'>
            <AnimationReveal
              x={0}
              y={5}
              delay={0.4}
              duration={0.3}
              opacity={1}
              type='div'
              className='flex tablet:hidden flex-row gap-2 items-center w-max'
            >
              <span className='text-terciary-foreground text-[12px] leading-[200%]'>
                By
              </span>
              <p className='text-accent-foreground text-[12px] leading-[100%] font-medium|'>
                {developerName || "N/A"}
              </p>
            </AnimationReveal>
            <div className='flex flex-col gap-0'>
              <AnimationReveal
                x={-10}
                y={0}
                delay={0.2}
                duration={0.3}
                opacity={1}
                type='h3'
                className='text-primary-foreground tracking-[-0.8px] font-semibold font-plus 
                line-clamp-2 tablet:line-clamp-1'
              >
                {selectedProject?.attributes?.Title || "Project Title"}
              </AnimationReveal>
              <AnimationReveal
                x={-10}
                y={0}
                delay={0.4}
                duration={0.3}
                opacity={1}
                type='h3'
                className='text-primary-foreground tracking-[-0.8px] italic hidden tablet:inline-block'
              >
                At {Area_name || "Area Name"}
              </AnimationReveal>
            </div>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.7}
              duration={0.3}
              opacity={1}
              type='p'
              className='text-primary-foreground text-[10px] uppercase tracking-[0.6px] 
            leading-[180%] font-plus line-clamp-1'
            >
              {selectedProject?.attributes?.Big_title || "Subtitle 1"}
            </AnimationReveal>
          </div>

          <div className='flex flex-col-reverse tablet:flex-row gap-5 items-center justify-between'>
            <InfoList
              startingPrice={selectedProject?.attributes?.Starting_price?.toString() || "N/A"}
              projectType={selectedProject?.attributes?.Project_type || []}
              developerName={developerName || "N/A"}
            />
            <AnimationReveal
              x={0}
              y={5}
              delay={0.2}
              duration={0.3}
              opacity={1}
              type='div'
              className='w-full tablet:w-max'
            >
              <LinkButton
                text='Explore Property'
                href={`${ROUTING.OFF_PLAN}/${selectedProject?.attributes?.slug}`}
                customClassName='btn-primary-dark-fill-variant w-full tablet:w-max rounded-full 
            overflow-hidden justify-center py-3 px-6'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap'
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                iconClassName='text-icon-primary-button'
                animateIcon={false}
                iconRotation={45}
              />
            </AnimationReveal>
          </div>
        </article>
      </AnimatePresence>

      {isLargeScreen && (
        <FollowingProjectsDesktop
          projects={projects}
          currentProjectIndex={selectedIndex}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      )}

      {!isLargeScreen && (
        <FollowingProjectsMobile
          projects={projects}
          currentProjectIndex={selectedIndex}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      )}
    </div>
  );
};
