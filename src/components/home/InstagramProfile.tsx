import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InstagramProfileProps {
  href: string;
  imageSrc: string;
  className?: string;
  alt: string;
  size?: number;
}

export const InstagramProfile = ({
  href,
  imageSrc,
  className,
  alt,
  size = 100,
}: InstagramProfileProps) => {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`View Instagram profile`}
      className={cn(
        "relative w-[108px] h-[108px] rounded-full p-[2px] group cursor-pointer aspect-square",
        "transition-all duration-500 ease-out",
        "shadow-[0_0_0_rgba(255,202,0,0),0_0_0_rgba(255,16,93,0),0_0_0_rgba(211,0,197,0)]",
        "hover:shadow-[0_0_8px_rgba(255,202,0,0.4),0_0_14px_rgba(255,16,93,0.3),0_0_20px_rgba(211,0,197,0.2)]",
        className
      )}
      style={{
        background: "linear-gradient(45deg, #FFCA00, #FF105D, #D300C5)",
      }}
    >
      <div className='w-full h-full rounded-full overflow-hidden bg-surface-container-background'>
        <Image
          src={imageSrc}
          alt={alt}
          width={size}
          height={size}
          className='object-cover p-[2px] rounded-full 
          will-change-transform size-full'
        />
      </div>
    </Link>
  );
};
