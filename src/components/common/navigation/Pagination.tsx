"use client";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { DropdownMinimal } from "../input/DropdownMinimal";

export interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination = (props: PaginationProps) => {
  const { totalPages = 1, page = 1, onPageChange, maxVisiblePages = 5 } = props;

  const [currentPage, setCurrentPage] = useState(page);
  const [api, setApi] = useState<CarouselApi>();

  const pageList = useMemo(
    () =>
      Array.from({ length: totalPages }).map((_, idx) => ({
        text: idx + 1 > 9 ? `${idx + 1}` : `0${idx + 1}`,
        value: idx + 1,
      })),
    [totalPages]
  );

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    api?.scrollTo(page - 1);
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;

    const newPage = currentPage - 1;
    api?.scrollPrev();
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handleNext = () => {
    if (currentPage >= totalPages) return;
    const newPage = currentPage + 1;
    api?.scrollNext();
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  useEffect(() => {
    if (page && page !== currentPage) {
      setCurrentPage(page);
      api?.scrollTo(page - 1);
    }
  }, [page, api, currentPage]);

  return (
    <footer className='w-full flex flex-row justify-center tablet:justify-between px-2.5 items-center'>
      <DropdownMinimal
        key={`pagination-dropdown-${currentPage}`}
        placeholder={
          pageList.find((p) => p.value === currentPage)
            ? `Page ${pageList.find((p) => p.value === currentPage)!.text}`
            : "Page 01"
        }
        items={pageList.map((p) => ({
          ...p,
          text: `Page ${p.text}`,
        }))}
        defaultSelectedKey={currentPage}
        onSelectionChange={(value) => handleChangePage(Number(value))}
        className={cn(
          "hidden tablet:flex max-h-[45px] cursor-pointer bg-transparent justify-between",
          "flex-row items-center gap-2.5",
          "border-[1px] border-secondary-stroke rounded-lg text-[14px]",
          "*:text-secondary transition-colors duration-200 px-4!"
        )}
        width='w-full'
      />

      <div className='flex flex-row items-center gap-6'>
        <button
          onClick={handlePrev}
          aria-label='Previous page'
          className='cursor-pointer transition-opacity'
        >
          <figure className='text-icon-secondary-button'>
            <CaretArrow size={10} direction='left' />
          </figure>
        </button>

        <div className='flex items-center justify-center'>
          <Carousel
            className='w-full overflow-hidden rounded-3xl'
            setApi={setApi}
            opts={{ loop: false, align: "start" }}
          >
            <CarouselContent className='mx-0'>
              {pageList.map((pageItem) => (
                <CarouselItem
                  key={`page-${pageItem.value}`}
                  className='basis-[45px] p-0'
                >
                  <button
                    onClick={() => handleChangePage(pageItem.value)}
                    aria-label={`Go to page ${pageItem.value}`}
                    aria-current={
                      pageItem.value === currentPage ? "page" : undefined
                    }
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-[14px] transition-colors duration-200",
                      pageItem.value === currentPage
                        ? "bg-accent-solid text-shades-gray-0"
                        : "bg-transparent text-terciary-foreground hover:bg-surface-container-background"
                    )}
                  >
                    {pageItem.text}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <button
          onClick={handleNext}
          aria-label='Next page'
          className='cursor-pointer transition-opacity'
        >
          <figure className='text-icon-secondary-button'>
            <CaretArrow size={10} direction='right' />
          </figure>
        </button>
      </div>
    </footer>
  );
};