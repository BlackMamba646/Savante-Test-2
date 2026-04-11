import React, { FormEvent, useState } from "react";
import { DropdownMinimal } from "../common/input/DropdownMinimal";
import { useRouter } from "@bprogress/next";
import { PROPERTY_TYPES, ROUTING } from "@/config/constant.config";
import { MagnifyingGlass } from "../shared/icons/magnifying-glass";
import { LinkButton } from "../common/button/LinkButton";
import { ArrowUpRight } from "../shared/icons/arrow-up-right";
import { Tabs, OPERATION_TYPES_VALUES } from "./Tabs";

export const SearchContainer = () => {
  const router = useRouter();

  const [filterQuery, setFilterQuery] = useState<{
    filters: Record<string, any>;
    querySearch: string;
  }>({
    filters: {
      operation: OPERATION_TYPES_VALUES.BUY,
      property_type: "apartment",
    },
    querySearch: "",
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Solo procesar si se hizo click en el botón de búsqueda
    const submitter = (e.nativeEvent as SubmitEvent).submitter;
    if (!submitter || submitter.getAttribute("type") !== "submit") {
      return;
    }

    switch (filterQuery.filters.operation) {
      case OPERATION_TYPES_VALUES.BUY:
        router.push(
          `${ROUTING.FOR_SALE}?q=${filterQuery.querySearch}&property_type=${filterQuery.filters.property_type}`
        );
        break;
      case OPERATION_TYPES_VALUES.RENT:
        router.push(
          `${ROUTING.FOR_RENT}?q=${filterQuery.querySearch}&property_type=${filterQuery.filters.property_type}`
        );
        break;
      default:
        router.push(
          `${ROUTING.FOR_SALE}?q=${filterQuery.querySearch}&property_type=${filterQuery.filters.property_type}`
        );
        break;
    }
  };

  const handleChangePropertyType = (value: string | number) => {
    setFilterQuery((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        property_type: value,
      },
    }));
  };

  const handleChangeOperation = (operation: OPERATION_TYPES_VALUES) => {
    setFilterQuery((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        operation,
      },
    }));
  };

  return (
    <div className='flex flex-col gap-3 w-full laptop:w-max'>
      <Tabs 
        currentOperation={filterQuery.filters.operation}
        onChangeOperation={handleChangeOperation}
        className="flex laptop:hidden"
      />
      <form
        onSubmit={handleSearch}
        className='flex flex-row gap-0 py-2 pr-2 pl-2 tablet:pl-4 outline-[1px] outline-secondary-stroke rounded-full
           backdrop-blur-[10px]'
        style={{
          background: `var(--color-stops-mode-40, rgba(0, 0, 0, 0.40))`,
        }}
      >
        <Tabs 
          currentOperation={filterQuery.filters.operation}
          onChangeOperation={handleChangeOperation}
          className="hidden laptop:flex"
        />
        <DropdownMinimal
          key={`property-type-${
            filterQuery.filters.property_type || "default"
          }`}
          placeholder={
            PROPERTY_TYPES.find(
              (option) => option.value === filterQuery.filters.property_type
            )?.text ?? "Property Type"
          }
          items={PROPERTY_TYPES}
          defaultSelectedKey={
            filterQuery.filters.property_type || "Property Type"
          }
          onSelectionChange={handleChangePropertyType}
          className='*:text-secondary *:text-[16px]! h-auto py-4 px-2.5! rounded-none! bg-transparent!
        [&_figure]:opacity-50!'
          containerClassName='hidden tablet:flex'
          iconSize={10}
          width='w-full'
          popoverClassName='mt-0!'
        />
        <div className='flex-1 laptop:flex-none flex flex-row gap-3 tablet:py-4 tablet:px-2.5 py-2.5 px-2.5 rounded-none items-center w-[400px]'>
          <figure className='size-5 relative text-secondary'>
            <MagnifyingGlass size={20} />
          </figure>
          <input
            type='text'
            name='q'
            placeholder='Search by area or community'
            value={filterQuery.querySearch}
            onChange={(e) =>
              setFilterQuery((prev) => ({
                ...prev,
                querySearch: e.target.value,
              }))
            }
            className='flex-1 outline-none border-none bg-transparent placeholder:text-secondary text-primary-foreground 
            tablet:text-[16px] text-[14px]'
          />
        </div>
        <button
          type='submit'
          className='bg-background-primary-button tablet:py-[20px] tablet:px-[34px] py-3 px-3 rounded-full hover:bg-background-primary-button/80
        transition-all duration-300 ease-out'
        >
          <figure className='text-icon-primary-button'>
            <MagnifyingGlass size={20} />
          </figure>
        </button>
      </form>
      <div className='relative w-max group self-center laptop:self-start px-3 cursor-pointer hidden tablet:block'>
        <LinkButton
          href={ROUTING.LIST_YOUR_PROPERTY}
          text={"List your property"}
          textClassName='leading-[95%] heading-secondary! text-secondary'
          state={"default"}
          customClassName='btn-secondary-variant'
          iconClassName='text-accent-solid!'
          showRightIcon={true}
          iconSize={10}
          rightIcon={ArrowUpRight}
          animateIcon={true}
          iconAnimation={"rotate"}
        />
      </div>
    </div>
  );
};
