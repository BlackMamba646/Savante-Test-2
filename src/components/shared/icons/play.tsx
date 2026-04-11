import React from "react";

interface PlayProps {
  size?: number;
  className?: string;
}

export const Play = ({ size = 24, className }: PlayProps) => {
  return (
    <svg
      width={size ? size * 20 : 20}
      height={size ? size * 20 : 20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`size-full ${className || ""}`}
    >
      <rect x='1' y='1' width='18' height='18' rx='9' fill='black' />
      <rect
        x='0.5'
        y='0.5'
        width='19'
        height='19'
        rx='9.5'
        stroke='white'
        strokeOpacity='0.24'
      />
      <path
        d='M13.4902 10.1832L7.98003 13.3646L7.98003 7.00192L13.4902 10.1832Z'
        fill='white'
      />
      <path
        d='M13.7402 10.6162L8.23047 13.7979L7.48047 14.2305L7.48047 6.13574L8.23047 6.56934L13.7402 9.75L14.4902 10.1836L13.7402 10.6162Z'
        stroke='white'
        strokeOpacity='0.24'
      />
    </svg>
  );
};
