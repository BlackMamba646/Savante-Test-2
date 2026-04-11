"use client";
import React, { ChangeEvent, useId, useState, useRef, useEffect, useMemo } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Phone } from "@/components/shared/icons/phone";
import { formatPhoneNumber, getPhonePlaceholder } from "@/utils/phone-format";
import { PHONE_TYPES } from "@/utils/phone-types";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";

export interface PhoneFieldProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCountryCodeChange?: (countryCode: string) => void;
  state?: "default" | "disabled";
  hasError?: boolean;
  errorMessage?: string;
  defaultCountryCode?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const COUNTRIES_TO_LOAD = 10;

export const PhoneField = React.forwardRef<HTMLInputElement, PhoneFieldProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      value,
      onChange,
      onCountryCodeChange,
      state = "default",
      hasError = false,
      errorMessage,
      defaultCountryCode = "+971",
      className,
      containerClassName,
      labelClassName,
      inputClassName,
      disabled,
    },
    ref
  ) => {
    const isDisabled = state === "disabled" || disabled;
    const [open, setOpen] = useState(false);
    // Encontrar el país inicial por código para obtener su nombre
    const initialCountryName = PHONE_TYPES.find(
      (c) => c.value === defaultCountryCode
    )?.name || "United Arab Emirates";
    
    const [selectedCountryName, setSelectedCountryName] = useState(initialCountryName);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(COUNTRIES_TO_LOAD);
    const comboboxId = useId();
    const phoneId = id || name || `phonefield-${comboboxId}`;
    const observerTarget = useRef<HTMLDivElement>(null);

    const selectedCountry = PHONE_TYPES.find(
      (country) => country.name === selectedCountryName
    );

    const filteredCountries = useMemo(() => {
      if (!searchQuery.trim()) return PHONE_TYPES;
      const query = searchQuery.toLowerCase();
      return PHONE_TYPES.filter(
        (country) =>
          country.value.toLowerCase().includes(query) ||
          country.name.toLowerCase().includes(query)
      );
    }, [searchQuery]);

    const visibleCountries = useMemo(() => {
      return filteredCountries.slice(0, visibleCount);
    }, [filteredCountries, visibleCount]);

    useEffect(() => {
      if (!open || visibleCount >= filteredCountries.length) return;

      let observer: IntersectionObserver | null = null;

      const timeoutId = setTimeout(() => {
        const currentTarget = observerTarget.current;
        if (!currentTarget) return;
        let scrollContainer: Element | null = currentTarget.closest('[data-slot="command-list"]');
        
        if (!scrollContainer) {
          let parent: Element | null = currentTarget.parentElement;
          while (parent) {
            const style = window.getComputedStyle(parent);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
              scrollContainer = parent;
              break;
            }
            parent = parent.parentElement;
          }
        }

        observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              setVisibleCount((prev) => Math.min(prev + COUNTRIES_TO_LOAD, filteredCountries.length));
            }
          },
          {
            root: scrollContainer,
            rootMargin: "50px",
            threshold: 0.1,
          }
        );

        observer.observe(currentTarget);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (observer) {
          observer.disconnect();
        }
      };
    }, [open, visibleCount, filteredCountries.length]);

    // Resetear contador cuando cambia la búsqueda o se abre el popover
    useEffect(() => {
      if (open) {
        setVisibleCount(COUNTRIES_TO_LOAD);
      }
    }, [open, searchQuery]);

    const handleCountrySelect = (countryName: string, countryCode: string) => {
      setSelectedCountryName(countryName);
      setOpen(false);
      /* setSearchQuery(""); */
      if (onCountryCodeChange) {
        onCountryCodeChange(countryCode);
      }
    };

    const handlePhoneInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const countryCode = selectedCountry?.value || defaultCountryCode;
      const formatted = formatPhoneNumber(e.target.value, countryCode);
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formatted },
      } as ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    };

    const MemoizedCommandItem = React.memo(CommandItem);

    return (
      <div className={cn("flex-1 flex flex-col gap-1", containerClassName)}>
        {label && (
          <label
            htmlFor={phoneId}
            className={cn(
              "text-secondary-foreground text-[15px]",
              labelClassName
            )}
          >
            {label}{" "}
            {hasError && <span className='text-red-500 text-xs'>*</span>}
          </label>
        )}

        <div
          className={cn(
            "flex flex-row gap-2 border-b-[1px] items-center py-2 transition-colors duration-300",
            hasError ? "border-red-500" : "border-primary-stroke",
            "focus-within:border-accent-foreground",
            isDisabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild tabIndex={-1}>
              <button
                type='button'
                role='combobox'
                aria-expanded={open}
                aria-controls='country-options'
                disabled={isDisabled}
                className={cn(
                  "flex flex-row gap-1 items-center w-max pl-1 pr-2 border-r border-primary-stroke cursor-pointer transition-colors outline-none",
                  isDisabled && "cursor-not-allowed opacity-50"
                )}
              >
                {selectedCountry && (
                  <figure className='relative size-4.5 self-center'>
                    <selectedCountry.icon />
                  </figure>
                )}
                <span className='text-terciary-foreground leading-[160%] text-[14px] font-montserrat pl-1 whitespace-nowrap'>
                  {selectedCountry?.value || defaultCountryCode}
                </span>
                <figure
                  className={cn(
                    "relative text-terciary-foreground transition-transform duration-300",
                    open ? "rotate-180" : "rotate-0"
                  )}
                >
                  <CaretArrow direction='down' size={7} />
                </figure>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[230px] p-0 border-primary-stroke **:border-primary-stroke bg-white relative z-9999'
              align='start'
              side='bottom'
              sideOffset={10}
              avoidCollisions={false}
            >
              <Command shouldFilter={false}>
                <CommandInput 
                  placeholder='Search countries...' 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList id="country-options" className="max-h-[175px]">
                  {filteredCountries.length === 0 ? (
                    <CommandEmpty>No country found.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {visibleCountries.map((country) => {
                        const CountryIcon = country.icon;
                        return (
                          <MemoizedCommandItem
                            key={country.name}
                            value={`${country.value} ${country.name}`}
                            onSelect={() => {
                              handleCountrySelect(country.name, country.value);
                            }}
                            className={cn(
                              "flex items-center justify-between gap-3 whitespace-nowrap px-2 py-3 cursor-pointer",
                              selectedCountryName === country.name
                                ? "bg-background-primary-button **:text-text-primary-button font-medium"
                                : "hover:bg-on-surface-background! bg-white! hover:text-text-primary-button"
                            )}
                          >
                            <div className='flex items-center gap-2.5'>
                              <figure className='size-4 flex-shrink-0'>
                                <CountryIcon />
                              </figure>
                              <span className='text-[13px] text-terciary-foreground'>
                                {country.value}
                              </span>
                              <small className='text-terciary-foreground line-clamp-1'>
                                {country.name}
                              </small>
                            </div>
                          </MemoizedCommandItem>
                        );
                      })}
                      {visibleCount < filteredCountries.length && (
                        <div
                          ref={observerTarget}
                          className="flex items-center justify-center py-2"
                          style={{ minHeight: '20px' }}
                          aria-hidden="true"
                        />
                      )}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Input de teléfono */}
          <div className='flex flex-row gap-1 items-center w-full'>
            <figure className='phone-icon relative text-accent-foreground pointer-events-none'>
              <Phone size={20} />
            </figure>
            <input
              ref={ref}
              type='tel'
              id={phoneId}
              name={name}
              placeholder={
                placeholder || getPhonePlaceholder(selectedCountry?.value || defaultCountryCode)
              }
              value={value}
              onChange={handlePhoneInputChange}
              disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              className={cn(
                "outline-none text-[15px] leading-[180%] indent-0.5 w-full text-terciary-foreground placeholder:text-terciary-foreground/80",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                inputClassName
              )}
            />
            {/* Campo hidden para el código de país */}
            <input
              type='hidden'
              name='countryCode'
              value={selectedCountry?.value || defaultCountryCode}
            />
          </div>
        </div>

        {hasError && errorMessage && (
          <span className='text-red-500 text-xs mt-1'>{errorMessage}</span>
        )}
      </div>
    );
  }
);

PhoneField.displayName = "PhoneField";
