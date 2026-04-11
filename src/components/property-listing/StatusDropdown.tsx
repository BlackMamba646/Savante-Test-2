"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "../shared/icons/caret-arrow";

interface StatusDropdownProps {
  defaultSelectedKey?: string | null;
  onSelectionChange?: (value: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

const STATUS_OPTIONS = [
  { value: "completed", label: "Ready to Move In" },
  { value: "under-construction", label: "Under Construction" },
  { value: "off-plan", label: "Off Plan" },
  { value: "renovation", label: "Under Renovation" },
];

export const StatusDropdown = ({
  defaultSelectedKey,
  onSelectionChange,
  disabled = false,
  placeholder = "Completion Status",
}: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(defaultSelectedKey || null);

  const handleSelect = (value: string) => {
    setSelectedKey(value);
    setIsOpen(false);
    onSelectionChange?.(value);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const getDisplayText = () => {
    if (selectedKey) {
      const option = STATUS_OPTIONS.find(opt => opt.value === selectedKey);
      return option ? option.label : placeholder;
    }
    return placeholder;
  };

  return (
    <div className={`flex flex-col pt-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <span className="text-[15px] text-secondary-foreground leading-[180%] self-start px-4">
        {placeholder}
      </span>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className="flex flex-row items-center gap-2 py-3 px-4 cursor-pointer
                  hover:bg-surface-container-background/50 transition-colors duration-200 rounded disabled:cursor-not-allowed"
      >
        <p className="text-terciary-foreground text-[15px] leading-[180%]">
          {getDisplayText()}
        </p>
        <motion.figure 
          className="fill-terciary-foreground ml-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={7} />
        </motion.figure>
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="flex flex-col max-h-[200px] overflow-y-auto scrollbar-hide"
          >
            {STATUS_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`text-[15px] leading-[180%] cursor-pointer transition-colors 
                          duration-200 w-full py-2 px-4 text-left ${
                  selectedKey === option.value
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-primary-foreground hover:bg-surface-container-background hover:text-accent"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};