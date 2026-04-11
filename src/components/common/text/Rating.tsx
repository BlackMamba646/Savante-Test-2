import React from 'react';

interface RatingProps {
  rating: number;
  size?: number;
  className?: string;
  numberOfStars?: number;
}

export default function Rating({ rating, size = 20, className = "", numberOfStars = 5 }: RatingProps) {
  const clampedRating = Math.max(0, Math.min(numberOfStars, rating));

  return (
    <div className={`flex items-center gap-[0px] ${className}`}>
      {[...Array(numberOfStars)].map((_, index) => {
        const star = index + 1;
        return (
          <div key={star} className="relative" style={{ width: size, height: size }}>
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              className="absolute top-0 left-0 fill-none stroke-accent-foreground"
              strokeWidth="0.5"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              className="absolute top-0 left-0 fill-accent-foreground stroke-accent-foreground"
              strokeWidth="0.5"
              style={{
                clipPath: `inset(0 ${Math.max(0, (star - clampedRating) * 100)}% 0 0)`
              }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}