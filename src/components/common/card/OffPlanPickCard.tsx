import { Info } from "../text/Info";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { IconButton } from "../button/IconButton";
import Image from "next/image";
import { Arrow } from "@/components/shared/icons/arrow";
import { ProjectModel } from "@/interfaces/project-response.interface";
import { formatFeatures, formatProjectType } from "@/utils/utils";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import { ENVIRONMENT } from "@/config/env.config";
import { useEffect, useMemo, useState, useRef } from "react";
import Fade from "embla-carousel-fade";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { ROUTING } from "@/config/constant.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { LinkButton } from "../button/LinkButton";

interface OffPlanPickCardProps {
  project?: ProjectModel;
}

export const OffPlanPickCard = ({ project }: OffPlanPickCardProps) => {
  const images = project?.attributes.Images?.data || [];
  const mainImageData = project?.attributes.Main_image?.data?.attributes;

  // Incluir Main_image con sus formats si existen
  const allImages = [
    ...(mainImageData ? [{ 
      attributes: { 
        url: mainImageData.url, 
        formats: (mainImageData as any).formats 
      } 
    }] : []),
    ...images,
  ];

  const projectData = useMemo(
    () => ({
      title: project?.attributes?.Title ?? "Evergr1n House",
      bigTitle:
        project?.attributes?.Big_title ?? "A Sanctuary of Modern Elegance",
      handover: project?.attributes.Handover,
      startingPrice: project?.attributes?.Starting_price || "",
      projectType: formatProjectType(project?.attributes.Project_type),
      logo: project?.attributes.developer_ID?.data?.attributes?.Logo?.data?.attributes.url
        ? ENVIRONMENT.API_URL + project.attributes.developer_ID.data.attributes.Logo.data.attributes.url
        : "/images/logo-fallback.webp",
    }),
    [project]
  );

  const {
    emblaRef,
    emblaApi,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    currentSlide,
    totalSlides,
  } = useEmblaCarouselHook(
    {
      loop: true,
      duration: 20,
      watchDrag: false,
    },
    [Fade()]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [project?.id, emblaApi]);

  return (
    <article className="flex flex-col-reverse laptop:flex-row gap-5 tablet:gap-0 py-5 tablet:py-0">
      <div className="flex flex-col bg-transparent laptop:bg-on-surface-background hero-project-container">
        <AnimatePresence mode="wait" key={project?.id}>
          <div
            className="flex flex-col px-0 py-[0px] tablet:py-[34px] tablet:px-0 laptop:px-[40px] laptop:py-[40px]
              gap-[24px] laptop:gap-4 items-center laptop:items-start w-full laptop:w-[656px] dark"
          >
            <div className="flex flex-row gap-10 max-w-full laptop:max-w-[600px] items-center self-start tablet:self-end">
              <Info
                label="Starting price"
                value={
                  formatFeatures.formatCurrency(
                    Number(projectData.startingPrice)
                  ) +
                  " " +
                  ENVIRONMENT.CURRENCY
                }
                type="number"
              />
              <Info
                label="Project Type"
                value={projectData.projectType}
                type="text"
              />
            </div>
            <div className="hidden tablet:flex flex-col gap-0 text-primary-foreground w-full max-w-full laptop:max-w-[580px]">
              <AnimationReveal
                x={-10}
                y={0}
                delay={0.2}
                duration={0.3}
                opacity={1}
                whileInView={true}
                type="div"
                className="flex flex-row py-2 px-0 gap-1 items-start laptop:items-center"
              >
                <p className="text-terciary-foreground leading-[180%] text-[12px] font-montserrat">
                  Project completion{" "}
                </p>
                <span className="text-accent-foreground leading-[180%] tracking-[0.74px] text-[12px] uppercase font-montserrat">
                  {projectData.handover}
                </span>
              </AnimationReveal>
              <AnimationReveal
                x={-10}
                y={0}
                delay={0.4}
                duration={0.3}
                opacity={1}
                whileInView={true}
                type="h3"
                data-size="title"
                className="uppercase font-medium tracking-[-1.92px] leading-[120%] text-left laptop:text-left line-clamp-1"
              >
                {projectData.title}
              </AnimationReveal>
              <AnimationReveal
                x={0}
                y={0}
                delay={0.7}
                duration={0.3}
                opacity={1}
                whileInView={true}
                type="p"
                className="text-primary-foreground text-[15px] leading-[180%] font-[400] line-clamp-1 py-1 font-montserrat"
              >
                {projectData.bigTitle}
              </AnimationReveal>
            </div>
            <LinkButton
              href={`${ROUTING.OFF_PLAN}/${project?.attributes.slug}`}
              aria-label="Discover project"
              text="Discover"
              state="default"
              customClassName="btn-primary-outline-variant justify-center py-[16px] px-[24px] 
          laptop:py-[24px] laptop:px-[34px] w-full laptop:w-max flex laptop:hidden"
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              animateIcon={true}
              iconAnimation={"rotate"}
            />
          </div>
        </AnimatePresence>
        <Link
          href={`${ROUTING.OFF_PLAN}/${project?.attributes.slug}`}
          className="hidden laptop:flex flex-row gap-0 bg-accent-foreground cursor-pointer group"
        >
          <div className="flex-1 pt-[16px] pb-[12px] px-[40px] ml-[3px] flex flex-col gap-4 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-black z-10
                  -translate-x-full group-hover:translate-x-0
                  transition-transform duration-400 ease-in-out"
            />
            <p
              className="big-lowercase font-medium uppercase text-text-primary-button translate-x-[-3px]
        group-hover:text-primary-foreground transition-colors duration-400 ease-out relative z-20"
            >
              Discover
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 bg-black h-full z-99"></div>
          <IconButton
            big={true}
            icon={ArrowUpRight}
            iconSize={10}
            customClassName="btn-icon-variant outline-none laptop:group-hover:bg-transparent 
            group-hover:outline-none duration-400"
            animateIcon={true}
            iconAnimation={"rotate"}
            iconRotation={45}
          />
        </Link>
      </div>
      <figure
        className="flex-1 overflow-hidden relative min-h-[220px] tablet:min-h-[300px] 
        laptop:min-h-full w-full flex"
      >
        <div
          key={`carousel-${project?.id}`}
          ref={emblaRef}
          className="w-full h-full overflow-hidden relative
          animate-fadeIn-hidden delay-0 duration-0"
        >
          <div className="flex h-[220px] tablet:h-[300px] laptop:min-h-full">
            {allImages.length > 0 ? (
              allImages.map((image, index) => {
                const imageUrl = image.attributes.formats?.medium?.url || image.attributes.url || "";
                
                return (
                  <div
                    key={`${project?.id}-${index}`}
                    className="flex-[0_0_100%] min-w-0 relative h-full"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={ENVIRONMENT.API_URL + imageUrl}
                        alt={`${projectData.title} - Image ${index + 1}`}
                        width={1100}
                        height={550}
                        className="object-cover laptop:object-cover w-full h-full"
                        loading={index === 0 ? "eager" : "lazy"}
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(1014, 580)
                        )}`}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex-[0_0_100%] min-w-0 relative h-full">
                <Image
                  src="/images/off-plan/example.jpg"
                  alt="Latest Projects"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 z-10 inner-border-all-container pointer-events-none
        "
        ></div>

        <AnimatePresence mode="wait" key={project?.id}>
          <div className="absolute flex flex-row justify-between bottom-0 left-0 w-full z-20 light">
            <AnimationReveal
              x={0}
              y={0}
              delay={0.3}
              duration={0.3}
              opacity={1}
              whileInView={true}
              type="div"
              className="px-5 py-3 tablet:px-10 tablet:py-5"
            >
              <Image
                src={projectData.logo}
                alt="Developer Logo"
                width={86}
                height={36}
                className="h-[28px] tablet:h-[36px] object-contain laptop:object-contain w-[88px]"
              />
            </AnimationReveal>
            <AnimationReveal
              x={0}
              y={5}
              delay={0.3}
              duration={0.3}
              opacity={1}
              whileInView={true}
              type="div"
              className="flex flex-row items-center justify-center py-1 px-2 tablet:px-3 tablet:py-3 h-max
                gap-3 w-max bg-surface-background self-end"
            >
              <button
                onClick={() => {
                  scrollPrev();
                }}
                disabled={!canScrollPrev}
                aria-label="Previous image"
                className="relative text-primary-foreground cursor-pointer p-2.5 disabled:opacity-50 disabled:cursor-not-allowed
                hover:text-accent-foreground transition-colors duration-200"
              >
                <Arrow direction="left" size={18} />
              </button>
              <p className="big-lowercase font-medium leading-[160%] text-accent-foreground">
                {currentSlide}/{totalSlides}
              </p>
              <button
                onClick={() => {
                  scrollNext();
                }}
                disabled={!canScrollNext}
                aria-label="Next image"
                className="relative text-primary-foreground cursor-pointer p-2.5 disabled:opacity-50 disabled:cursor-not-allowed
                hover:text-accent-foreground transition-colors duration-200"
              >
                <Arrow direction="right" size={18} />
              </button>
            </AnimationReveal>
          </div>
        </AnimatePresence>
      </figure>
      <div className="flex tablet:hidden flex-col gap-0 text-primary-foreground w-full max-w-full laptop:max-w-[580px]">
        <div className="flex flex-row py-2 px-0 gap-1 items-start laptop:items-center">
          <p className="text-terciary-foreground leading-[180%] text-[12px]">
            Project completion{" "}
          </p>
          <span className="text-accent-foreground leading-[180%] tracking-[0.96px] text-[12px]">
            {projectData.handover}
          </span>
        </div>
        <AnimationReveal
          x={-10}
          y={0}
          delay={0.5}
          duration={0.5}
          opacity={1}
          whileInView={true}
          type="h2"
          className="uppercase font-medium tracking-[-1.92px] leading-[120%] line-clamp-1 text-left laptop:text-left"
        >
          {projectData.title}
        </AnimationReveal>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.7}
          duration={0.5}
          opacity={1}
          whileInView={true}
          type="p"
          className="text-terciary-foreground text-[12px] leading-[180%] font-[400] line-clamp-1"
        >
          {projectData.bigTitle}
        </AnimationReveal>
      </div>
    </article>
  );
};
