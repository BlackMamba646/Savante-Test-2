"use client";
import { OffPlanCard } from "@/components/common/card/OffPlanCard";
import { DropdownMinimal } from "@/components/common/input/DropdownMinimal";
import { Pagination } from "@/components/common/navigation/Pagination";
import { SORT_PROPERTY_OPTIONS } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { ProjectModelWithDeveloperName } from "@/interfaces";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { formatKebabCase } from "@/utils/utils";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";
import React from "react";

interface ProjectListingProps {
  projects?: ProjectModelWithDeveloperName[];
  pagination?: PaginationType;
  developerName?: string;
}

export const ProjectListing = ({
  projects,
  pagination,
}: ProjectListingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination?.pageCount || 1;

  const handleChangeSortBy = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", String(value));
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <section className='max-w-[1440px] mx-auto flex flex-col spacing-padding-x py-5 gap-4 tablet:gap-5'>
      <div className='flex flex-row items-center w-full gap-[26px]'>
        <h1
          className='flex-1 text-secondary line-clamp-1 tracking-normal
        text-[15px] leading-[180%] font-plus'
        >
          New<span className='inline-block ml-1 mr-1'>{pagination?.total}</span>
          Off Plan Projects in{" "}
          <span className='inline-block font-semibold'>
            {formatKebabCase(searchParams.get("area") || "") || "Dubai"}
          </span>
        </h1>
        <div className='flex flex-row gap-2 items-center'>
          <p className='hidden tablet:inline-block flex-1 text-[14px] text-terciary-foreground'>
            Sort By
          </p>
          <DropdownMinimal
            key={`sort-${searchParams.toString()}`}
            placeholder={
              SORT_PROPERTY_OPTIONS.find(
                (option) => option.value === searchParams.get("sort")
              )?.text ?? "Featured"
            }
            items={SORT_PROPERTY_OPTIONS}
            defaultSelectedKey={searchParams.get("sort") ?? ""}
            onSelectionChange={handleChangeSortBy}
            className='cursor-pointer bg-transparent max-h-[45px] justify-between flex flex-row items-center gap-2 hover:bg-surface-container-background
            border-[1px] border-secondary-stroke rounded-lg text-[14px] *:text-terciary-foreground transition-colors duration-200'
            width='w-full'
            position='right'
          />
        </div>
      </div>
      <ul
        key={`project-listing-${searchParams.toString()}`}
        className='w-full flex flex-col gap-5 animate-fade-in-up delay-100 animate-distance-xs duration-300'
      >
        {projects?.map((project, index) => (
          <OffPlanCard
            key={`${project.id}`}
            id={project.id.toString()}
            title={project.attributes.Title}
            address={project.attributes.Address}
            handover={project.attributes.Handover ?? "N/A"}
            developer={project.attributes.Developer ?? "N/A"}
            projectType={project.attributes.Project_type ?? []}
            slug={project.attributes.slug}
            mainImage={
              ENVIRONMENT.API_URL +
              project.attributes.Main_image.data.attributes.url
            }
            status={project.attributes.Status}
            unitTypes={project.attributes.Unit_variants}
            startingPrice={Number(project.attributes.Starting_price)}
            images={project.attributes.Images.data.map(
              (image) => ENVIRONMENT.API_URL + image.attributes.url
            )}
            developerName={project.developerName || undefined}
          />
        ))}
      </ul>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
