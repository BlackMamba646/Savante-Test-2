import { ROUTING } from "@/config/constant.config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TabsProps {
  className?: string;
}

export const Tabs = ({ className }: TabsProps) => {
  const pathname = usePathname();

  return (
    <div className={`${className}`}>
      <Link
        href={ROUTING.FOR_SALE}
        className={`cursor-pointer py-2.5 px-5 text-[14px] leading-[180%] ease-in-out 
          transition-colors duration-200 rounded-xl ${
            pathname === ROUTING.FOR_SALE
              ? "bg-accent-solid text-text-primary-button"
              : "bg-surface-container-background text-terciary-foreground hover:text-secondary-foreground"
          }`}
      >
        Buy
      </Link>
      <Link
        href={ROUTING.FOR_RENT}
        className={`cursor-pointer py-2.5 px-5 text-[14px] leading-[180%] ease-in-out 
          transition-colors duration-200 rounded-xl ${
            pathname === ROUTING.FOR_RENT
              ? "bg-accent-solid text-text-primary-button"
              : "bg-surface-container-background text-terciary-foreground hover:text-secondary-foreground"
          }`}
      >
        Rent
      </Link>
    </div>
  );
};
