"use client";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { ENVIRONMENT } from "@/config/env.config";
import Link from "next/link";
import { ROUTING } from "@/config/constant.config";
import { formatFeatures, formatProjectType } from "@/utils/utils";
import Image from "next/image";
import { TextButton } from "@/components/common/button/TextButton";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { useState } from "react";
import { ProjectForm } from "@/components/common/form/ProjectForm";
import { FeatureInfoList } from "../FeatureInfoList";

interface HeroOffPlanDetailProps {
  title?: string;
  big_title?: string;
  hero_paragraph?: string;
  starting_price?: number;
  project_type?: string[];
  handover?: string;
  area_name?: string;
  area_slug?: string;
  image?: string;
  projectId?: string;
  subtitle?: string;
  developerName?: string;
}

export function HeroOffPlanDetail(props: HeroOffPlanDetailProps) {
  const {
    title,
    big_title,
    hero_paragraph,
    starting_price,
    project_type,
    handover,
    area_name,
    area_slug,
    image,
    projectId,
    subtitle,
    developerName,
  } = props;

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className='relative overflow-hidden dark'>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      {/* Imagen de fondo */}
      <Image
        src={ENVIRONMENT.API_URL + (image || "")}
        alt={title || "Project Hero"}
        fill
        priority
        className='object-cover'
      />

      {/* Gradientes overlay */}
      <div
        className='hidden tablet:block absolute inset-0 z-[1]'
        style={{
          background: `linear-gradient(270deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-80, #000) 100%)`,
        }}
      />

      <div
        className='block tablet:hidden absolute inset-0 z-[1]'
        style={{
          background: `linear-gradient(0deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-100, #000) 100%)`,
        }}
      />

      <div className='relative z-10 max-w-[1440px] pt-[80px] pb-[40px] laptop:pt-[80px] laptop:pb-[40px] spacing-padding-x mx-auto flex flex-col h-full'>
        <div className='flex flex-col gap-0'>
          <div className='flex flex-row pt-[12px] pb-[12px] tablet:pt-[24px] px-0 laptop:px-[20px] gap-[64px]'>
            <Link
              href={ROUTING.OFF_PLAN}
              aria-label='Home'
              className='hidden tablet:flex flex-row gap-1 items-center group'
            >
              <figure
                className='relative text-terciary-foreground group-hover:translate-x-[-1px] 
              transition-transform duration-300 ease-in-out group-hover:text-accent-solid'
              >
                <CaretArrow direction='left' size={6} />
              </figure>
              <p className='group-hover:underline text-accent-solid text-[12px] leading-[180%] whitespace-nowrap'>
                Go to search
              </p>
            </Link>
            <div className='flex flex-row gap-1 flex-wrap mobile:flex-nowrap tablet:gap-1.5 items-center'>
              <Link
                href={ROUTING.HOME}
                aria-label='Home'
                className='hover:underline text-accent-solid text-[12px] leading-[180%] whitespace-nowrap'
              >
                Home
              </Link>
              <figure className='text-terciary-foreground'>
                <CaretArrow direction='right' size={7} />
              </figure>
              <Link
                href={`${ROUTING.PROPERTIES_BY_AREAS}/${area_slug}`}
                aria-label={area_name}
                className='hover:underline text-accent-solid text-[12px] leading-[180%] whitespace-nowrap'
              >
                {area_name}
              </Link>
              <figure className='text-terciary-foreground'>
                <CaretArrow direction='right' size={7} />
              </figure>
              <p className='text-accent-solid text-[12px] leading-[180%] line-clamp-1'>
                {title}
              </p>
            </div>
          </div>
          <div className='flex flex-col laptop:flex-row w-full gap-10 tablet:gap-5 laptop:spacing-gap'>
            {/* Project Hero Info */}
            <div
              className='flex-1 flex flex-col px-0 laptop:spacing-padding-x py-0 gap-10 tablet:gap-[16px] pt-10 laptop:pt-0
            self-start laptop:self-center'
            >
              <div className='flex flex-col gap-2.5 laptop:gap-1'>
                <p
                  className='inline-block laptop:hidden text-terciary-foreground leading-[180%] font-medium text-[10px] 
                uppercase tracking-[0.6px] line-clamp-3
                animate-fade-in delay-100 duration-300'
                >
                  {title ?? ""}
                </p>
                <div className='hidden laptop:flex flex-row gap-2 items-center
                animate-fade-in delay-100 duration-300'>
                  <p className='text-terciary-foreground leading-[200%] text-[12px] font-normal'>
                    Handover
                  </p>
                  <span className='text-accent-foreground leading-[100%] text-[12px] font-medium'>
                    {handover}
                  </span>
                </div>
                <h2 className='text-primary-foreground tracking-[-1.38px] text-left font-crimson line-clamp-4
                animate-fade-in-left animate-distance-xs delay-300 duration-300'>
                  {big_title ?? ""}
                </h2>
              </div>
              <p
                className='hidden laptop:inline-block text-terciary-foreground leading-[180%] font-medium text-[10px] 
                uppercase tracking-[0.6px] line-clamp-3
                animate-fade-in delay-500 duration-300'
              >
                {title ?? ""}
              </p>
              <FeatureInfoList
                startingPrice={starting_price?.toString() || "N/A"}
                projectType={project_type || []}
                developerName={developerName || "N/A"}
                handover={handover || "N/A"}
                className='pt-0 tablet:pt-2.5 pb-0 tablet:pb-2.5 laptop:pt-[34px] laptop:pb-0'
              />
            </div>
            {/* Area form */}
            <ProjectForm
              formKey='project-form'
              projectId={projectId}
              description={hero_paragraph}
              message={`Project Information Request for ${title}`}
            />
            <TextButton
              text='Claim a Free Consultation'
              customClassName='btn-primary-dark-fill-variant w-full rounded-full 
            overflow-hidden justify-center py-3 px-6 flex tablet:hidden'
              textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap'
              onClick={() => setIsContactModalOpen(true)}
            />
            <p className='text-terciary-foreground text-[14px] leading-[180%] line-clamp-3 block tablet:hidden
            animate-fade-in delay-1100 duration-300'>
              {hero_paragraph}
            </p>
            <div className='flex tablet:hidden flex-row w-full justify-between
            animate-fade-in-up animate-distance-xs delay-1200 duration-300'>
              <span className='text-terciary-foreground text-[12px] leading-[200%]'>
                Starting price
              </span>
              <p className='text-accent-foreground text-[18px] leading-[160%] font-medium'>
                {formatFeatures.formatCurrency(Number(starting_price)) +
                  " " +
                  ENVIRONMENT.CURRENCY}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
