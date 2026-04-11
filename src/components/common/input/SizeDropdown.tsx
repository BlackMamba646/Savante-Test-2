"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";

const SIZE_OPTIONS = [
  { label: "500 sqft", value: 500 },
  { label: "750 sqft", value: 750 },
  { label: "1,000 sqft", value: 1000 },
  { label: "1,250 sqft", value: 1250 },
  { label: "1,500 sqft", value: 1500 },
  { label: "2,000 sqft", value: 2000 },
  { label: "2,500 sqft", value: 2500 },
  { label: "3,000 sqft", value: 3000 },
  { label: "4,000 sqft", value: 4000 },
  { label: "5,000 sqft", value: 5000 },
];

interface SizeDropdownProps {
  defaultMinKey?: number | null;
  defaultMaxKey?: number | null;
  onMinChange?: (value: number | null) => void;
  onMaxChange?: (value: number | null) => void;
  disabled?: boolean;
  placeholder?: string;
  position?: "left" | "right";
}

export const SizeDropdown = ({
  defaultMinKey,
  defaultMaxKey,
  onMinChange,
  onMaxChange,
  disabled = false,
  placeholder = "Size",
  position = "left",
}: SizeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinOpen, setIsMinOpen] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(defaultMinKey || null);
  const [maxValue, setMaxValue] = useState<number | null>(defaultMaxKey || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatSize = (size: number) => {
    return new Intl.NumberFormat("en-AE").format(size) + " sqft";
  };

  const handleMinSelect = (value: number) => {
    setMinValue(value);
    setIsMinOpen(false);
    onMinChange?.(value);
  };

  const handleMaxSelect = (value: number) => {
    setMaxValue(value);
    setIsMaxOpen(false);
    onMaxChange?.(value);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClear = () => {
    setMinValue(null);
    setMaxValue(null);
    onMinChange?.(null);
    onMaxChange?.(null);
  };

  const getDisplayText = () => {
    if (minValue && maxValue) {
      return `${formatSize(minValue)} - ${formatSize(maxValue)}`;
    } else if (minValue) {
      return `From ${formatSize(minValue)}`;
    } else if (maxValue) {
      return `Up to ${formatSize(maxValue)}`;
    }
    return placeholder;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsMinOpen(false);
        setIsMaxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasValue = minValue !== null || maxValue !== null;

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`w-full px-4 py-3 text-left bg-white border border-primary-stroke rounded-md
          flex items-center justify-between transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-accent cursor-pointer"}
          ${isOpen ? "border-accent" : ""}`}
      >
        <span className={hasValue ? "text-primary-foreground" : "text-placeholder"}>
          {getDisplayText()}
        </span>
        <figure
          className={`fill-secondary-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <CaretArrow size={16} />
        </figure>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 w-full mt-2 bg-white border border-primary-stroke rounded-md shadow-lg ${
              position === "right" ? "right-0" : "left-0"
            }`}
          >
            <div className="p-4 flex flex-col gap-4">
              {/* Min Size */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMinOpen(!isMinOpen)}
                  className="w-full px-4 py-2 text-left bg-white border border-primary-stroke rounded-md
                    flex items-center justify-between hover:border-accent"
                >
                  <span className={minValue ? "text-primary-foreground" : "text-placeholder"}>
                    {minValue ? formatSize(minValue) : "Min Size"}
                  </span>
                  <figure
                    className={`fill-secondary-foreground transition-transform ${
                      isMinOpen ? "rotate-180" : ""
                    }`}
                  >
                    <CaretArrow size={14} />
                  </figure>
                </button>
                {isMinOpen && (
                  <div className="absolute w-full mt-1 bg-white border border-primary-stroke rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
                    {SIZE_OPTIONS.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleMinSelect(option.value)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                          minValue === option.value ? "bg-accent/10 font-medium" : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Max Size */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMaxOpen(!isMaxOpen)}
                  className="w-full px-4 py-2 text-left bg-white border border-primary-stroke rounded-md
                    flex items-center justify-between hover:border-accent"
                >
                  <span className={maxValue ? "text-primary-foreground" : "text-placeholder"}>
                    {maxValue ? formatSize(maxValue) : "Max Size"}
                  </span>
                  <figure
                    className={`fill-secondary-foreground transition-transform ${
                      isMaxOpen ? "rotate-180" : ""
                    }`}
                  >
                    <CaretArrow size={14} />
                  </figure>
                </button>
                {isMaxOpen && (
                  <div className="absolute w-full mt-1 bg-white border border-primary-stroke rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
                    {SIZE_OPTIONS.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleMaxSelect(option.value)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                          maxValue === option.value ? "bg-accent/10 font-medium" : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Button */}
              {hasValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-accent hover:text-accent-hover underline"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
