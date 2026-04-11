"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "../shared/icons/caret-arrow";
import { MAX_PRICES, MIN_PRICES } from "@/data/prices";

interface PriceDropdownProps {
  onMinChange?: (value: number | null) => void;
  onMaxChange?: (value: number | null) => void;
  minValue?: number | null;
  maxValue?: number | null;
}

export const PriceModalDropdown = ({
  onMinChange,
  onMaxChange,
  minValue,
  maxValue,
}: PriceDropdownProps) => {
  const [isMinOpen, setIsMinOpen] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const minRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  const handleMinSelect = (value: number | null) => {
    onMinChange?.(value);
    setIsMinOpen(false);
  };

  const handleMaxSelect = (value: number | null) => {
    onMaxChange?.(value);
    setIsMaxOpen(false);
  };

  const toggleMinDropdown = () => {
    setIsMinOpen(!isMinOpen);
    setIsMaxOpen(false);
  };

  const toggleMaxDropdown = () => {
    setIsMaxOpen(!isMaxOpen);
    setIsMinOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        minRef.current &&
        !minRef.current.contains(event.target as Node) &&
        maxRef.current &&
        !maxRef.current.contains(event.target as Node)
      ) {
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
    <div className="flex flex-row gap-5">
      <div
        ref={minRef}
        className="relative flex-1 flex flex-row w-full items-center border-b-[1px] border-secondary-stroke/80 
          py-2 px-1 transition-colors duration-300 cursor-pointer"
        onClick={toggleMinDropdown}
      >
        <span className="outline-none text-[15px] leading-[180%] w-full text-terciary-foreground select-none">
          {minValue ? `${formatPrice(minValue)} AED` : "MIN"}
        </span>
        <motion.figure
          className="relative fill-terciary-foreground"
          animate={{ rotate: isMinOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={7} />
        </motion.figure>

        <AnimatePresence>
          {isMinOpen && (
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
              className="absolute bg-surface-background top-full left-0 mt-1 w-full 
                border border-secondary-stroke/80 rounded-lg z-[999] flex flex-col 
                max-h-[200px] custom-scrollbar overflow-y-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMinSelect(null);
                }}
                className="px-3 py-2.5 text-left text-[14px] text-primary-foreground hover:bg-surface-container-background hover:text-accent transition-colors duration-200"
              >
                No minimum
              </button>
              {MIN_PRICES.map((price) => (
                <button
                  key={price}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMinSelect(price);
                  }}
                  className={`px-3 py-2.5 text-left text-[14px] hover:bg-surface-container-background hover:text-accent transition-colors duration-200 ${
                    minValue === price
                      ? "bg-surface-container-background text-accent"
                      : "text-primary-foreground"
                  }`}
                >
                  {formatPrice(price)} AED
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        ref={maxRef}
        className="relative flex-1 flex flex-row w-full items-center border-b-[1px] border-secondary-stroke/80 
          py-2 px-1 transition-colors duration-300 cursor-pointer"
        onClick={toggleMaxDropdown}
      >
        <span className="outline-none text-[15px] leading-[180%] w-full text-terciary-foreground select-none">
          {maxValue ? `${formatPrice(maxValue)} AED` : "MAX"}
        </span>
        <motion.figure
          className="relative fill-terciary-foreground"
          animate={{ rotate: isMaxOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={7} />
        </motion.figure>

        <AnimatePresence>
          {isMaxOpen && (
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
              className="absolute bg-surface-background top-full left-0 mt-1 w-full 
                border border-secondary-stroke/80 rounded-lg z-[999] flex flex-col 
                max-h-[200px] custom-scrollbar overflow-y-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMaxSelect(null);
                }}
                className="px-3 py-2.5 text-left text-[14px] text-primary-foreground hover:bg-surface-container-background hover:text-accent transition-colors duration-200"
              >
                No maximum
              </button>
              {MAX_PRICES.map((price) => (
                <button
                  key={price}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMaxSelect(price);
                  }}
                  className={`px-3 py-2.5 text-left text-[14px] hover:bg-surface-container-background hover:text-accent transition-colors duration-200 ${
                    maxValue === price
                      ? "bg-surface-container-background text-accent"
                      : "text-primary-foreground"
                  }`}
                >
                  {formatPrice(price)} AED
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};