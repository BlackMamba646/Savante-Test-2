"use client";

import { formatFeatures } from "@/utils/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { ENVIRONMENT } from "@/config/env.config";
import { useState, useRef, useEffect } from "react";

interface RangeCalculatorProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange"
  > {
  label?: string;
  value: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onValueChange: (value: number) => void;
  showRightLabel?: boolean;
  rightLabel?: string;
  disabled?: boolean;
}

export const RangeCalculator = ({
  label,
  value,
  minValue,
  maxValue,
  step = 1,
  onValueChange,
  showRightLabel = false,
  rightLabel,
  disabled = false,
  className,
  ...props
}: RangeCalculatorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString());
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleValueChange = (values: number[]) => {
    onValueChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(rawValue);
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue) || minValue;
    const clampedValue = Math.max(minValue, Math.min(maxValue, numValue));
    onValueChange(clampedValue);
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setInputValue(value.toString());
      setIsEditing(false);
    }
  };

  return (
    <div className={cn("flex-1 flex flex-col", className)}>
      {label && (
        <p className='text-[12px] leading-[200%] text-terciary-foreground'>
          {label}
        </p>
      )}
      <div className='flex flex-row justify-between w-full'>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className='text-primary-foreground quote-text leading-[140%] font-semibold tracking-[-0.4px] 
              bg-transparent border-b-2 border-accent-solid outline-none max-w-[200px]'
          />
        ) : (
          <span
            className='text-primary-foreground quote-text leading-[140%] font-semibold tracking-[-0.4px] 
              cursor-pointer hover:text-accent-foreground transition-colors'
            onClick={() => !disabled && setIsEditing(true)}
          >
            {formatFeatures.formatCurrency(value)}
          </span>
        )}
        {showRightLabel && rightLabel && (
          <span className='text-[22px] leading-[180%] text-primary-foreground tracking-[-0.4px]'>
            {rightLabel}
          </span>
        )}
      </div>
      <SliderPrimitive.Root
        value={[value]}
        min={minValue}
        max={maxValue}
        step={step}
        disabled={disabled}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 h-4",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className='bg-primary-stroke relative grow overflow-hidden rounded-full h-0.5 w-full'>
          <SliderPrimitive.Range className='bg-accent-solid absolute h-full' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className='border-accent block size-3 shrink-0 rounded-full
          bg-accent-solid focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50'
        />
      </SliderPrimitive.Root>
      <div className='flex flex-row justify-between w-full'>
        <span className='text-[11px] leading-[180%] uppercase text-terciary-foreground tracking-[0.6px]'>
          MIN {formatFeatures.formatCurrency(minValue)} {ENVIRONMENT.CURRENCY}
        </span>
        <span className='text-[11px] leading-[180%] uppercase text-terciary-foreground tracking-[0.6px]'>
          MAX {formatFeatures.formatCurrency(maxValue)} {ENVIRONMENT.CURRENCY}
        </span>
      </div>
    </div>
  );
};
