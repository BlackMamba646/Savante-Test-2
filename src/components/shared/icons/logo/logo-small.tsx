import React from "react";

interface LogoSmallProps {
  size?: number;
  isDark?: boolean;
}

export const LogoSmall = ({ size = 29, isDark = false }: LogoSmallProps) => {
  if (isDark) {
    return (
      <svg
        width={size}
        height={(40 / 29) * size}
        viewBox="0 0 29 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_12082_38681"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="29"
          height="40"
        >
          <rect width="28.0106" height="40" fill="#E4EDFF" />
        </mask>
        <g mask="url(#mask0_12082_38681)">
          <rect width="28.0106" height="40" fill="#001489" />
          <path
            d="M23.9255 24.9873C24.509 23.7141 24.0846 23.1836 22.5992 23.1836C16.9228 23.1836 4.14828 31.6717 3.97852 35.2791C3.97853 38.6213 13.8992 37.5603 14.6947 39.3109C14.9071 39.5762 11.1087 42.2393 9.28376 41.6451"
            stroke="white"
            strokeWidth="0.62069"
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={(40 / 29) * size}
      viewBox="0 0 29 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_12069_35648"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="29"
        height="40"
      >
        <rect width="28.0106" height="40" fill="#E4EDFF" />
      </mask>
      <g mask="url(#mask0_12069_35648)">
        <rect width="28.0106" height="40" fill="white" />
        <path
          d="M23.9235 24.9868C24.5071 23.7136 24.0827 23.1831 22.5972 23.1831C16.9209 23.1831 4.14632 31.6712 3.97656 35.2786C3.97658 38.6208 13.8972 37.5598 14.6927 39.3104C14.9051 39.5757 11.1067 42.2388 9.28181 41.6446"
          stroke="black"
          strokeWidth="0.62069"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};