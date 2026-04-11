import React from "react";

interface SignatureProps {
  size?: number;
}

export const Signature = ({ size = 20 }: SignatureProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11024_9807)">
        <path
          d="M1.875 13.75H18.125"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.875 17.5C1.875 17.5 10.9 2.5 6.08672 2.5C2.50547 2.5 2.46719 17.5867 10 8.13984C10 8.13984 10.6336 11.2211 12.1273 11.25C12.7305 11.2617 13.475 10.757 14.375 9.375C14.375 9.375 14.375 11.25 18.125 11.25"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11024_9807">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
