import { ROUTING } from "@/config/constant.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export enum OPERATION_TYPES_VALUES {
  BUY = "sale",
  RENT = "rent",
  LIST = "list",
}

interface TabsProps {
  currentOperation: OPERATION_TYPES_VALUES;
  onChangeOperation: (operation: OPERATION_TYPES_VALUES) => void;
  className?: string;
}

export const Tabs = ({
  currentOperation,
  onChangeOperation,
  className,
}: TabsProps) => {
  return (
    <div
      className={cn(
        className,
        "flex-row gap-0 pr-5 items-center justify-center"
      )}
    >
      <button
        type='button'
        onClick={() => onChangeOperation(OPERATION_TYPES_VALUES.BUY)}
        className='flex flex-col px-3 pt-3 pb-0 gap-3 items-center relative group'
      >
        <p
          className={`text-[12px] font-medium leading-[180%] tracking-[0.96px] uppercase
            transition-colors duration-300 ${
              currentOperation === OPERATION_TYPES_VALUES.BUY
                ? "text-primary-foreground"
                : "text-primary-foreground/60"
            }`}
        >
          Buy
        </p>
        <div
          className={`h-[1px] bg-accent-solid transition-all duration-300 ease-out ${
            currentOperation === OPERATION_TYPES_VALUES.BUY
              ? "w-[16px] opacity-100"
              : "w-0 opacity-0"
          }`}
        ></div>
      </button>
      <button
        type='button'
        onClick={() => onChangeOperation(OPERATION_TYPES_VALUES.RENT)}
        className='flex flex-col px-3 pt-3 pb-0 gap-3 items-center relative group'
      >
        <p
          className={`text-[12px] font-medium leading-[180%] tracking-[0.96px] uppercase
            transition-colors duration-300 ${
              currentOperation === OPERATION_TYPES_VALUES.RENT
                ? "text-primary-foreground"
                : "text-primary-foreground/60"
            }`}
        >
          Rent
        </p>
        <div
          className={`h-[1px] bg-accent-solid transition-all duration-300 ease-out ${
            currentOperation === OPERATION_TYPES_VALUES.RENT
              ? "w-[16px] opacity-100"
              : "w-0 opacity-0"
          }`}
        ></div>
      </button>
      <Link
        href={ROUTING.LIST_YOUR_PROPERTY}
        role='button'
        onClick={() => onChangeOperation(OPERATION_TYPES_VALUES.LIST)}
        className='flex flex-col px-3 pt-3 pb-0 gap-3 items-center relative group tablet:hidden'
      >
        <p
          className={`text-[12px] font-medium leading-[180%] tracking-[0.96px] uppercase
            transition-colors duration-300 ${
              currentOperation === OPERATION_TYPES_VALUES.LIST
                ? "text-primary-foreground"
                : "text-primary-foreground/60"
            }`}
        >
          List
        </p>
        <div
          className={`h-[1px] bg-accent-solid transition-all duration-300 ease-out ${
            currentOperation === OPERATION_TYPES_VALUES.LIST
              ? "w-[16px] opacity-100"
              : "w-0 opacity-0"
          }`}
        ></div>
      </Link>
    </div>
  );
};
