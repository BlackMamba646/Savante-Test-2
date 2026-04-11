import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ROUTING } from "@/config/constant.config";
import Link from "next/link";
import { TextLabel } from "../text/TextLabel";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { LinkButton } from "../button/LinkButton";
import { toBase64 } from "@/utils/image-loader";
import { shimmer } from "@/lib/image-placeholders";
import Image from "next/image";
import { Bed } from "@/components/shared/icons/bed";

interface ServiceCardProps {
  index: number;
  id?: number;
  title?: string;
  image?: string;
  link?: string;
  description?: string;
  disableAnimation?: boolean;
}

export const ServiceCard = ({
  index,
  title,
  image,
  link,
  description,
  disableAnimation = false,
}: ServiceCardProps) => {
  const content = (
    <Link
      href={`${ROUTING.SERVICES}/${link}`}
      className='block relative h-full overflow-hidden group'
    >
      <div
        className='flex flex-col rounded-2xl overflow-hidden bg-surface-container-background 
        drop-shadow-xs h-full select-none'
      >
        <figure className='relative overflow-hidden z-10 h-[200px]'>
          <Image
            src={image || ""}
            alt={`${title} image`}
            width={650}
            height={250}
            className='object-cover w-full h-full relative scale-100 group-hover:scale-105 transition-transform duration-300'
            loading='lazy'
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1014, 580)
            )}`}
          />
        </figure>
        <div className='flex flex-col gap-5 py-[26px] px-[16px] flex-1'>
          <h5
            className='text-secondary leading-[140%] quote-text tracking-[-0.4px] capitalize 
            font-semibold font-plus'
          >
            {title}
          </h5>
          <div className='flex-1'>
            <p className='text-[14px] text-terciary-foreground line-clamp-3 leading-[180%]'>
              {description}
            </p>
          </div>
          <TextLabel
            text='Enquire Service'
            state='default'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            customClassName='btn-secondary-variant gap-2'
            textClassName='leading-[95%] heading-secondary text-secondary'
            animateIcon={true}
            iconAnimation={"rotate"}
            iconRotation={45}
            iconClassName='size-[18px]! text-background-primary-button'
          />
        </div>
      </div>
    </Link>
  );

  return disableAnimation ? (
    content
  ) : (
    <AnimationReveal
      y={10}
      delay={0.2 + index * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='div'
      className='block relative h-full overflow-hidden group'
    >
      {content}
    </AnimationReveal>
  );
};
