import React from "react";

interface StarProps {
  size?: number;
}

export const Star: React.FC<StarProps> = ({ size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0.0512085L12.645 6.41063L19.5106 6.96104L14.2798 11.4418L15.8779 18.1414L10 14.5512L4.12215 18.1414L5.72025 11.4418L0.489435 6.96104L7.35497 6.41063L10 0.0512085Z"
      />
    </svg>
  );
};
