import React from "react";

interface CalendarDotProps {
  size?: number;
}

export const CalendarDot = ({ size }: CalendarDotProps) => {
  return (
    <svg
      width={size || 20}
      height={size ? size * 21/20 : 21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10048_4661)">
        <path
          d="M16.25 3.67627H3.75C3.40482 3.67627 3.125 3.95609 3.125 4.30127V16.8013C3.125 17.1464 3.40482 17.4263 3.75 17.4263H16.25C16.5952 17.4263 16.875 17.1464 16.875 16.8013V4.30127C16.875 3.95609 16.5952 3.67627 16.25 3.67627Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 2.42627V4.92627"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.25 2.42627V4.92627"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.125 7.42627H16.875"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 13.6763C10.6904 13.6763 11.25 13.1166 11.25 12.4263C11.25 11.7359 10.6904 11.1763 10 11.1763C9.30964 11.1763 8.75 11.7359 8.75 12.4263C8.75 13.1166 9.30964 13.6763 10 13.6763Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_10048_4661">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.55127)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
