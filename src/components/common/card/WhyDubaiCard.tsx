import { AnimationReveal } from "@/components/ui/animation-reveal";
import { cn } from "@/lib/utils";
import { shimmer, toBase64 } from "@/utils/image-loader";
import Image from "next/image";

interface WhyDubaiCardProps {
  title: string;
  description: string;
  image: string;
  direction: "left" | "right";
  className?: string;
  index: number;
}

export const WhyDubaiCard = ({
  title,
  description,
  image,
  direction = "left",
  className,
  index,
}: WhyDubaiCardProps) => {
  return (
    <AnimationReveal
      x={0}
      y={0}
      delay={0.4 + (index * 0.2)}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='li'
      className={cn(
        "flex gap-2.5 laptop:gap-4 items-center ",
        direction === "left"
          ? "flex-col-reverse tablet:flex-row-reverse self-start tablet:self-end"
          : "flex-col-reverse tablet:flex-row self-start",
        className
      )}
    >
      <div
        className={`flex flex-col gap-4 tablet:gap-[14px] py-2.5 tablet:py-5 max-w-[400px] 
          border-y-[0px] tablet:border-y-[1px] border-primary-stroke ${
            direction === "left"
              ? "tablet:border-l-[1px] border-r-transparent rounded-tl-full rounded-bl-full pr-2.5 pl-0 tablet:pr-4 tablet:pl-10"
              : "tablet:border-r-[1px] border-l-transparent rounded-tr-full rounded-br-full pr-2.5 pl-0 tablet:pr-4 tablet:pl-10"
          }`}
      >
        <p
          className='text-primary-foreground quote-text font-semibold capitalize 
        leading-[140%] tracking-[-0.4px]'
        >
          {title}
        </p>
        <p className='text-terciary-foreground text-[15px] leading-[180%]'>
          {description}
        </p>
      </div>
      <figure
        className='relative tablet:w-[138px] tablet:h-[138px] w-[80px] h-[80px] rounded-full overflow-hidden
      self-start tablet:self-auto'
      >
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover'
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(138, 138)
          )}`}
        />
      </figure>
    </AnimationReveal>
  );
};
