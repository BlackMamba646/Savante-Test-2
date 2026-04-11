"use client";
import { PropertyCard } from "@/components/common/card/PropertyCard";
import { ENVIRONMENT } from "@/config/env.config";
import { useSearchParams } from "next/navigation";
import React from "react";
import { PropertyModel } from "@/interfaces/property-response.interface";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { useRouter } from "@bprogress/next/app";
import { SORT_OPTIONS } from "@/config/constant.config";
import { formatKebabCase } from "@/utils/utils";
import { DropdownMinimal } from "@/components/common/input/DropdownMinimal";
import { Pagination } from "@/components/common/navigation/Pagination";

interface PropertyListingProps {
  properties?: PropertyModel[];
  pagination?: PaginationType;
  areaName?: string;
}

export const PropertyListing = ({
  properties,
  pagination,
  areaName,
}: PropertyListingProps) => {
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

  const headingEnd = `${
    formatKebabCase(searchParams.get("property_type") || "") || "Apartment"
  }s for ${properties?.at(0)?.attributes.Operation || "Rent"} in ${
    formatKebabCase(areaName || "") ||
    formatKebabCase(searchParams.get("area") || "") ||
    "Dubai"
  }`;

  return (
    <section className='max-w-[1440px] mx-auto flex flex-col spacing-padding-x py-5 gap-5'>
      <div className='flex flex-row items-center w-full gap-[26px]'>
        <h1
          className='flex-1 text-secondary line-clamp-1 tracking-normal
        text-[15px] leading-[180%] font-plus'
        >
          <span className='inline-block mr-1'>{pagination?.total}</span>{" "}
          {headingEnd}
        </h1>
        <div className='flex flex-row gap-2.5 items-center'>
          <p className='hidden mobile:inline-block flex-1 text-[14px] text-terciary-foreground'>
            Sort By
          </p>
          <DropdownMinimal
            key={`sort-${searchParams.toString()}`}
            placeholder={
              SORT_OPTIONS.find(
                (option) => option.value === searchParams.get("sort")
              )?.text ?? "Featured"
            }
            items={SORT_OPTIONS}
            defaultSelectedKey={searchParams.get("sort") ?? ""}
            onSelectionChange={handleChangeSortBy}
            className='cursor-pointer bg-transparent max-h-[45px] justify-between flex flex-row items-center gap-2 hover:bg-surface-container-background
          outline-1 outline-secondary-stroke rounded-lg text-[14px] *:text-terciary-foreground transition-colors duration-200'
            width='w-full'
            position='right'
            popoverClassName='rounded-md shadow-none!'
          />
        </div>
      </div>
      <div
        key={`property-listing-${searchParams.toString()}`}
        className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 
        grid-row-[auto] gap-x-4 gap-y-6 tablet:gap-y-10 animate-fade-in-up delay-100 animate-distance-xs duration-300'
      >
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
        totalPages={totalPages}
        page={currentPage}
        onPageChange={handlePageChange}
        maxVisiblePages={5}
      />
    </section>
  );
};
