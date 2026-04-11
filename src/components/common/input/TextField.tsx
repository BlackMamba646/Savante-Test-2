"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "disabled" | "className"
  > {
  state?: "default" | "disabled";
  label?: string;
  placeholder?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  iconSize?: number;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      state = "default",
      label,
      placeholder,
      showIcon = false,
      icon,
      iconSize = 20,
      hasError = false,
      errorMessage,
      className,
      containerClassName,
      labelClassName,
      inputClassName,
      id,
      name,
      type = "text",
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = state === "disabled" || disabled;

    const inputId = id || name || `textfield-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputClasses = cn(
      "indent-0 outline-none text-[15px] leading-[180%] w-full text-terciary-foreground",
      "placeholder:text-terciary-foreground/80",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      inputClassName
    );

    return (
      <div className={cn("flex-1 flex flex-col gap-1", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-secondary-foreground text-[15px]",
              labelClassName
            )}
          >
            {label}{" "}
            {hasError && (
              <span className="text-red-500 text-xs">*</span>
            )}
          </label>
        )}

        {showIcon && icon ? (
          <div
            className={cn(
              "flex flex-row gap-2 border-b-[1px] items-center py-2 px-1 transition-colors duration-300",
              hasError
                ? "border-red-500"
                : "border-primary-stroke",
              "focus-within:border-accent-foreground",
              isDisabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <figure className="relative text-accent-foreground pointer-events-none">
              {React.isValidElement(icon) && iconSize
                ? React.cloneElement(icon as React.ReactElement<any>, {
                    size: iconSize,
                  })
                : icon}
            </figure>
            <input
              ref={ref}
              type={type}
              id={inputId}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              className={baseInputClasses}
              {...props}
            />
          </div>
        ) : (
          <input
            ref={ref}
            type={type}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            className={cn(
              "border-b-[1px] indent-0 py-2 px-1 transition-colors duration-300",
              "text-terciary-foreground placeholder:text-terciary-foreground/80",
              "outline-none text-[15px] leading-[180%]",
              "focus:border-accent-foreground",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError ? "border-red-500" : "border-primary-stroke",
              className,
              inputClassName
            )}
            {...props}
          />
        )}

        {hasError && errorMessage && (
          <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
