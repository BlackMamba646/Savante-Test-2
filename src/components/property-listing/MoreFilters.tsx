"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretArrow } from "../shared/icons/caret-arrow";
import { FadersHorizontal } from "../shared/icons/faders-horizontal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next/app";
import { PropertySizeDropdown } from "./PropertySizeDropdown";

export const MoreFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMinSizeChange = (value: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      params.set("size_min", String(value));
    } else {
      params.delete("size_min");
    }

    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handleMaxSizeChange = (value: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null) {
      params.set("size_max", String(value));
    } else {
      params.delete("size_max");
    }

    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
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
      <div
        onClick={toggleDropdown}
        className={`cursor-pointer max-h-[46px] py-2.5 px-4 bg-transparent justify-center flex flex-row
          items-center gap-2 border-[1px] rounded-lg ${
            isOpen ? "border-accent" : "border-secondary-stroke/80"
          }`}
      >
        <figure className='fill-accent'>
          <FadersHorizontal size={18} />
        </figure>
        <span className='text-[14px] leading-[180%] text-terciary-foreground whitespace-nowrap'>
          More Filters
        </span>
        <motion.figure
          className='fill-terciary-foreground'
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretArrow size={7} />
        </motion.figure>
      </div>

      <AnimatePresence>
        {isOpen && (
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
            className='absolute top-full -left-36 mt-2 bg-surface-background flex flex-col
                      border border-secondary-stroke rounded-lg w-[299px] z-[999]'
          >
            <PropertySizeDropdown
              key={`size-${searchParams.get("size_min") || "default"}`}
              defaultMinKey={
                searchParams.get("size_min")
                  ? Number(searchParams.get("size_min"))
                  : null
              }
              defaultMaxKey={
                searchParams.get("size_max")
                  ? Number(searchParams.get("size_max"))
                  : null
              }
              onMinChange={handleMinSizeChange}
              onMaxChange={handleMaxSizeChange}
              placeholder="Property Size"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};