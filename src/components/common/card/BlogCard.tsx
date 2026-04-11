import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ROUTING } from "@/config/constant.config";
import Image from "next/image";
import Link from "next/link";
import { TextLabel } from "../text/TextLabel";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { shimmer, toBase64 } from "@/utils/image-loader";

interface BlogCardProps {
  title: string;
  date: string;
  slug: string;
  image: string;
  index?: number;
  disableAnimation?: boolean;
}

export const BlogCard = ({
  title,
  date,
  slug,
  image,
  index = 0,
  disableAnimation = false,
}: BlogCardProps) => {
  const content = (
    <Link
      href={`${ROUTING.BLOGS}/${slug}`}
      className="flex flex-col gap-5 group"
    >
      <figure className="relative rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title + "Blog Image"}
          height={200}
          width={430}
          className="object-cover h-[240px] w-full transition-transform duration-500 ease-out group-hover:scale-110"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(100, 100)
          )}`}
        />
      </figure>
      <div
        className="flex flex-col gap-2 relative pb-4 border-b-[1px] border-b-primary-stroke after:absolute 
      after:bottom-0 after:left-0 after:h-[0px] tablet:after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-400 
      after:ease-initial group-hover:after:w-full"
      >
        <span
          className="leading-[180%] text-[14px] tablet:text-[14px] 
        text-terciary-foreground"
        >
          {date}
        </span>
        <p
          className="quote-text text-accent-foreground leading-[140%]
        font-semibold tracking-[-0.24px] line-clamp-2"
        >
          {title}
        </p>
      </div>
      <TextLabel
        text={"Continue Reading"}
        textClassName="leading-[95%] text-text-secondary-button font-helvetica-neue"
        state="default"
        customClassName="btn-secondary-variant self-start"
        showRightIcon={true}
        rightIcon={ArrowUpRight}
        animateIcon={true}
        iconAnimation="rotate"
        iconClassName="size-[18px]!"
      />
    </Link>
  );

  return disableAnimation ? (
    <li className="relative h-full overflow-hidden">{content}</li>
  ) : (
    <AnimationReveal
      y={10}
      delay={index * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type="li"
      className="relative h-full overflow-hidden"
    >
      {content}
    </AnimationReveal>
  );
};
