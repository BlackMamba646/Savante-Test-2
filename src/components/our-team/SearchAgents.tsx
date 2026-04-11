"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DropdownMinimal } from "../common/input/DropdownMinimal";
import { MagnifyingGlass } from "../shared/icons/magnifying-glass";
import {
  LANGUAGE_AGENT_OPTIONS,
  ROLE_AGENT_OPTIONS,
} from "@/config/constant.config";
import { useRouter } from "@bprogress/next";
import { IconButton } from "../common/button/IconButton";

export const SearchAgents = () => {
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

  const handleChangeLanguage = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("language", String(value));
    params.delete("q");

    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleChangeRole = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", String(value));
    params.delete("q");

    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className='flex flex-col gap-5 items-center w-full'>
      <form
        onSubmit={handleSearch}
        method='get'
        autoComplete='on'
        className='flex flex-row items-center gap-0 max-w-full laptop:max-w-[760px] w-full 
        mx-auto outline-1 outline-primary-stroke rounded-full pr-2 pl-2 tablet:pl-4 pt-2 pb-2 
        animate-fade-in delay-500 duration-300'
      >
        <div className='flex-1 flex flex-row gap-0 w-full'>
          <div className='flex-row gap-0 self-center w-full tablet:w-auto hidden tablet:flex'>
            <DropdownMinimal
              key={`language-desktop-${
                searchParams.get("language") || "default"
              }`}
              placeholder={
                LANGUAGE_AGENT_OPTIONS.find(
                  (option) => option.value === searchParams.get("language")
                )?.text ?? "Language"
              }
              items={LANGUAGE_AGENT_OPTIONS}
              defaultSelectedKey={searchParams.get("language") || ""}
              onSelectionChange={handleChangeLanguage}
              className='*:text-secondary rounded-none! 
              px-3! py-2.5! laptop:py-4! min-w-[130px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
              [&_figure]:opacity-50'
              iconSize={10}
              width='w-full'
              spanWidth='w-full'
              containerClassName='w-full tablet:w-auto'
              popoverClassName='mt-0!'
            />
            <DropdownMinimal
              key={`role-desktop-${searchParams.get("role") || "default"}`}
              placeholder={
                ROLE_AGENT_OPTIONS.find(
                  (option) => option.value === searchParams.get("role")
                )?.text ?? "Role"
              }
              items={ROLE_AGENT_OPTIONS}
              defaultSelectedKey={searchParams.get("role") || ""}
              onSelectionChange={handleChangeRole}
              className='*:text-secondary rounded-none! 
              px-3! py-2.5! laptop:py-4! min-w-[115px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
              [&_figure]:opacity-50'
              iconSize={10}
              width='w-full'
              spanWidth='w-full'
              containerClassName='w-full tablet:w-auto'
              popoverClassName='mt-0!'
            />
          </div>
          <div className='flex flex-col gap-2 h-full flex-1'>
            <div
              className='flex flex-row gap-3 w-full
               bg-transparent py-2.5 laptop:py-4 px-2.5 items-center rounded-none'
            >
              <div className='w-full flex flex-row gap-2 tablet:gap-3 items-center'>
                <figure className='text-secondary'>
                  <MagnifyingGlass size={20} />
                </figure>
                <input
                  type='text'
                  name='q'
                  placeholder='Search by agent name'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full text-[14px] laptop:text-[16px] focus:outline-none 
                    text-secondary leading-[180%] placeholder:text-secondary'
                />
              </div>
            </div>
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
      <div className='flex flex-wrap tablet:hidden flex-row gap-3 w-full tablet:w-auto items-center justify-start tablet:justify-center'>
        <DropdownMinimal
          key={`language-mobile-${searchParams.get("language") || "default"}`}
          placeholder={
            LANGUAGE_AGENT_OPTIONS.find(
              (option) => option.value === searchParams.get("language")
            )?.text ?? "Language"
          }
          items={LANGUAGE_AGENT_OPTIONS}
          defaultSelectedKey={searchParams.get("language") || ""}
          onSelectionChange={handleChangeLanguage}
          className='*:text-secondary outline-1 outline-primary-stroke rounded-lg
              px-3! py-2.5! laptop:py-4! min-w-[115px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
              [&_figure]:opacity-50'
          iconSize={10}
          width='w-auto'
          spanWidth='w-full'
          containerClassName='w-auto'
          popoverClassName='mt-0!'
        />
        <DropdownMinimal
          key={`role-mobile-${searchParams.get("role") || "default"}`}
          placeholder={
            ROLE_AGENT_OPTIONS.find(
              (option) => option.value === searchParams.get("role")
            )?.text ?? "Role"
          }
          items={ROLE_AGENT_OPTIONS}
          defaultSelectedKey={searchParams.get("role") || ""}
          onSelectionChange={handleChangeLanguage}
          className='*:text-secondary outline-1 outline-primary-stroke rounded-lg
          px-3! py-2.5! laptop:py-4! min-w-[115px]! [&_span]:text-[14px] laptop:[&_span]:text-[16px]! h-auto gap-3 [&_figure]:text-secondary
          [&_figure]:opacity-50'
          iconSize={10}
          width='w-auto'
          spanWidth='w-full'
          containerClassName='w-auto'
          popoverClassName='mt-0!'
        />
      </div>
    </div>
  );
};
