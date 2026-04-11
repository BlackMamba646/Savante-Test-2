import React from "react";

interface MapPinAreaProps {
  size?: number;
}

export const MapPinArea = ({ size }: MapPinAreaProps) => {
  return (
    <svg
      width={size ? size : 20}
      height={size ? size : 21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10048_4656)">
        <path
          d="M10 8.05127C10.6904 8.05127 11.25 7.49163 11.25 6.80127C11.25 6.11091 10.6904 5.55127 10 5.55127C9.30964 5.55127 8.75 6.11091 8.75 6.80127C8.75 7.49163 9.30964 8.05127 10 8.05127Z"
          fill="currentColor"
        />
        <path
          d="M14.375 6.80127C14.375 11.1763 10 13.6763 10 13.6763C10 13.6763 5.625 11.1763 5.625 6.80127C5.625 5.64095 6.08594 4.52815 6.90641 3.70768C7.72688 2.88721 8.83968 2.42627 10 2.42627C11.1603 2.42627 12.2731 2.88721 13.0936 3.70768C13.9141 4.52815 14.375 5.64095 14.375 6.80127Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.625 12.6716C17.1656 13.2404 18.125 14.0404 18.125 14.9263C18.125 16.6521 14.4875 18.0513 10 18.0513C5.5125 18.0513 1.875 16.6521 1.875 14.9263C1.875 14.0404 2.83438 13.2404 4.375 12.6716"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10048_4656">
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
