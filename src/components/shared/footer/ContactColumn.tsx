import { ContactModel } from "@/interfaces";
import { cn } from "@/lib/utils";
import { At } from "../icons/at";
import { Phone } from "../icons/phone";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "../icons/arrow-up-right";

interface ContactColumnProps {
  className?: string;
  contactInfo?: ContactModel;
  onClick?: () => void;
}

export const ContactColumn = ({
  className,
  contactInfo,
  onClick,
}: ContactColumnProps) => {
  return (
    <article className={cn("flex flex-col gap-[40px]", className)}>
      <div className='flex flex-col gap-2'>
        <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
          Email
        </span>
        <a
          href={`mailto:${contactInfo?.Email}`}
          rel='noopener noreferrer'
          target='_blank'
          className='flex flex-row gap-1 items-center'
        >
          <figure className='relative text-terciary-foreground'>
            <At size={20} />
          </figure>
          <p className='text-secondary text-[12px] font-medium uppercase leading-[180%] tracking-[0.96px]'>
            {contactInfo?.Email}
          </p>
        </a>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
          Phone
        </span>
        <a
          href={`tel:${contactInfo?.Phone}`}
          rel='noopener noreferrer'
          target='_blank'
          className='flex flex-row gap-1 items-center'
        >
          <figure className='relative text-terciary-foreground'>
            <Phone size={20} />
          </figure>
          <p className='text-secondary text-[12.5px] font-medium uppercase leading-[180%] tracking-[0.96px]'>
            {contactInfo?.Phone}
          </p>
        </a>
      </div>
      <TextButton
        onClick={onClick}
        text='Connect with us'
        showRightIcon={true}
        rightIcon={ArrowUpRight}
        customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-max'
        textClassName='uppercase leading-[140%] text-[12px] font-medium tracking-[0.96px]'
        animateIcon={true}
        iconAnimation='rotate'
        iconRotation={45}
      />
    </article>
  );
};
