import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { TextLabel } from "../text/TextLabel";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";

interface NavigationCardProps {
  index: number;
  link: string;
  title: string;
  buttonText: string;
  bannerImage: string;
}

export const NavigationCard = ({
  index,
  link,
  title,
  buttonText,
  bannerImage,
}: NavigationCardProps) => {
  return (
    <AnimationReveal
      y={10}
      delay={index * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='div'
      className="last:tablet:col-span-2 last:laptop:col-span-1"
    >
      <Link
        aria-label={`Navigate to ${title}`}
        href={link}
        className='relative cursor-pointer group flex flex-col gap-5'
      >
        <figure className='relative overflow-hidden'>
          <Image
            src={bannerImage}
            alt='Banner image'
            height={500}
            width={1200}
            className='object-cover h-[170px] tablet:h-[240px] w-full transition-transform duration-500 ease-out group-hover:scale-110'
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1014, 580)
            )}`}
          />
        </figure>
        <div
          className='relative flex flex-col gap-0 pb-0 tablet:pb-4 border-b-[0px] tablet:border-b-[1px] border-b-primary-stroke after:absolute 
        after:bottom-0 after:left-0 after:h-[0px] tablet:after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-400 
        after:ease-initial group-hover:after:w-full'
        >
          <h5 className='text-accent-foreground font-medium line-clamp-2 tracking-[-0.52px]'>
            {title}
          </h5>
        </div>
        <TextLabel
          text={buttonText}
          textClassName='leading-[95%] text-text-secondary-button font-helvetica-neue'
          state='default'
          customClassName='btn-secondary-variant self-start **:text-text-secondary-button'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          animateIcon={true}
          iconAnimation='rotate'
        />
      </Link>
    </AnimationReveal>
  );
};
