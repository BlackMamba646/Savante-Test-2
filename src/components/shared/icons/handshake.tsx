import React from "react";

interface HandshakeProps {
  size?: number;
}

export const Handshake = ({ size = 20 }: HandshakeProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_20896_3202)'>
        <path
          d='M15.625 11.875L12.5 15L7.5 13.75L3.125 10.625'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5.67773 5.51797L9.99961 4.375L14.3215 5.51797'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2.68476 4.72035L0.691006 8.70941C0.61691 8.85757 0.604666 9.02909 0.656963 9.18627C0.70926 9.34346 0.821822 9.47345 0.969913 9.54769L3.1246 10.625L5.67773 5.518L3.52382 4.44144C3.45042 4.40463 3.37048 4.38264 3.28858 4.37674C3.20668 4.37084 3.12442 4.38113 3.04649 4.40703C2.96857 4.43293 2.89652 4.47393 2.83445 4.52769C2.77238 4.58145 2.72151 4.64692 2.68476 4.72035Z'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.8754 10.625L19.0301 9.54769C19.1782 9.47345 19.2907 9.34346 19.343 9.18627C19.3953 9.02909 19.3831 8.85757 19.309 8.70941L17.3152 4.72035C17.2785 4.64692 17.2276 4.58145 17.1655 4.52769C17.1035 4.47393 17.0314 4.43293 16.9535 4.40703C16.8756 4.38113 16.7933 4.37084 16.7114 4.37674C16.6295 4.38264 16.5496 4.40463 16.4762 4.44144L14.3223 5.518L16.8754 10.625Z'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.3754 5.625H11.2504L7.68317 9.08516C7.61686 9.15144 7.5663 9.23179 7.53526 9.32026C7.50421 9.40872 7.49347 9.50305 7.50382 9.59623C7.51418 9.68941 7.54536 9.77908 7.59507 9.85857C7.64478 9.93807 7.71174 10.0054 7.79098 10.0555C9.15895 10.9297 11.016 10.8695 12.5004 9.375L15.6254 11.875L16.8754 10.625'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.69219 16.875L6.43281 16.0602L4.375 14.5898'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_20896_3202'>
          <rect width={size} height={size} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
