"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next/app";
import {
  COMPLETION_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/config/constant.config";
import { DropdownMinimal } from "../input/DropdownMinimal";
import { MagnifyingGlass } from "@/components/shared/icons/magnifying-glass";
import { PriceDropdown } from "@/components/common/input/PriceDropdown";
import { FadersHorizontal } from "@/components/shared/icons/faders-horizontal";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { AreaModel } from "@/interfaces";
import { ProjectFiltersModal } from "../modal/ProjectFiltersModal";
import { useHoneypot } from "@/hooks/use-honeypot";

interface FiltersProps {
  areas?: AreaModel[];
}

export const Filters = ({ areas }: FiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    params.set("baths", String(value));
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeBeds = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("beds", String(value));
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

  const handleChangeCompletionStatus = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", String(value));
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeProjectType = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project_type", String(value));
    
    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div
      className='pt-5 pb-5 laptop:pb-5 laptop:pt-5 gap-5 spacing-padding-x max-w-[1440px] mx-auto sticky 
      top-0 laptop:-top-[0px] z-99 bg-surface-background'
    >
      <ProjectFiltersModal
        isVisible={isFiltersModalOpen}
        onClose={toggleFiltersModal}
        areas={areas}
      />
      <form
        onSubmit={handleSearch}
        method='get'
        autoComplete='off'
        className='flex flex-row gap-y-5 gap-x-2 tablet:gap-y-5 tablet:gap-x-5 flex-wrap laptop:flex-nowrap'
      >
        <div className='relative flex h-full'>
          <DropdownMinimal
            key={`status-${searchParams.get("status") || "default"}`}
            placeholder={
              COMPLETION_STATUS_OPTIONS.find(
                (option) => option.value === searchParams.get("status")
              )?.text ?? "Completion"
            }
            items={COMPLETION_STATUS_OPTIONS}
            defaultSelectedKey={searchParams.get("status") || "Completion"}
            onSelectionChange={handleChangeCompletionStatus}
            className='flex order-2 laptop:order-1 cursor-pointer py-2.5 px-4! bg-accent! justify-between *:text-white *:fill-white 
            flex-row items-center gap-2 h-full rounded-lg transition-colors duration-200 max-h-[46px]'
            width='w-full'
          />
        </div>
        <div
          className='min-w-full tablet:min-w-auto order-10 tablet:order-1 laptop:order-2 flex-1 flex flex-row items-center rounded-lg 
        bg-surface-container-background overflow-hidden border-[1px] border-primary-stroke/20 pl-4 pr-0 h-[46px]'
        >
          <input
            type='text'
            placeholder='Location, City, Community...'
            className='flex-1 indent-0 bg-transparent text-shades-gray-900 placeholder:text-secondary-foreground outline-none border-0 text-[14px] mobile:text-[15px]'
            name='q'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type='submit'
            className='cursor-pointer flex items-center justify-center rounded-lg bg-accent min-w-[46px] min-h-[46px]'
          >
            <figure className='text-white'>
              <MagnifyingGlass size={20} />
            </figure>
          </button>
        </div>
        <div className='hidden laptop:flex order-3 flex-row gap-2.5'>
          <DropdownMinimal
            key={`project-type-${
              searchParams.get("project_type") || "default"
            }`}
            placeholder={
              PROJECT_TYPE_OPTIONS.find(
                (option) => option.value === searchParams.get("project_type")
              )?.text ?? "Project Type"
            }
            items={PROJECT_TYPE_OPTIONS}
            defaultSelectedKey={searchParams.get("project_type") || "All"}
            onSelectionChange={handleChangeProjectType}
            className='flex order-2 laptop:order-1 cursor-pointer py-2.5 px-4! bg-transparent justify-between *:text-terciary-foreground *:fill-terciary-foreground 
            flex-row items-center gap-2 border-[1px] border-secondary-stroke/80 h-full rounded-lg transition-colors duration-200 max-h-[46px]'
            width='w-full'
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
            position="right"
          />
        </div>
        <button
          name='more-filters'
          type='button'
          onClick={toggleFiltersModal}
          className={`order-3 laptop:order-3 flex laptop:hidden cursor-pointer py-2 px-4 bg-transparent justify-center flex-row
          items-center gap-2 border-[1px] rounded-lg border-secondary-stroke/80`}
        >
          <figure className='fill-accent'>
            <FadersHorizontal size={16} />
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
