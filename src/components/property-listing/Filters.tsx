"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { MagnifyingGlass } from "../shared/icons/magnifying-glass";
import { Bed } from "../shared/icons/bed";
import { Toilet } from "../shared/icons/toilet";
import { PriceDropdown } from "./PriceDropdown";
import { FadersHorizontal } from "../shared/icons/faders-horizontal";
import { CaretArrow } from "../shared/icons/caret-arrow";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next/app";
import {
  PROPERTY_TYPES,
  QUANTITY_OPTIONS,
  ROUTING,
} from "@/config/constant.config";
import { PropertyFiltersModal } from "../common/modal/PropertyFiltersModal";
import { FeatureQuantityDropdown } from "./FeatureQuantityDropdown";
import { MoreFilters } from "./MoreFilters";
import { DropdownMinimal } from "../common/input/DropdownMinimal";
import { AreaModel } from "@/interfaces";
import { Tabs } from "./Tabs";
import { cn } from "@/lib/utils";

interface FiltersProps {
  areas?: AreaModel[];
  className?: string;
}

export const Filters = ({ areas, className }: FiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const toggleFiltersModal = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const params = new URLSearchParams();
    params.set("q", searchQuery.trim());

    const queryString = params.toString();
    router.push(`${location.pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleChangeBaths = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === QUANTITY_OPTIONS.ANY) {
      params.delete("baths");
    } else {
      params.set("baths", String(value));
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeBeds = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === QUANTITY_OPTIONS.ANY) {
      params.delete("beds");
    } else {
      params.set("beds", String(value));
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeMinPrice = (value: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      params.set("price_min", String(value));
    } else {
      params.delete("price_min");
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeMaxPrice = (value: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      params.set("price_max", String(value));
    } else {
      params.delete("price_max");
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangePropertyType = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("property_type", String(value));

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "bg-surface-background max-w-[1440px] mx-auto sticky top-0 z-99 spacing-padding-x py-3",
        className
      )}
    >
      <PropertyFiltersModal
        isVisible={isFiltersModalOpen}
        onClose={toggleFiltersModal}
        areas={areas}
      />
      <form
        onSubmit={handleSearch}
        method='get'
        autoComplete='off'
        className='flex flex-row gap-y-5 gap-x-2 tablet:gap-y-5 tablet:gap-x-3 flex-wrap laptop:flex-nowrap'
      >
        <Tabs
          className='order-2 laptop:order-1 max-h-[45px] tablet:max-h-[46px] 
        flex flex-row'
        />
        <div
          className='min-w-full tablet:min-w-auto order-1 laptop:order-2 flex-1 flex flex-row items-center rounded-lg 
          bg-surface-container-background overflow-hidden outline-1 outline-primary-stroke pl-4 max-h-[44px] tablet:max-h-[46px]'
        >
          <input
            name='q'
            value={searchQuery}
            type='text'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Location, City, Community...'
            className='flex-1 indent-0 bg-transparent text-shades-gray-900 placeholder:text-secondary-foreground 
            outline-none border-0 text-[14px] mobile:text-[15px]'
          />
          <button
            type='submit'
            className='cursor-pointer flex items-center justify-center rounded-lg 
            bg-accent-solid min-w-[46px] min-h-[46px]'
          >
            <figure className='text-white'>
              <MagnifyingGlass size={20} />
            </figure>
          </button>
        </div>
        <div className='hidden laptop:flex order-3 flex-row gap-2.5'>
          <DropdownMinimal
            key={`property-type-${
              searchParams.get("property_type") || "default"
            }`}
            placeholder={
              PROPERTY_TYPES.find(
                (option) => option.value === searchParams.get("property_type")
              )?.value ?? "Property Type"
            }
            items={PROPERTY_TYPES}
            defaultSelectedKey={searchParams.get("property_type") || "All"}
            onSelectionChange={handleChangePropertyType}
            className='flex order-2 laptop:order-1 cursor-pointer py-2.5 px-4! bg-transparent justify-between *:text-terciary-foreground *:fill-terciary-foreground 
            flex-row items-center gap-2 outline-1 outline-secondary-stroke h-full rounded-lg transition-colors duration-200 max-h-[46px]'
            width='w-full'
            popoverClassName='rounded-md! shadow-none!'
          />
          <FeatureQuantityDropdown
            key={`beds-${searchParams.get("beds") || "default"}`}
            icon={<Bed size={18} />}
            label='Beds'
            options={["Any", 1, 2, 3, 4, 5]}
            defaultSelectedKey={searchParams.get("beds") || undefined}
            onSelectionChange={handleChangeBeds}
            placeholder='Select number of beds'
          />
          <FeatureQuantityDropdown
            key={`baths-${searchParams.get("baths") || "default"}`}
            icon={<Toilet size={18} />}
            label='Baths'
            options={["Any", 1, 2, 3, 4, 5]}
            defaultSelectedKey={searchParams.get("baths") || undefined}
            onSelectionChange={handleChangeBaths}
            placeholder='Select number of baths'
          />
          <PriceDropdown
            key={`price-${searchParams.get("price_min") || "default"}`}
            defaultMinKey={
              searchParams.get("price_min")
                ? Number(searchParams.get("price_min"))
                : null
            }
            defaultMaxKey={
              searchParams.get("price_max")
                ? Number(searchParams.get("price_max"))
                : null
            }
            onMinChange={handleChangeMinPrice}
            onMaxChange={handleChangeMaxPrice}
            placeholder='Price'
          />
          <MoreFilters />
        </div>
        <button
          name='more-filters'
          type='button'
          onClick={toggleFiltersModal}
          className={`order-3 laptop:order-3 max-h-[45px] tablet:max-h-[46px] flex laptop:hidden cursor-pointer py-2.5 px-4 bg-transparent justify-center flex-row
          items-center gap-2 border-[1px] rounded-lg border-secondary-stroke/80`}
        >
          <figure className='fill-accent'>
            <FadersHorizontal size={10} />
          </figure>
          <span className='text-[14px] leading-[180%] text-terciary-foreground whitespace-nowrap'>
            More Filters
          </span>
          <div className='fill-terciary-foreground'>
            <CaretArrow size={7} direction='down' />
          </div>
        </button>
      </form>
    </div>
  );
};
