import React from "react";

interface SparkleProps {
  size?: number;
}

export const Sparkle = ({ size = 20 }: SparkleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_13001_14037)">
        <path
          d="M6.5834 13.4162L2.27949 11.8303C2.16082 11.7865 2.05842 11.7073 1.9861 11.6036C1.91377 11.4998 1.875 11.3763 1.875 11.2498C1.875 11.1233 1.91377 10.9998 1.9861 10.8961C2.05842 10.7923 2.16082 10.7131 2.27949 10.6693L6.5834 9.0834L8.16933 4.77949C8.21314 4.66082 8.29226 4.55842 8.39605 4.4861C8.49984 4.41377 8.6233 4.375 8.7498 4.375C8.8763 4.375 8.99976 4.41377 9.10355 4.4861C9.20734 4.55842 9.28647 4.66082 9.33027 4.77949L10.9162 9.0834L15.2201 10.6693C15.3388 10.7131 15.4412 10.7923 15.5135 10.8961C15.5858 10.9998 15.6246 11.1233 15.6246 11.2498C15.6246 11.3763 15.5858 11.4998 15.5135 11.6036C15.4412 11.7073 15.3388 11.7865 15.2201 11.8303L10.9162 13.4162L9.33027 17.7201C9.28647 17.8388 9.20734 17.9412 9.10355 18.0135C8.99976 18.0858 8.8763 18.1246 8.7498 18.1246C8.6233 18.1246 8.49984 18.0858 8.39605 18.0135C8.29226 17.9412 8.21314 17.8388 8.16933 17.7201L6.5834 13.4162Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 1.25V5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 5.625V8.125"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.875 3.125H15.625"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.25 6.875H18.75"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_13001_14037">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
