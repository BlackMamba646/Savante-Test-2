"use client";
import { cn } from "@/lib/utils";
import { Minus } from "@/components/shared/icons/minus";
import { Plus } from "@/components/shared/icons/plus";
import { useState } from "react";

interface NumberInputProps {
  state?: "default" | "disabled";
  label?: string;
  placeholder?: string;
  showSupportText?: boolean;
  valueMeasure?: string;
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export const NumberInput = ({
  state = "default",
  label,
  placeholder,
  showSupportText = false,
  valueMeasure,
  className,
  value: externalValue,
  onChange,
  min = 0,
  max,
  step = 1,
  defaultValue = 0,
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const currentValue = externalValue ?? internalValue;
  const isDisabled = state === "disabled";

  const handleValueChange = (newValue: number) => {
    let validatedValue = newValue;
    if (validatedValue < min) validatedValue = min;
    if (max !== undefined && validatedValue > max) validatedValue = max;

    if (onChange) {
      onChange(validatedValue);
    } else {
      setInternalValue(validatedValue);
    }
  };

  const handleIncrement = () => {
    if (isDisabled) return;
    handleValueChange(currentValue + step);
  };

  const handleDecrement = () => {
    if (isDisabled) return;
    handleValueChange(currentValue - step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      handleValueChange(newValue);
    } else if (e.target.value === "") {
      handleValueChange(min);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1 w-full min-w-[150px]",
        className
      )}
    >
      <label className='text-secondary text-[15px] leading-[180%] font-normal tracking-normal line-clamp-1'>
        {label}
      </label>
      <div className='flex flex-row gap-1 w-full'>
        <div
          className='flex-1 bg-surface-container-background outline-1 outline-secondary-stroke 
          flex flex-row items-center justify-between py-1 px-3 gap-2 rounded-lg'
        >
          <input
            type='number'
            placeholder={placeholder}
            value={currentValue || ""}
            onChange={handleInputChange}
            disabled={isDisabled}
            min={min}
            max={max}
            step={step}
            className='w-full text-secondary text-[15px] leading-[180%] font-normal tracking-normal
            placeholder:text-secondary-foreground/80 bg-transparent outline-none
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:cursor-not-allowed'
          />
          <span className='self-center text-terciary-foreground text-[14px] leading-[180%]'>
            {valueMeasure}
          </span>
        </div>
        <ActionButtons
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

interface ActionButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

const ActionButtons = ({
  onIncrement,
  onDecrement,
  disabled,
}: ActionButtonsProps) => {
  return (
    <div
      className='w-[70px] flex flex-row gap-0 outline-1 outline-primary-stroke rounded-[8px] overflow-hidden
      divide-x divide-primary-stroke'
    >
      <button
        type='button'
        onClick={onDecrement}
        disabled={disabled}
        className='py-2 px-2.5 hover:bg-secondary-stroke transition-colors duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
      >
        <figure className='size-[15px]'>
          <Minus />
        </figure>
      </button>
      <button
        type='button'
        onClick={onIncrement}
        disabled={disabled}
        className='py-2 px-2.5 hover:bg-secondary-stroke transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
      >
        <figure className='size-[15px]'>
          <Plus />
        </figure>
      </button>
    </div>
  );
};
