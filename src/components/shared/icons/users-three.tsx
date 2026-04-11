import React from "react";

interface UsersThreeProps {
  size?: number;
}

export const UsersThree = ({ size }: UsersThreeProps) => {
  return (
    <svg
      width={size || 20}
      height={size ? (size * 20) / 20 : 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_12727_4756)">
        <path
          d="M15 9.375C15.7278 9.37445 16.4457 9.54364 17.0967 9.86913C17.7477 10.1946 18.3138 10.6674 18.75 11.25"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.25 11.25C1.68625 10.6674 2.25234 10.1946 2.90331 9.86913C3.55429 9.54364 4.27219 9.37445 5 9.375"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14.375C11.7259 14.375 13.125 12.9759 13.125 11.25C13.125 9.52411 11.7259 8.125 10 8.125C8.27411 8.125 6.875 9.52411 6.875 11.25C6.875 12.9759 8.27411 14.375 10 14.375Z"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.625 16.875C6.07366 16.1136 6.71325 15.4825 7.48054 15.0441C8.24784 14.6056 9.11627 14.375 10 14.375C10.8837 14.375 11.7522 14.6056 12.5195 15.0441C13.2867 15.4825 13.9263 16.1136 14.375 16.875"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5781 6.25C12.695 5.79732 12.9365 5.38648 13.2751 5.06414C13.6138 4.74181 14.036 4.5209 14.4939 4.42649C14.9518 4.33209 15.427 4.36798 15.8656 4.53009C16.3041 4.6922 16.6884 4.97403 16.9748 5.34357C17.2612 5.71311 17.4382 6.15556 17.4858 6.62067C17.5333 7.08577 17.4495 7.5549 17.2439 7.97476C17.0382 8.39462 16.7189 8.7484 16.3223 8.99592C15.9256 9.24343 15.4675 9.37476 15 9.375"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.00002 9.375C4.53249 9.37476 4.0744 9.24343 3.67776 8.99592C3.28112 8.7484 2.96184 8.39462 2.75617 7.97476C2.5505 7.5549 2.46669 7.08577 2.51425 6.62067C2.56182 6.15556 2.73885 5.71311 3.02525 5.34357C3.31164 4.97403 3.69592 4.6922 4.13445 4.53009C4.57298 4.36798 5.04817 4.33209 5.50608 4.42649C5.96398 4.5209 6.38623 4.74181 6.72488 5.06414C7.06354 5.38648 7.30501 5.79732 7.4219 6.25"
          stroke="#5D5D5D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_12727_4756">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
