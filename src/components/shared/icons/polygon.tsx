import React from "react";

interface PolygonProps {
  size?: number;
}

export const Polygon = ({ size = 20 }: PolygonProps) => {
  return (
    <svg
      width={size}
      height={size + 1}
      viewBox={`0 0 ${size} ${size + 2}`}
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10567_735)">
        <path
          d="M9.375 6.17627C10.4105 6.17627 11.25 5.3368 11.25 4.30127C11.25 3.26574 10.4105 2.42627 9.375 2.42627C8.33947 2.42627 7.5 3.26574 7.5 4.30127C7.5 5.3368 8.33947 6.17627 9.375 6.17627Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.125 11.8013C4.16053 11.8013 5 10.9618 5 9.92627C5 8.89074 4.16053 8.05127 3.125 8.05127C2.08947 8.05127 1.25 8.89074 1.25 9.92627C1.25 10.9618 2.08947 11.8013 3.125 11.8013Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 18.6763C13.5355 18.6763 14.375 17.8368 14.375 16.8013C14.375 15.7657 13.5355 14.9263 12.5 14.9263C11.4645 14.9263 10.625 15.7657 10.625 16.8013C10.625 17.8368 11.4645 18.6763 12.5 18.6763Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.25 8.05127C17.2855 8.05127 18.125 7.2118 18.125 6.17627C18.125 5.14074 17.2855 4.30127 16.25 4.30127C15.2145 4.30127 14.375 5.14074 14.375 6.17627C14.375 7.2118 15.2145 8.05127 16.25 8.05127Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4414 5.68325L11.1836 4.79419"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.9813 5.55591L4.5188 8.67153"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.63745 11.0349L10.9875 15.6927"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.1243 15.0326L15.6258 7.94507"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10567_735">
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
