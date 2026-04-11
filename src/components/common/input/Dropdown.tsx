"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";

interface DropdownProps<T> {
  options: T[];
  onChange?: (value: T) => void;
  value?: T;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  renderOption?: (option: T) => React.ReactNode;
  getOptionKey?: (option: T) => string | number;
  getOptionLabel?: (option: T) => string;
  className?: string;
  arrowSize?: number;
  borderColor?: string;
}

export const Dropdown = <T,>({
  options,
  onChange,
  value,
  placeholder = "Select option",
  width = "w-[145px]",
  disabled = false,
  renderOption,
  getOptionKey,
  getOptionLabel,
  className = "",
  arrowSize = 14,
  borderColor = "border-secondary-stroke/80",
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: T) => {
    setIsOpen(false);
    onChange?.(optionValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`cursor-pointer ${width} ${className} w-max ${
          disabled
            ? "opacity-50 cursor-not-allowed border-secondary-stroke/40"
            : isOpen
            ? "border-accent"
            : ` ${borderColor} hover:border-secondary-stroke`
        }`}
      >
        <span
          className={`text-[14px] leading-[180%] whitespace-nowrap text-terciary-foreground`}
        >
          {(value as string) || placeholder}
        </span>
        <motion.figure
          className="fill-terciary-foreground flex-shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={arrowSize} />
        </motion.figure>
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className="absolute top-full left-0 mt-1 bg-surface-background border border-secondary-stroke/80 rounded-sm w-full z-[999] overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={
                  getOptionKey
                    ? getOptionKey(option)
                    : (option as unknown as string | number)
                }
                onClick={() => handleSelect(option)}
                className={`cursor-pointer bg-transparent px-3 py-2.5 flex min-w-full text-[14px] leading-[180%] 
                transition-colors duration-150 text-left hover:bg-surface-container-background ${
                  value === option
                    ? "bg-surface-container-background text-accent"
                    : "text-terciary-foreground"
                }`}
              >
                {renderOption
                  ? renderOption(option)
                  : getOptionLabel
                  ? getOptionLabel(option)
                  : String(option)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};