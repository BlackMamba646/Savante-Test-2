import React from "react";

interface MedalMilitaryProps {
  size?: number;
}

export const MedalMilitary = ({ size }: MedalMilitaryProps) => {
  return (
    <svg
      width={size || 20}
      height={size ? (size * 20) / 20 : 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_12727_4745)">
        <path
          d="M10 18.125C11.7259 18.125 13.125 16.7259 13.125 15C13.125 13.2741 11.7259 11.875 10 11.875C8.27411 11.875 6.875 13.2741 6.875 15C6.875 16.7259 8.27411 18.125 10 18.125Z"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 11.875L16.4625 8.9375C16.5855 8.88165 16.6899 8.79152 16.763 8.67791C16.8362 8.56429 16.8751 8.432 16.875 8.29687V4.45312C16.875 4.26664 16.8009 4.0878 16.6691 3.95594C16.5372 3.82408 16.3584 3.75 16.1719 3.75H3.82813C3.64164 3.75 3.4628 3.82408 3.33094 3.95594C3.19908 4.0878 3.125 4.26664 3.125 4.45312V8.29687C3.12493 8.432 3.1638 8.56429 3.23695 8.67791C3.31011 8.79152 3.41445 8.88165 3.5375 8.9375L10 11.875Z"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.125 3.75V10.4547"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.875 3.75V10.4547"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_12727_4745">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
