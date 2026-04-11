"use client";
import { PropertyCard } from "@/components/common/card/PropertyCard";
import { DropdownMinimal } from "@/components/common/input/DropdownMinimal";
import { Pagination } from "@/components/common/navigation/Pagination";
import { SORT_PROPERTY_OPTIONS } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { PropertyModel } from "@/interfaces/property-response.interface";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";
import React from "react";

interface AgentPropertiesListingProps {
  properties?: PropertyModel[];
  pagination?: PaginationType;
}

export const AgentPropertiesListing = ({
  properties,
  pagination,
}: AgentPropertiesListingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination?.pageCount || 1;

  const handleChangeSortBy = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", String(value));
    router.push(`${location.pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${location.pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className='max-w-[1440px] mx-auto flex flex-col py-5 spacing-padding-x gap-5'>
      <div className='flex flex-row items-center w-full gap-[26px]'>
        <p
          className='flex-1 text-secondary-foreground line-clamp-1 tracking-wide
          quote-text leading-[180%] font-plus font-semibold'
        >
          My Properties
        </p>
        <div className='flex flex-row gap-2.5 items-center'>
          <p className='hidden mobile:inline-block flex-1 text-[14px] text-terciary-foreground'>
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
            border-[1px] border-secondary-stroke/80 rounded-lg text-[14px] *:text-terciary-foreground transition-colors duration-200'
            width='w-full'
            position='right'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 grid-row-[auto] gap-x-5 gap-y-16'>
        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.attributes.Title}
            address={property.attributes.Address}
            baths={property.attributes.Bathrooms}
            beds={property.attributes.Bedrooms}
            images={property.attributes?.Images?.data?.map(
              (el) => ENVIRONMENT.API_URL + el.attributes?.url
            )}
            price={property.attributes.Price}
            squareFeet={property.attributes.Total_area}
            currency='AED'
            operation={property.attributes.Operation}
            slug={property.attributes.slug}
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
