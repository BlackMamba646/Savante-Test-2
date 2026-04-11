"use client";
import { OffPlanCard } from "@/components/common/card/OffPlanCard";
import { DropdownMinimal } from "@/components/common/input/DropdownMinimal";
import { Pagination } from "@/components/common/navigation/Pagination";
import { SORT_PROPERTY_OPTIONS } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { ProjectModel } from "@/interfaces";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { formatKebabCase } from "@/utils/utils";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";

interface ProjectListingProps {
  projects?: ProjectModel[];
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
    <section
      className='pt-5 pb-5 tablet:pt-5 tablet:pb-5 spacing-padding-x gap-[26px] max-w-[1440px] 
      mx-auto flex flex-col'
    >
      <div className='flex flex-row items-center w-full gap-[26px]'>
        <p className='flex-1 text-secondary-foreground line-clamp-1 text-[14px] mobile: text-base font-montserrat'>
          New <span className='inline pr-1'>{pagination?.total}</span>
          Off Plan Projects in{" "}
          <span className='inline-block font-semibold'>
            {formatKebabCase(searchParams.get("area") || "") || "Dubai"}
          </span>
        </p>
        <div className='flex flex-row gap-2 items-center'>
          <p className='hidden mobile:inline-block flex-1 text-[14px] text-terciary-foreground'>
            Sort By:
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
            border-[1px] border-secondary-stroke/80 rounded-lg text-[14px] *:text-terciary-foreground transition-colors duration-200'
            width='w-full'
            position='right'
          />
        </div>
      </div>
      <div
        key={`project-listing-${searchParams.toString()}`}
        className='w-full flex flex-col gap-5 animate-fade-in-up delay-100 animate-distance-sm duration-500'
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
            images={project.attributes.Images.data.map(
              (image) => ENVIRONMENT.API_URL + (image.attributes.formats?.medium?.url || image.attributes.url)
            )}
            startingPrice={project.attributes.Starting_price}
          />
        ))}
      </div>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
