import { MagnifyingGlass } from "@/components/shared/icons/magnifying-glass";
import Image from "next/image";
import Link from "next/link";
import { ROUTING } from "@/config/constant.config";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { ENVIRONMENT } from "@/config/env.config";
import { cn } from "@/lib/utils";

interface AreaBackgroundCardProps {
  title: string;
  image: string;
  slug: string;
  index?: number;
  disableAnimation?: boolean;
  className?: string;
}

export const AreaBackgroundCard = (props: AreaBackgroundCardProps) => {
  const {
    title,
    image,
    slug,
    index = 0,
    disableAnimation = false,
    className,
  } = props;

  const content = (
    <Link
      href={`${ROUTING.PROPERTIES_BY_AREAS}/${slug}`}
      className={"relative w-auto cursor-pointer group overflow-hidden"}
      aria-label='View area details'
    >
      <Image
        src={`${ENVIRONMENT.API_URL}${image}`}
        alt={title + " image"}
        width={800}
        height={300}
        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        aria-label='View area details'
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(1014, 580)
        )}`}
      />

      {/* Gradient overlay - ensuring it's visible on all devices */}
      <div
        className='absolute inset-0 pointer-events-none z-[1] bg-black/40'
        style={{
          transform: "translate3d(0,0,0)",
          WebkitTransform: "translate3d(0,0,0)",
        }}
      />

      <div
        className='absolute inset-0 flex flex-col gap-2 tablet:items-center tablet:justify-center dark z-10 
        p-4 tablet:px-[26px] justify-between items-start'
      >
        <h3
          className='text-primary-foreground text-[16px] tablet:quote-text font-semibold tracking-[-0.4px] 
          font-plus line-clamp-2 text-start tablet:text-center drop-shadow-lg'
        >
          {title}
        </h3>
        <div className='flex flex-row gap-2 items-center'>
          <figure className='relative text-primary-foreground'>
            <MagnifyingGlass size={16} />
          </figure>
          <span
            className='hidden tablet:inline-block text-terciary-foreground text-[10px] font-medium 
          leading-[180%] tracking-[0.6px] uppercase'
          >
            Available properties
          </span>
          <span
            className='inline-block tablet:hidden text-primary-foreground text-[10px] font-medium 
          leading-[180%] tracking-[0.6px] uppercase'
          >
            Search now
          </span>
        </div>
      </div>
    </Link>
  );

  return disableAnimation ? (
    <li
      className={cn(
        "relative h-[180px] tablet:h-[250px] overflow-hidden rounded-2xl",
        className
      )}
    >
      {content}
    </li>
  ) : (
    <AnimationReveal
      y={10}
      delay={0.2 + index * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='li'
      className={cn(
        "relative h-[150px] tablet:h-[250px] overflow-hidden rounded-2xl",
        className
      )}
    >
      {content}
    </AnimationReveal>
  );
};
