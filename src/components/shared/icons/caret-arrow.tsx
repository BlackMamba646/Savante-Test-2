import React from "react";

interface CaretDownProps {
  size?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const CaretArrow = ({
  size = 12,
  direction = "down",
  className = "",
}: CaretDownProps) => {
  const getRotation = () => {
    switch (direction) {
      case "up":
        return "rotate(180deg)";
      case "left":
        return "rotate(90deg)";
      case "right":
        return "rotate(-90deg)";
      default:
        return "rotate(0deg)";
    }
  };

  return (
    <svg
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      width={size ? (size * 40) / 20 : 40}
      height={size ? (size * 40) / 20 : 40}
      viewBox='0 0 256 256'
      style={{ transform: getRotation() }}
      className={className}
    >
      <path d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'></path>
    </svg>
  );
};
