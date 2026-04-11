import React from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "disabled" | "className"
  > {
  state?: "default" | "disabled";
  label?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  disabled?: boolean;
  rows?: number;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      state = "default",
      label,
      placeholder,
      hasError = false,
      errorMessage,
      className,
      containerClassName,
      labelClassName,
      textareaClassName,
      id,
      name,
      value,
      onChange,
      disabled,
      rows,
      ...props
    },
    ref
  ) => {
    const isDisabled = state === "disabled" || disabled;

    const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("flex-1 flex flex-col gap-1", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          rows={rows}
          className={cn(
            "border-b-[1px] indent-0 py-2 px-1 transition-colors duration-300",
            "text-terciary-foreground placeholder:text-terciary-foreground/80",
            "outline-none text-[15px] leading-[180%]",
            "focus:border-accent-foreground",
            "field-sizing-content resize-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError ? "border-red-500" : "border-primary-stroke",
            className,
            textareaClassName
          )}
          {...props}
        />

        {hasError && errorMessage && (
          <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

