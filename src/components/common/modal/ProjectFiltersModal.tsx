import { PriceModalDropdown } from "@/components/property-listing/PriceModalDropdown";
import { Arrow } from "@/components/shared/icons/arrow";
import { ArrowClockwise } from "@/components/shared/icons/arrow-clockwise";
import { useEffect, useState } from "react";
import { FadersHorizontal } from "@/components/shared/icons/faders-horizontal";
import { TextButton } from "../button/TextButton";
import { DropdownMinimal } from "../input/DropdownMinimal";
import {
  COMPLETION_STATUS_OPTIONS,
  DEVELOPERS_BY_AREA_OPTIONS,
} from "@/config/constant.config";
import { AreaModel, DeveloperModel } from "@/interfaces";
import { ProjectFilters } from "@/types/filters";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { AreasSelect } from "../input/AreasSelect";

interface FiltersModalProps {
  areas?: AreaModel[];
  developers?: DeveloperModel[];
  isVisible?: boolean;
  onClose?: () => void;
}

export const ProjectFiltersModal = ({
  isVisible,
  onClose,
  areas,
  developers,
}: FiltersModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [projectFilters, setProjectFilters] = useState<ProjectFilters>({});

  useEffect(() => {
    const initialFilters: ProjectFilters = {};

    const areaFromUrl = searchParams.get("area");
    if (areaFromUrl) {
      initialFilters.area = areaFromUrl;
    }

    const developerFromUrl = searchParams.get("developer");
    if (developerFromUrl) {
      initialFilters.developer = developerFromUrl;
    }

    const projectTypeFromUrl = searchParams.get("project_type");
    if (projectTypeFromUrl) {
      initialFilters.project_type = projectTypeFromUrl;
    }

    const statusFromUrl = searchParams.get("status");
    if (statusFromUrl) {
      initialFilters.status = statusFromUrl;
    }

    const minPriceFromUrl = searchParams.get("price_min");
    if (minPriceFromUrl) {
      initialFilters.price_min = minPriceFromUrl;
    }

    const maxPriceFromUrl = searchParams.get("price_max");
    if (maxPriceFromUrl) {
      initialFilters.price_max = maxPriceFromUrl;
    }

    setProjectFilters(initialFilters);
  }, [searchParams, isVisible]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const handleMinPriceSelect = (value: number | null) => {
    if (value !== null) {
      setProjectFilters({ ...projectFilters, price_min: value.toString() });
    } else {
      setProjectFilters({ ...projectFilters, price_min: null });
    }
  };

  const handleMaxPriceSelect = (value: number | null) => {
    if (value !== null) {
      setProjectFilters({ ...projectFilters, price_max: value.toString() });
    } else {
      setProjectFilters({ ...projectFilters, price_max: null });
    }
  };

  const handleAreaSelect = (value: string) => {
    if (!value) {
      const { area, ...rest } = projectFilters;
      setProjectFilters(rest);
    } else {
      setProjectFilters({ ...projectFilters, area: value });
    }
  };

  const handleDeveloperSelect = (value: string | number) => {
    if (value === "All") {
      const { developer, ...rest } = projectFilters;
      setProjectFilters(rest);
    } else {
      setProjectFilters({ ...projectFilters, developer: String(value) });
    }
  };

  const handleStatusSelect = (value: string | number) => {
    if (value === "all") {
      const { status, ...rest } = projectFilters;
      setProjectFilters(rest);
    } else {
      setProjectFilters({ ...projectFilters, status: String(value) });
    }
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const filterKeys = [
      "area",
      "developer",
      "project_type",
      "status",
      "price_min",
      "price_max",
    ];
    filterKeys.forEach((key) => params.delete(key));

    router.push(`${pathname}?${params.toString()}`);
    onClose?.();
  };

  const handleSubmitFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const filterKeys = [
      "area",
      "developer",
      "project_type",
      "status",
      "price_min",
      "price_max",
    ];
    filterKeys.forEach((key) => params.delete(key));

    Object.entries(projectFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        // No enviar status cuando es "all"
        if (key === "status" && value === "all") {
          return;
        }
        params.set(key, String(value));
      }
    });

    params.delete("q");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    onClose?.();
  };

  return (
    <div
      className={`px-5 tablet:px-10 bg-surface-background border-l-[1px] border-t-[1px] border-secondary-stroke overflow-y-auto scrollbar-hide
        w-full tablet:w-[720px] fixed tablet:top-[62px] top-[62px] right-0 z-100 transition-all duration-400 ease-in-out 
         tablet:h-[calc(100dvh_-_62px)] h-[calc(100dvh_-_62px)]
        ${
          isVisible
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        }`}
    >
      <div className='flex flex-col gap-8 h-full'>
        <div className='flex flex-row gap-5 items-center justify-between pt-5'>
          <button
            onClick={onClose}
            className='flex flex-row gap-2 items-center cursor-pointer'
          >
            <figure className='fill-secondary-foreground cursor-pointer'>
              <Arrow direction='left' size={14} />
            </figure>
            <p className='flex-1 text-primary-foreground text-[18px] leading-[180%]'>
              Filters
            </p>
          </button>
          <button
            type='button'
            onClick={handleResetFilters}
            className='flex flex-row items-center gap-2 bg-surface-container-background 
            border-[1px] border-secondary-stroke/80 py-2.5 px-4 rounded-sm'
          >
            <ArrowClockwise size={14} />
            <span className='text-[14px] leading-[180%] text-secondary-foreground'>
              Reset
            </span>
          </button>
        </div>
        <div className='flex flex-col gap-6 w-full h-full'>
          <div className='flex flex-col gap-2.5'>
            <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
              Areas
            </p>
            <AreasSelect
              className='flex gap-5 flex-row'
              areas={areas}
              onChange={handleAreaSelect}
              selectedArea={projectFilters.area}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
              Developers
            </p>
            <DropdownMinimal
              key={`developer-${searchParams.get("developer") || "default"}`}
              defaultSelectedKey={searchParams.get("developer") || "All"}
              onSelectionChange={handleDeveloperSelect}
              placeholder={
                developers && searchParams.get("developer")
                  ? developers.find(
                      (dev) =>
                        dev.attributes.slug === searchParams.get("developer")
                    )?.attributes.Name ?? "Developers"
                  : "Developers"
              }
              items={
                developers
                  ? developers.map((developer) => ({
                      text: developer.attributes.Name,
                      value: developer.attributes.slug,
                    }))
                  : DEVELOPERS_BY_AREA_OPTIONS
              }
              className='flex flex-row w-full items-center border-b-[1px] rounded-none! border border-secondary-stroke/80
                py-2! px-1! transition-colors duration-300 cursor-pointer justify-between *:text-terciary-foreground! max-h-[44px]'
              width='w-full'
            />
          </div>
          <div className='flex flex-col tablet:flex-row gap-5 tablet:gap-10'>
            <div className='flex flex-col gap-2 flex-1'>
              <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
                Price
              </p>
              <PriceModalDropdown
                onMinChange={handleMinPriceSelect}
                onMaxChange={handleMaxPriceSelect}
                minValue={
                  projectFilters.price_min
                    ? parseInt(projectFilters.price_min)
                    : null
                }
                maxValue={
                  projectFilters.price_max
                    ? parseInt(projectFilters.price_max)
                    : null
                }
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
              Completion Status
            </p>
            <DropdownMinimal
              key={`status-${searchParams.get("status") || "default"}`}
              defaultSelectedKey={
                projectFilters.status ||
                searchParams.get("status") ||
                "Completion"
              }
              onSelectionChange={handleStatusSelect}
              placeholder={
                COMPLETION_STATUS_OPTIONS.find(
                  (option) =>
                    option.value ===
                    (projectFilters.status || searchParams.get("status"))
                )?.text ?? "Completion"
              }
              items={COMPLETION_STATUS_OPTIONS}
              className='flex flex-row w-full items-center border-b-[1px] rounded-none! border border-secondary-stroke/80
                py-2! px-1! transition-colors duration-300 cursor-pointer justify-between *:text-terciary-foreground! max-h-[44px]'
              width='w-full'
            />
          </div>
          <div className='flex-1 h-full'></div>
          <div className='flex flex-row gap-2 pb-5'>
            <TextButton
              type='button'
              text='Cancel'
              state='default'
              customClassName='btn-primary-outline-alpha-variant rounded-4xl justify-center text-accent 
              py-3 px-2 mobile:px-6 flex-1 text-[15px]'
              textClassName="uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap"
              onClick={onClose}
            />
            <TextButton
              onClick={handleSubmitFilters}
              type='button'
              text='Update Search'
              state='default'
              customClassName='btn-primary-fill-variant py-3 px-2 mobile:px-6 flex-2 mobile:flex-3 justify-center
              rounded-4xl'
              textClassName="uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap"
              showLeftIcon={true}
              leftIcon={FadersHorizontal}
              iconSize={20}
              animateIcon={true}
              iconAnimation={"scale"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};