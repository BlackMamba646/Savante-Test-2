"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DropdownMinimal } from "../common/input/DropdownMinimal";
import { MagnifyingGlass } from "../shared/icons/magnifying-glass";
import {
  COMPLETION_STATUS_OPTIONS,
  DEVELOPERS_BY_AREA_OPTIONS,
  LANGUAGE_AGENT_OPTIONS,
  ROLE_AGENT_OPTIONS,
  SORT_DEVELOPER_OPTIONS,
} from "@/config/constant.config";
import { useRouter } from "@bprogress/next";
import { IconButton } from "../common/button/IconButton";
import { FadersHorizontal } from "../shared/icons/faders-horizontal";
import { FilterDevelopersModal } from "./FilterDevelopersModal";

export const SearchDevelopers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [moreFilterOpen, setMoreFilterOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const params = new URLSearchParams();
    params.set("q", searchQuery.trim());

    const queryString = params.toString();
    router.push(`${location.pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleChangeSortBy = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", String(value));
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeDevelopersByArea = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("developers-by-area", String(value));
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeCompletionStatus = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("completion-status", String(value));
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className='relative flex flex-col gap-5 items-center w-full animate-fade-in delay-500 duration-300'>
      <FilterDevelopersModal
        isOpen={moreFilterOpen}
        onClose={() => setMoreFilterOpen(false)}
      />
      <form
        onSubmit={handleSearch}
        method='get'
        autoComplete='on'
        className='relative flex flex-row items-center gap-0 max-w-full laptop:max-w-[900px] w-full 
      mx-auto outline-1 outline-secondary-stroke rounded-full pr-2 pl-2 tablet:pl-4 pt-2 pb-2 backdrop-blur-[10px]'
        style={{
          background: `var(--color-stops-mode-40, rgba(0, 0, 0, 0.40))`,
        }}
      >
        <div className='flex-1 flex flex-row gap-0 w-full'>
          <div className='flex-row gap-0 self-center w-full tablet:w-auto hidden tablet:flex'>
            <DropdownMinimal
              key={`sort-by-${searchParams.get("sort") || "default"}`}
              placeholder={
                SORT_DEVELOPER_OPTIONS.find(
                  (option) => option.value === searchParams.get("sort")
                )?.text ?? "Sort by"
              }
              items={SORT_DEVELOPER_OPTIONS}
              defaultSelectedKey={searchParams.get("sort") || ""}
              onSelectionChange={handleChangeSortBy}
              className='*:text-secondary rounded-none! 
              px-3! py-2.5! laptop:py-4! min-w-[115px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
              [&_figure]:opacity-50 bg-transparent!'
              iconSize={10}
              width='w-full'
              spanWidth='w-full'
              containerClassName='w-full tablet:w-auto'
              popoverClassName='mt-0!'
            />

            <DropdownMinimal
              key={`developers-by-area-${
                searchParams.get("developers-by-area") || "default"
              }`}
              placeholder={
                DEVELOPERS_BY_AREA_OPTIONS.find(
                  (option) =>
                    option.value === searchParams.get("developers-by-area")
                )?.text ?? "Area"
              }
              items={DEVELOPERS_BY_AREA_OPTIONS}
              defaultSelectedKey={searchParams.get("developers-by-area") || ""}
              onSelectionChange={handleChangeDevelopersByArea}
              className='*:text-secondary rounded-none! 
                px-3! py-2.5! laptop:py-4! min-w-[115px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
                [&_figure]:opacity-50 bg-transparent!'
              iconSize={10}
              width='w-full'
              spanWidth='w-full'
              containerClassName='w-full tablet:w-auto'
              popoverClassName='mt-0!'
            />

            <DropdownMinimal
              key={`completion-status-${
                searchParams.get("completion-status") || "default"
              }`}
              placeholder={
                COMPLETION_STATUS_OPTIONS.find(
                  (option) =>
                    option.value === searchParams.get("completion-status")
                )?.text ?? "Completion"
              }
              items={COMPLETION_STATUS_OPTIONS}
              defaultSelectedKey={searchParams.get("completion-status") || ""}
              onSelectionChange={handleChangeCompletionStatus}
              className='*:text-secondary rounded-none! 
                px-3! py-2.5! laptop:py-4! min-w-[148px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
                [&_figure]:opacity-50 bg-transparent!'
              iconSize={10}
              width='w-full'
              spanWidth='w-full'
              containerClassName='w-full tablet:w-auto'
              popoverClassName='mt-0!'
            />
          </div>
          <div className='flex flex-row gap-2 h-full flex-1 py-2.5 laptop:py-4 px-2.5'>
            <div
              className='flex flex-row gap-3 w-full
               bg-transparent  items-center rounded-none'
            >
              <div className='w-full flex flex-row gap-2 tablet:gap-3 items-center'>
                <figure className='text-secondary'>
                  <MagnifyingGlass size={20} />
                </figure>
                <input
                  type='text'
                  name='q'
                  placeholder='Search by developer name'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full text-[14px] laptop:text-[16px] focus:outline-none 
                    text-secondary leading-[180%] placeholder:text-secondary'
                />
              </div>
            </div>
            <button
              className='relative text-secondary opacity-50 block tablet:hidden'
              onClick={() => setMoreFilterOpen(true)}
              aria-label='Open more filters modal for developers'
              type='button'
            >
              <FadersHorizontal size={18} />
            </button>
          </div>
        </div>
        <IconButton
          type='submit'
          icon={MagnifyingGlass}
          big={false}
          state='default'
          iconSize={20}
          iconClassName='text-icon-primary-button'
          customClassName='bg-background-primary-button rounded-full **:text-primary-button w-max 
            tablet:w-auto px-3 py-3 tablet:px-[24px] tablet:py-[16px] laptop:px-[34px] laptop:py-[20px] justify-center tablet:justify-start'
        />
      </form>
    </div>
  );
};
