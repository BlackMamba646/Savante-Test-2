"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "../shared/icons/caret-arrow";

interface FeatureQuantityProps {
  icon: React.ReactNode;
  label: string;
  options: (string | number)[];
  defaultSelectedKey?: string | number;
  onSelectionChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const FeatureQuantityDropdown = ({
  icon,
  label,
  options,
  defaultSelectedKey,
  onSelectionChange,
  placeholder,
  disabled = false,
}: FeatureQuantityProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedKey, setSelectedKey] = useState<string | number | undefined>(
    defaultSelectedKey
  );

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedValue: string | number) => {
    setSelectedKey(selectedValue);
    setIsOpen(false);
    onSelectionChange?.(selectedValue);
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
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={handleToggle}
        disabled={disabled}
        className={`min-w-[110px]  cursor-pointer py-2.5 max-h-[46px] px-4 bg-surface-container-background justify-between flex flex-row items-center gap-2 
        border-1 rounded-lg transition-colors duration-200 ${
          isOpen
            ? "border-accent-solid"
            : "border-secondary-stroke hover:border-secondary-stroke"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <figure
          className={`rounded-full p-1 bg-on-surface-background 
          overflow-hidden min-w-[24px] min-h-[24px] items-center justify-center flex ${
            selectedKey ? "" : "hidden"
          }`}
        >
          <span className={`text-[12px]`}>
            {selectedKey === "Any"
              ? "All"
              : selectedKey === 5
              ? `+${selectedKey}`
              : selectedKey || "All"}
          </span>
        </figure>
        <span className='text-[14px] leading-[180%] text-secondary-foreground'>
          {label}
        </span>
        <motion.figure
          className='text-terciary-foreground'
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={7} />
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
              type: "keyframes",
              stiffness: 500,
            }}
            className='absolute top-full left-0 mt-2 bg-surface-background flex flex-col gap-2
            outline-1 outline-secondary-stroke rounded-sm min-w-full z-[999] p-4'
          >
            <div className='flex flex-row gap-2 items-center'>
              <figure className='text-icon-secondary-button'>{icon}</figure>
              <span className='text-[14px] leading-[180%] text-secondary-foreground'>
                {label}
              </span>
            </div>
            <div className='flex flex-row gap-2'>
              {options.map((option) => (
                <button
                  type='button'
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer outline-1 outline-secondary-stroke px-4 py-2.5 rounded-md text-[14px] leading-[180%] 
                  transition-colors duration-150 ${
                    selectedKey == option
                      ? "outline-primary-stroke! bg-surface-container-background text-accent"
                      : "border-secondary-stroke bg-transparent text-terciary-foreground hover:bg-surface-container-background"
                  }`}
                >
                  {option === 5 && typeof option === "number" ? "+5" : option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
