import Image from "next/image";
import Rating from "./Rating";
import { GoogleLogo } from "@/components/shared/icons/logo/google-logo";

type Size = "small" | "medium" | "big";

interface TrustCounterProps {
  rating?: number;
  size?: Size;
  reviewerName?: string;
  className?: string;
}

export const TrustCounter = ({
  rating,
  size = "medium",
  reviewerName = "Seyi Adeyemi",
  className,
}: TrustCounterProps) => {
  return (
    <div
      className={`flex ${
        size === "big" ? "flex-col" : "flex-row"
      } items-start justify-start gap-3 ${className}`}
    >
      <div className='flex flex-row gap-1 items-center'>
        <p className='font-geist leading-[100%] text-secondary-foreground text-[15px] 
        tablet:text-[15px] font-medium laptop:translate-y-[-1px]'>
          {rating?.toFixed(1) ?? "5.0"}
        </p>
        <Rating rating={rating ?? 5} size={16} className='flex' />
      </div>
      <div className='flex flex-row gap-1.5 items-center'>
        {size === "big" ? (
          <p className='leading-[100%] text-secondary text-[14px] italic font-crimson opacity-80'>
            Review by {reviewerName}
          </p>
        ) : (
          <p className='leading-[100%] text-secondary text-[14px] italic font-crimson opacity-80'>
            Reviews on
          </p>
        )}
        <figure className='py-[2px] text-accent-foreground'>
          <GoogleLogo />
        </figure>
      </div>
    </div>
  );
};
