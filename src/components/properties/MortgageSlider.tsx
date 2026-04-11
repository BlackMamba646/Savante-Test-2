"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface MortgageSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {}

export function MortgageSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: MortgageSliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 h-4",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="bg-primary-stroke relative grow overflow-hidden rounded-full h-0.5 w-full">
        <SliderPrimitive.Range className="bg-accent-foreground absolute h-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="border-accent block size-4 shrink-0 rounded-full
          bg-accent-foreground focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}