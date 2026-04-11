"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "../shared/icons/caret-arrow";
import { FILTER_PRICE } from "@/config/constant.config";

interface PriceDropdownProps {
  defaultMinKey?: number | null;
  defaultMaxKey?: number | null;
  onMinChange?: (value: number | null) => void;
  onMaxChange?: (value: number | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const PriceDropdown = ({
  defaultMinKey,
  defaultMaxKey,
  onMinChange,
  onMaxChange,
  disabled = false,
  placeholder = "Price",
}: PriceDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinOpen, setIsMinOpen] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(defaultMinKey || null);
  const [maxValue, setMaxValue] = useState<number | null>(defaultMaxKey || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
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
      if (isOpen) {
        setIsMinOpen(false);
        setIsMaxOpen(false);
      }
    }
  };

  const toggleMinDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinOpen(!isMinOpen);
    setIsMaxOpen(false);
  };

  const toggleMaxDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaxOpen(!isMaxOpen);
    setIsMinOpen(false);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative select-none">
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`w-[110px] cursor-pointer max-h-[46px] py-2.5 px-4 bg-surface-container-background justify-center flex 
                  flex-row items-center gap-2 border-[1px] rounded-lg transition-colors duration-200 ${
                    isOpen ? "border-accent" : " border-secondary-stroke/80"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className="text-[14px] text-left leading-[180%] text-secondary-foreground whitespace-nowrap w-full truncate">
          {placeholder}
        </span>
        <motion.figure
          className="fill-terciary-foreground"
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
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className="absolute top-full left-0 mt-2 bg-surface-background flex flex-col
                      border border-secondary-stroke/80 rounded-lg w-[280px] z-[999]"
          >
            <div className="flex flex-col pt-4 min-w-full border-b-[1px] border-secondary-stroke/80">
              <span className="text-[15px] text-secondary-foreground leading-[180%] px-4 self-start">
                Min
              </span>
              <div
                onClick={toggleMinDropdown}
                className="flex flex-row min-w-full items-center gap-2 py-3 px-4 cursor-pointer
                        hover:bg-surface-container-background/50 transition-colors duration-200"
              >
                <p className="text-terciary-foreground text-[15px] leading-[180%]">
                  {minValue ? `${formatPrice(minValue)} AED` : "200,000 AED"}
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
                {isMinOpen && (
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
                    {FILTER_PRICE.map((price) => (
                      <button
                        type="button"
                        key={price.key}
                        onClick={() => handleMinSelect(price.key)}
                        className={`text-[15px] leading-[180%] cursor-pointer 
                                hover:bg-surface-container-background hover:text-accent transition-colors 
                                duration-200 w-full py-2 px-4 text-left ${
                                  minValue === price.key
                                    ? "bg-accent/10 text-accent font-medium"
                                    : "text-primary-foreground"
                                }`}
                      >
                        {price.label} AED
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col pt-4 min-w-full">
              <span className="text-[15px] text-secondary-foreground leading-[180%] self-start px-4">
                Max
              </span>
              <div
                onClick={toggleMaxDropdown}
                className="flex flex-row min-w-full items-center gap-2 py-3 px-4 cursor-pointer
                        hover:bg-surface-container-background/50 transition-colors duration-200 rounded"
              >
                <p className="text-terciary-foreground text-[15px] leading-[180%]">
                  {maxValue ? `${formatPrice(maxValue)} AED` : "26,000,000 AED"}
                </p>
                <motion.figure
                  className='fill-terciary-foreground ml-auto'
                  animate={{ rotate: isMaxOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CaretArrow size={7} />
                </motion.figure>
              </div>

              <AnimatePresence>
                {isMaxOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className='flex flex-col max-h-[200px] overflow-y-auto custom-scrollbar mt-2'
                  >
                    {FILTER_PRICE.map((price) => (
                      <button
                        type='button'
                        key={price.key}
                        onClick={() => handleMaxSelect(price.key)}
                        className={`text-[15px] leading-[180%] cursor-pointer 
                                hover:bg-surface-container-background hover:text-accent transition-colors 
                                duration-200 w-full py-2 px-4 text-left ${
                                  maxValue === price.key
                                    ? "bg-accent/10 text-accent font-medium"
                                    : "text-primary-foreground"
                                }`}
                      >
                        {price.label} AED
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};