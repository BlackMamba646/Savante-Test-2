import React from "react";

interface TargetProps {
  size?: number;
}

export const Target = ({ size = 20 }: TargetProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_20896_3159)'>
        <path
          d='M10 10L17.5 2.5'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.3035 4.69687C13.9751 3.37157 12.1976 2.59314 10.3228 2.51556C8.4479 2.43799 6.6122 3.06693 5.17883 4.27796C3.74546 5.48899 2.81883 7.1939 2.58225 9.05539C2.34567 10.9169 2.81638 12.7994 3.90125 14.3305C4.98613 15.8615 6.60614 16.9297 8.44081 17.3235C10.2755 17.7174 12.1912 17.4083 13.8089 16.4575C15.4266 15.5066 16.6285 13.9832 17.1768 12.1886C17.7251 10.3941 17.5799 8.45904 16.7699 6.7664'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.652 7.34845C12.0317 6.72887 11.2138 6.34623 10.3407 6.26704C9.4675 6.18785 8.59418 6.41711 7.8725 6.91498C7.15082 7.41285 6.6264 8.14785 6.39038 8.99224C6.15437 9.83662 6.22167 10.737 6.58061 11.5369C6.93955 12.3368 7.56742 12.9857 8.3551 13.3707C9.14278 13.7558 10.0405 13.8527 10.8922 13.6445C11.7439 13.4364 12.4957 12.9364 13.017 12.2315C13.5383 11.5266 13.7962 10.6613 13.7457 9.78595'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_20896_3159'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
