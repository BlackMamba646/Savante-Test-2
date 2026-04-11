import React from "react";

interface LinkedinProps {
  size?: number;
}

export const Linkedin = ({ size }: LinkedinProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
    >
      <g clipPath="url(#clip0_16710_589)">
        <path
          d="M1.92306 0.0136719C0.860348 0.0136719 0.000171932 0.875396 0 1.9357C0 2.99704 0.860176 3.85859 1.92323 3.85859C2.98337 3.85859 3.84475 2.99704 3.84475 1.9357C3.84475 0.875224 2.98319 0.0136719 1.92306 0.0136719Z"
          fill="currentColor"
        />
        <path
          d="M0.264404 5.31689H3.58046V15.986H0.264404V5.31689Z"
          fill="currentColor"
        />
        <path
          d="M12.0224 5.05176C10.4093 5.05176 9.32769 5.93618 8.88496 6.77486H8.84061V5.31705H5.66021H5.66003V15.986H8.97317V10.708C8.97317 9.31653 9.23811 7.96876 10.9633 7.96876C12.6637 7.96876 12.6864 9.56016 12.6864 10.7972V15.9858H16V10.1339C16 7.26143 15.3802 5.05176 12.0224 5.05176Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_16710_589">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
