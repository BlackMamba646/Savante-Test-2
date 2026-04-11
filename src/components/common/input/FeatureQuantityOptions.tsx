"use client";
import React, { ReactNode } from "react";

interface FeatureQuantityOptionsProps {
  icon?: ReactNode;
  label?: string;
  options: (string | number)[];
  value?: number | string;
  onChange?: (value: number | string | null) => void;
}

export const FeatureQuantityOptions = ({
  icon,
  label,
  options,
  value,
  onChange,
}: FeatureQuantityOptionsProps) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      {label && (
        <p className="w-full leading-[180%] text-[15px] text-secondary-foreground flex items-center gap-2">
          {icon && <span className="fill-secondary-foreground">{icon}</span>}
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected =
            value !== undefined &&
            ((option === "Any" && value === null) ||
              option.toString() === value.toString());

          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (option === "Any") {
                  onChange?.(null);
                } else {
                  onChange?.(option);
                }
              }}
              className={`px-4 py-2 rounded-md border transition-colors ${
                isSelected
                  ? "bg-accent text-primary-foreground border-accent"
                  : "bg-white text-secondary-foreground border-primary-stroke hover:border-accent"
              }`}
            >
              {option === "Any" ? "Any" : option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
