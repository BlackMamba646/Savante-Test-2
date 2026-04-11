import { FeatureQuantityOptions } from "@/components/property-listing/FeatureQuantityOptions";
import { PriceModalDropdown } from "@/components/property-listing/PriceModalDropdown";
import { SizeModalDropdown } from "@/components/property-listing/SizeModalDropdown";
import { Arrow } from "@/components/shared/icons/arrow";
import { ArrowClockwise } from "@/components/shared/icons/arrow-clockwise";
import { Bed } from "@/components/shared/icons/bed";
import { Toilet } from "@/components/shared/icons/toilet";
import { useEffect, useState } from "react";
import { FadersHorizontal } from "@/components/shared/icons/faders-horizontal";
import { TextButton } from "../button/TextButton";
import { DropdownMinimal } from "../input/DropdownMinimal";
import { PROPERTY_TYPES } from "@/config/constant.config";
import { AreaModel } from "@/interfaces";
import { PropertyFilters } from "@/types/filters";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { AreasSelect } from "../input/AreasSelect";

interface FiltersModalProps {
  areas?: AreaModel[];
  isVisible?: boolean;
  onClose?: () => void;
}

export const PropertyFiltersModal = ({
  isVisible,
  onClose,
  areas,
}: FiltersModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>({});

  useEffect(() => {
    const initialFilters: PropertyFilters = {};

    const areaFromUrl = searchParams.get("area");
    if (areaFromUrl) {
      initialFilters.area = areaFromUrl;
    }

    const propertyTypeFromUrl =
      searchParams.get("property_type") || searchParams.get("propertyType");
    if (propertyTypeFromUrl) {
      initialFilters.property_type = propertyTypeFromUrl;
    }

    const minPriceFromUrl = searchParams.get("price_min");
    if (minPriceFromUrl) {
      initialFilters.price_min = minPriceFromUrl;
    }

    const maxPriceFromUrl = searchParams.get("price_max");
    if (maxPriceFromUrl) {
      initialFilters.price_max = maxPriceFromUrl;
    }

    const minSizeFromUrl = searchParams.get("size_min");
    if (minSizeFromUrl) {
      initialFilters.size_min = minSizeFromUrl;
    }

    const maxSizeFromUrl = searchParams.get("size_max");
    if (maxSizeFromUrl) {
      initialFilters.size_max = maxSizeFromUrl;
    }

    const bedsFromUrl = searchParams.get("beds");
    if (bedsFromUrl) {
      initialFilters.beds = bedsFromUrl;
    }

    const bathsFromUrl = searchParams.get("baths");
    if (bathsFromUrl) {
      initialFilters.baths = bathsFromUrl;
    }

    setPropertyFilters(initialFilters);
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

  const handleBedsSelect = (value: string | number) => {
    if (value === "Any") {
      const { beds, ...rest } = propertyFilters;
      setPropertyFilters(rest);
    } else {
      setPropertyFilters({ ...propertyFilters, beds: value });
    }
  };

  const handleBathsSelect = (value: string | number) => {
    if (value === "Any") {
      const { baths, ...rest } = propertyFilters;
      setPropertyFilters(rest);
    } else {
      setPropertyFilters({ ...propertyFilters, baths: value });
    }
  };

  const handlePropertyTypeSelect = (value: string | number) => {
    if (value === "All") {
      const { property_type, ...rest } = propertyFilters;
      setPropertyFilters(rest);
    } else {
      setPropertyFilters({ ...propertyFilters, property_type: value });
    }
  };

  const handleMinPriceSelect = (value: number | null) => {
    if (value !== null) {
      setPropertyFilters({ ...propertyFilters, price_min: value.toString() });
    } else {
      setPropertyFilters({ ...propertyFilters, price_min: null });
    }
  };

  const handleMaxPriceSelect = (value: number | null) => {
    if (value !== null) {
      setPropertyFilters({ ...propertyFilters, price_max: value.toString() });
    } else {
      setPropertyFilters({ ...propertyFilters, price_max: null });
    }
  };

  const handleMinSizeSelect = (value: number | null) => {
    if (value !== null) {
      setPropertyFilters({ ...propertyFilters, size_min: value.toString() });
    } else {
      setPropertyFilters({ ...propertyFilters, size_min: null });
    }
  };

  const handleMaxSizeSelect = (value: number | null) => {
    if (value !== null) {
      setPropertyFilters({ ...propertyFilters, size_max: value.toString() });
    } else {
      setPropertyFilters({ ...propertyFilters, size_max: null });
    }
  };

  const handleAreaSelect = (value: string) => {
    if (!value) {
      const { area, ...rest } = propertyFilters;
      setPropertyFilters(rest);
    } else {
      setPropertyFilters({ ...propertyFilters, area: value });
    }
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const filterKeys = [
      "area",
      "property_type",
      "price_min",
      "price_max",
      "size_min",
      "size_max",
      "beds",
      "baths",
    ];
    filterKeys.forEach((key) => params.delete(key));

    router.push(`${pathname}?${params.toString()}`);
    onClose?.();
  };

  const handleSubmitFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const filterKeys = [
      "area",
      "property_type",
      "price_min",
      "price_max",
      "size_min",
      "size_max",
      "beds",
      "baths",
    ];
    filterKeys.forEach((key) => params.delete(key));

    Object.entries(propertyFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        if (
          (key === "beds" || key === "baths") && value === "Any"
        ) {
          return;
        }
        if (key === "property_type" && value === "All") {
          return;
        }
        const urlKey = key === "property_type" ? "property_type" : key;
        params.set(urlKey, String(value));
      }
    });

    params.delete("q");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    onClose?.();
  };

  return (
    <div
      className={`spacing-padding-x bg-surface-background border-l-[1px] border-t-[1px] border-secondary-stroke overflow-y-auto scrollbar-hide
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
            <figure className='text-accent-solid cursor-pointer'>
              <Arrow direction='left' size={20} />
            </figure>
            <p className='flex-1 text-secondary heading-secondary leading-[95%]'>
              Filters
            </p>
          </button>
          <button
            type='button'
            onClick={handleResetFilters}
            className='flex flex-row items-center gap-2 bg-white hover:bg-surface-container-background 
            outline-1 outline-secondary-stroke py-2.5 px-4 rounded-sm transition-colors duration-300'
          >
            <ArrowClockwise size={18} />
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
              selectedArea={propertyFilters.area}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
              Property Type
            </p>
            <DropdownMinimal
              key={`property-type-${
                propertyFilters.property_type ||
                searchParams.get("property_type") ||
                "default"
              }`}
              defaultSelectedKey={
                propertyFilters.property_type ||
                searchParams.get("property_type") ||
                "All"
              }
              onSelectionChange={handlePropertyTypeSelect}
              placeholder={
                propertyFilters.property_type || searchParams.get("property_type")
                  ? PROPERTY_TYPES.find(
                      (option) =>
                        option.value ===
                        (propertyFilters.property_type ||
                          searchParams.get("property_type"))
                    )?.text ?? "All"
                  : "All"
              }
              items={PROPERTY_TYPES}
              className='flex flex-row w-full items-center border-b-[1px] rounded-none! border border-secondary-stroke/80
                py-2! px-1! transition-colors duration-300 cursor-pointer justify-between *:text-terciary-foreground! max-h-[44px]'
              width='w-full'
              popoverClassName="rounded-md! shadow-none!"
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
                  propertyFilters.price_min
                    ? parseInt(propertyFilters.price_min)
                    : null
                }
                maxValue={
                  propertyFilters.price_max
                    ? parseInt(propertyFilters.price_max)
                    : null
                }
              />
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
                Property Size
              </p>
              <SizeModalDropdown
                onMaxChange={handleMaxSizeSelect}
                onMinChange={handleMinSizeSelect}
                minValue={
                  propertyFilters.size_min
                    ? parseInt(propertyFilters.size_min)
                    : null
                }
                maxValue={
                  propertyFilters.size_max
                    ? parseInt(propertyFilters.size_max)
                    : null
                }
              />
            </div>
          </div>
          <div className='flex flex-col tablet:flex-row gap-5 tablet:gap-10'>
            <FeatureQuantityOptions
              icon={<Bed size={20} />}
              label='Beds'
              options={["Any", 1, 2, 3, 4, 5]}
              value={
                propertyFilters.beds
                  ? parseInt(propertyFilters.beds.toString())
                  : undefined
              }
              onChange={handleBedsSelect}
            />
            <FeatureQuantityOptions
              icon={<Toilet size={20} />}
              label='Baths'
              options={["Any", 1, 2, 3, 4, 5]}
              value={
                propertyFilters.baths
                  ? parseInt(propertyFilters.baths.toString())
                  : undefined
              }
              onChange={handleBathsSelect}
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