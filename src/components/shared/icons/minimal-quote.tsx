import React from "react";

interface MinimalQuoteProps {
  size?: number;
}

export const MinimalQuote = ({ size = 32 }: MinimalQuoteProps) => {
   return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className="size-full"
    >
      <path
        d='M25.3559 26C21.017 26 18.4407 22.6984 18.4407 18.1587C18.4407 11.5556 23.1864 3.43915 26.4407 0L27.7966 0.275129C26.1695 2.33862 24.9492 5.77778 24.9492 8.5291C24.9492 13.619 32 11.8307 32 19.2593C32 23.5238 28.7458 26 25.3559 26ZM0 18.1587C0 11.5556 4.74576 3.43915 8 0L9.35593 0.275129C7.72881 2.33862 6.64407 5.77778 6.64407 8.5291C6.64407 13.619 13.5593 11.8307 13.5593 19.2593C13.5593 23.5238 10.3051 26 6.91525 26C2.71186 26 0 22.6984 0 18.1587Z'
        fill='currentColor'
      />
    </svg>
  );
};
