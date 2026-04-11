import React from "react";

interface FacebookProps {
  size?: number;
}

export const Facebook = ({ size }: FacebookProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
    >
      <g clipPath="url(#clip0_16710_567)">
        <path
          d="M12.1544 2.65589L10.6483 2.65655C9.46744 2.65655 9.23881 3.21772 9.23881 4.04128V5.85715H12.0552L12.0542 8.70143H9.23881V16H6.30126V8.70143H3.8454V5.85715H6.30126V3.75978C6.30126 1.32553 7.78824 0 9.95977 0L12.1546 0.00349174L12.1544 2.65589Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_16710_567">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
