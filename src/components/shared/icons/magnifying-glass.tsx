import React from "react";

interface MagnifyingGlassProps {
  size?: number;
  className?: string;
}

export const MagnifyingGlass = ({ size = 20, className }: MagnifyingGlassProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.75 15.0512C12.2018 15.0512 15 12.253 15 8.80121C15 5.34943 12.2018 2.55121 8.75 2.55121C5.29822 2.55121 2.5 5.34943 2.5 8.80121C2.5 12.253 5.29822 15.0512 8.75 15.0512Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1694 13.2208L17.4999 17.5512"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
