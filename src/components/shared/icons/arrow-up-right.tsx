import React from "react";

interface ArrowUpRightProps {
  size?: number;
  className?: string;
}

export const ArrowUpRight = ({ size = 18, className }: ArrowUpRightProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='currentColor'
      viewBox='0 0 256 256'
      className={className}
    >
      <path d='M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z'></path>
    </svg>
  );
};
