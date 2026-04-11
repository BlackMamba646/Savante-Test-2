import Image from "next/image";
import { TextButton } from "../button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { IconButton } from "../button/IconButton";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { ProjectModel } from "@/interfaces";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { motion, AnimatePresence } from "motion/react";

interface FollowingProjectsDesktopProps {
  projects: ProjectModel[];
  currentProjectIndex: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const cardVariants = {
  initial: {
    x: 120,
    opacity: 0,
    scale: 1,
    rotateY: -15,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
      duration: 0.5,
    },
  },
  exit: {
    x: 150,
    opacity: 0,
    scale: 1,
    rotateY: 10,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

export const FollowingProjectsDesktop = ({
  projects,
  currentProjectIndex,
  onPrevClick,
  onNextClick,
}: FollowingProjectsDesktopProps) => {
  const totalProjects = projects?.length || 0;

  const nextProjectIndex =
    currentProjectIndex === totalProjects - 1 ? 0 : currentProjectIndex + 1;

  const nextProject = projects?.[nextProjectIndex];
  const nextProjectTitle = nextProject?.attributes?.Title || "Next Project";
  const nextProjectImage =
    nextProject?.attributes?.Main_image?.data?.attributes?.url;

  const progressPercentage = ((currentProjectIndex + 1) / totalProjects) * 100;

  return (
    <div className='relative hidden laptop:flex flex-col gap-5 pr-0 pt-20 pb-16 pl-10'>
      <div
        className='absolute inset-0 z-5'
        style={{
          background:
            "linear-gradient(180deg, var(--Color-stops-Gray-0, rgba(0, 0, 0, 0.00)) 0%, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 100%)",
        }}
      ></div>

      {/* Contenedor con perspectiva */}
      <div
        className='relative min-w-[420px] max-w-[440px] h-[240px] z-50'
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode='wait'>
          <motion.article
            key={`project-card-${nextProjectIndex}`}
            variants={cardVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute inset-0 flex flex-row gap-0 p-0 
              laptop:rounded-tl-3xl laptop:rounded-bl-3xl overflow-hidden transform-3d'
          >
            <div className='w-[220px] flex flex-col gap-5 py-[34px] px-[20px] bg-surface-container-background'>
              <div className='flex-1 flex flex-col gap-2 pb-4'>
                <motion.span
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className='text-terciary-foreground text-[10px] leading-[180%] font-medium uppercase 
                    tracking-[0.96px] line-clamp-1'
                >
                  {nextProjectIndex + 1}/{totalProjects}
                </motion.span>
                <motion.p
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className='text-accent-foreground leading-[140%] font-semibold text-[16px] tracking-[-0.32px] line-clamp-2'
                >
                  {nextProjectTitle}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <TextButton
                  text={"Next in view"}
                  textClassName='leading-[95%] heading-secondary! text-secondary'
                  state={"default"}
                  customClassName='btn-secondary-variant w-max gap-2'
                  iconClassName='text-accent-solid! rotate-45'
                  showRightIcon={true}
                  rightIcon={ArrowUpRight}
                  onClick={onNextClick}
                />
              </motion.div>
            </div>
            <figure className='w-[200px] h-[240px] overflow-hidden'>
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className='size-full'
              >
                <Image
                  src={
                    nextProjectImage
                      ? ENVIRONMENT.API_URL + nextProjectImage
                      : "/images/fallback-image.webp"
                  }
                  alt={nextProjectTitle}
                  width={800}
                  height={840}
                  loading='eager'
                  className='object-cover size-full'
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(800, 840)
                  )}`}
                />
              </motion.div>
            </figure>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className='relative flex flex-row gap-4 pr-[34px] z-50 items-center'>
        <div className='flex-1 w-full max-w-[320px] h-1 bg-primary-stroke overflow-hidden rounded-full'>
          <motion.div
            className='h-full bg-accent-solid rounded-full'
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.5,
            }}
          />
        </div>
        <IconButton
          icon={CaretArrow}
          big={false}
          state='default'
          iconSize={8}
          iconClassName='text-primary-foreground rotate-[90deg]'
          customClassName='btn-indicator-icon-variant p-2 light'
          onClick={onPrevClick}
        />
        <span
          className='text-terciary-foreground text-[12px] leading-[180%] font-medium uppercase 
            tracking-[0.96px] line-clamp-1'
        >
          {currentProjectIndex + 1}/{totalProjects}
        </span>
        <IconButton
          icon={CaretArrow}
          big={false}
          state='default'
          iconSize={8}
          iconClassName='text-primary-foreground rotate-[-90deg]'
          customClassName='btn-indicator-icon-variant p-2 light'
          onClick={onNextClick}
        />
      </div>
    </div>
  );
};
