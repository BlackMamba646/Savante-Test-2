"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";

export interface DropdownItem {
  text: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  items: DropdownItem[];
  defaultSelectedKey?: string | number;
  onSelectionChange?: (value: string | number) => void;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
  position?: "left" | "right";
  gap?: string;
  spanWidth?: "w-auto" | "w-full";
  iconSize?: number;
  containerClassName?: string;
  popoverClassName?: string;
  labelClassName?: string;
}

export const DropdownMinimal = ({
  label,
  items,
  defaultSelectedKey,
  onSelectionChange,
  placeholder = "Select option",
  width = "w-[145px]",
  disabled = false,
  className = "",
  position = "left",
  gap = "gap-2.5",
  spanWidth = "w-auto",
  iconSize = 7,
  containerClassName = "",
  popoverClassName = "",
  labelClassName = "",
}: DropdownProps) => {
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

  const handleSelectNew = (key: string | number) => {
    setSelectedKey(key);
    setIsOpen(false);
    onSelectionChange?.(key);
  };

  const getSelectedText = () => {
    const selected = items.find((item) => item.value === selectedKey);
    return selected?.text || placeholder;
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
    <div
      className={`relative flex flex-col ${gap} ${containerClassName}`}
      ref={dropdownRef}
    >
      {label && (
        <label
          className={`text-terciary-foreground/80 text-[12px] leading-[180%] ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <button
        type='button'
        onClick={handleToggle}
        disabled={disabled}
        className={`cursor-pointer ${width} bg-white/76 h-[52px] text-shades-gray-900 text-[15px] flex flex-row items-center gap-2 hover:bg-[#FFFFFFDD] border-0 rounded-xl 
        px-6 transition-colors duration-300 ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span
          className={`text-start line-clamp-1 ${spanWidth} text-[14px] mobile:text-[15px] leading-[180%] whitespace-nowrap text-shades-gray-900`}
        >
          {getSelectedText()}
        </span>
        <motion.figure
          className='fill-[#1a1a1aee] flex-shrink-0'
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={iconSize} />
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
            className={`absolute light top-full mt-2 bg-white overflow-hidden
              border-[1px] border-secondary-stroke rounded-lg shadow-sm min-w-full z-[999] ${popoverClassName} ${
              position === "left" ? "left-0" : "right-0"
            }`}
          >
            <div className='max-h-[176px] overflow-y-auto custom-scrollbar'>
              {items.map((item) => (
                <button
                  type='button'
                  key={item.value}
                  onClick={() => handleSelectNew(item.value)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap ${
                    selectedKey === item.value
                      ? "bg-muted-foreground/40 text-accent-foreground font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
