"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "../shared/icons/caret-arrow";
import { MAX_SIZES, MIN_SIZES } from "@/data/property-sizes";
import { FILTER_SIZE } from "@/config/constant.config";

interface PropertySizeDropdownProps {
  defaultMinKey?: number | null;
  defaultMaxKey?: number | null;
  onMinChange?: (value: number | null) => void;
  onMaxChange?: (value: number | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const PropertySizeDropdown = ({
  defaultMinKey,
  defaultMaxKey,
  onMinChange,
  onMaxChange,
  disabled = false,
  placeholder = "Property Size",
}: PropertySizeDropdownProps) => {
  const [isMinOpen, setIsMinOpen] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(defaultMinKey || null);
  const [maxValue, setMaxValue] = useState<number | null>(defaultMaxKey || null);

  const formatSize = (size: number) => {
    return new Intl.NumberFormat('en-AE').format(size);
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

  const toggleMinDropdown = () => {
    if (!disabled) {
      setIsMinOpen(!isMinOpen);
      setIsMaxOpen(false);
    }
  };

  const toggleMaxDropdown = () => {
    if (!disabled) {
      setIsMaxOpen(!isMaxOpen);
      setIsMinOpen(false);
    }
  };

  return (
    <div className={`flex flex-col gap-1 pt-4 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <span className="text-[15px] text-secondary-foreground leading-[180%] self-start px-4">
        {placeholder}
      </span>
      <div className="flex flex-col">
        {/* MIN Section */}
        <div className="flex flex-col flex-1 border-b-[1px] border-secondary-stroke">
          <div
            onClick={toggleMinDropdown}
            className="flex flex-row items-center gap-2 py-3 px-4 cursor-pointer
            hover:bg-surface-container-background/50 transition-colors duration-200 rounded"
          >
            <p className="text-terciary-foreground text-[15px] leading-[180%]">
              {minValue ? `${formatSize(minValue)} sqft` : "Min SQ. FT"}
            </p>
            <motion.figure 
              className="fill-terciary-foreground ml-auto"
              animate={{ rotate: isMinOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <CaretArrow size={7} />
            </motion.figure>
          </div>
          
          <AnimatePresence>
            {isMinOpen && !disabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="flex flex-col max-h-[200px] overflow-y-auto custom-scrollbar"
              >
                {FILTER_SIZE.map((size) => (
                  <button
                    type="button"
                    key={size.key}
                    onClick={() => handleMinSelect(size.key)}
                    className={`text-[15px] leading-[180%] cursor-pointer transition-colors 
                    duration-200 w-full py-2 px-4 text-left ${
                      minValue === size.key
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-primary-foreground hover:bg-surface-container-background hover:text-accent"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MAX Section */}
        <div className="flex flex-col flex-1">
          <div
            onClick={toggleMaxDropdown}
            className="flex flex-row items-center gap-2 py-3 px-4 cursor-pointer
            hover:bg-surface-container-background/50 transition-colors duration-200 rounded"
          >
            <p className="text-terciary-foreground text-[15px] leading-[180%]">
              {maxValue ? `${formatSize(maxValue)} sqft` : "Max SQ. FT"}
            </p>
            <motion.figure 
              className="fill-terciary-foreground ml-auto"
              animate={{ rotate: isMaxOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <CaretArrow size={7} />
            </motion.figure>
          </div>
          
          <AnimatePresence>
            {isMaxOpen && !disabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="flex flex-col max-h-[200px] overflow-y-auto custom-scrollbar"
              >
                {FILTER_SIZE.map((size) => (
                  <button
                    type="button"
                    key={size.key}
                    onClick={() => handleMaxSelect(size.key)}
                    className={`text-[15px] leading-[180%] cursor-pointer transition-colors 
                    duration-200 w-full py-2 px-4 text-left ${
                      maxValue === size.key
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-primary-foreground hover:bg-surface-container-background hover:text-accent"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};