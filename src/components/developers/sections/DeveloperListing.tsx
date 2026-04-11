"use client";
import { DeveloperCard } from "@/components/common/card/DeveloperCard";
import { Pagination } from "@/components/common/navigation/Pagination";
import { ENVIRONMENT } from "@/config/env.config";
import { DeveloperModelWithNumberOfProjects } from "@/interfaces";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { useRouter } from "@bprogress/next";
import { useSearchParams } from "next/navigation";
import React from "react";

interface DeveloperListingProps {
  developers: DeveloperModelWithNumberOfProjects[];
  pagination: PaginationType;
}

export const DeveloperListing = ({
  developers,
  pagination,
}: DeveloperListingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination?.pageCount || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <section className='bg-surface-background'>
      <div className='max-w-[1440px] mx-auto flex flex-col overflow-hidden spacing-padding-x spacing-gap py-5'>
        <div
          className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 
              grid-row-[auto] gap-x-3 gap-y-5 tablet:gap-y-6 
              animate-fade-in-up delay-100 animate-distance-sm duration-500'
        >
          {developers.map((developer, index) => (
            <DeveloperCard
              key={`developer-${index}`}
              id={developer.id}
              name={developer.attributes.Name}
              logo={
                ENVIRONMENT.API_URL +
                developer.attributes.Logo.data.attributes.url
              }
              numberOfProjects={developer.numberOfProjects}
              slug={developer.attributes.slug}
            />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
