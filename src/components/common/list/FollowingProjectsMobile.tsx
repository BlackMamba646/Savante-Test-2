import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import { ProjectModel } from "@/interfaces";
import { NextProjectCard } from "../card/NextProjectCard";
import { useEffect } from "react";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface FollowingProjectsMobileProps {
  projects: ProjectModel[];
  currentProjectIndex: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const FollowingProjectsMobile = ({
  projects,
  currentProjectIndex,
  onPrevClick,
  onNextClick,
}: FollowingProjectsMobileProps) => {
  const totalProjects = projects?.length || 0;

  const { emblaRef, emblaApi, scrollNext } = useEmblaCarouselHook({
    align: "start",
    loop: true,
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentProjectIndex);
    }
  }, [currentProjectIndex, emblaApi]);

  const handleNext = () => {
    scrollNext();
    onNextClick();
  };

  return (
    <div className='relative flex flex-col gap-4 laptop:hidden w-full z-50'>
      {/* Carousel horizontal de proyectos */}
      <div
        className='overflow-hidden max-w-[100vw] min-w-full w-[100vw] cursor-grab'
        ref={emblaRef}
      >
        <AnimationReveal
          x={0}
          y={5}
          delay={0.8}
          duration={0.5}
          opacity={1}
          whileInView={true}
          type='div'
          className='flex -ml-2'
        >
          {projects.map((project, index) => {
            const projectTitle = project?.attributes?.Title || "Project";
            const projectImage =
              project?.attributes?.Main_image?.data?.attributes?.url || "";
            return (
              <div
                key={project.id}
                className='shrink-0 w-[216px] tablet:w-[416px] pl-2'
              >
                <NextProjectCard
                  index={index}
                  totalProjects={totalProjects}
                  projectTitle={projectTitle}
                  projectImage={projectImage}
                  handleNext={handleNext}
                />
              </div>
            );
          })}
        </AnimationReveal>
      </div>
    </div>
  );
};
