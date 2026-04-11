import { MapPin } from "../shared/icons/map-pin";
import Image from "next/image";
import { CONTACT_INFO } from "@/config/constant.config";
import { TextButton } from "../common/button/TextButton";
import { PhoneCall } from "../shared/icons/phone-call";
import { IconButton } from "../common/button/IconButton";
import { EnvelopeSimple } from "../shared/icons/envelope-simple";
import { WhatsappAlpha } from "../shared/icons/whatsapp-alpha";
import { ContactModel } from "@/interfaces/contact-info.interface";
import { usePathname } from "next/navigation";
import { generateCanonicalURL } from "@/utils/utils";

interface FixedCardProps {
  title: string;
  address: string;
  thumbnail: string;
  operation: string;
  contactInfo: ContactModel;
  onPress: () => void;
}

export const FixedCard = ({
  title,
  address,
  thumbnail,
  operation,
  contactInfo,
  onPress,
}: FixedCardProps) => {
  const pathname = usePathname();

  return (
    <aside
      className='hidden laptop:flex bg-surface-container-background w-[320px] dark
     flex-col h-max sticky top-[90px] rounded-3xl overflow-hidden'
    >
      <div className='flex flex-col gap-1 px-5 py-6 bg-on-surface-background'>
        <p className='text-primary-foreground leading-[140%] font-medium text-[16px] tracking-[0.32px]'>
          {title}
        </p>
        <div className='flex flex-row gap-1.5 items-center'>
          <figure className='text-icon-secondary-button'>
            <MapPin size={18} />
          </figure>
          <p className='text-terciary-foreground text-[14px] leading-[180%] line-clamp-1'>
            {address}
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-[26px] px-6 py-[26px]'>
        <figure className='relative overflow-hidden rounded-xl'>
          <Image
            src={thumbnail}
            alt={title}
            width={420}
            height={280}
            className='w-full h-[180px] object-cover'
          />
          <button
            className='absolute top-2.5 right-2.5 bg-surface-container-background outline-[1px] rounded-xl
              outline-secondary-stroke py-2 px-3 text-[12px] text-secondary-foreground leading-[110%]'
          >
            {operation}
          </button>
        </figure>
        <div className='flex flex-row gap-1.5 items-center'>
          <a
            href={CONTACT_INFO.whatsappPropertyMessage(
              contactInfo.Phone,
              generateCanonicalURL(pathname)
            )}
            aria-label='Contact us by WhatsApp'
            target='_blank'
            title='Contact us by WhatsApp'
            className='flex-1'
            rel='noopener noreferrer'
          >
            <TextButton
              text={"WhatsApp"}
              state={"default"}
              customClassName='relative z-10 dark btn-primary-dark-fill-variant w-full h-full
              rounded-full [&_figure]:text-text-primary-button py-3 px-6 justify-center gap-2!'
              textClassName='uppercase text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
              showLeftIcon={true}
              leftIcon={WhatsappAlpha}
              iconClassName="size-[18px]!"
              iconAnimation={"scale"}
            />
          </a>
          <IconButton
            big={true}
            icon={EnvelopeSimple}
            iconSize={18}
            customClassName='social-dark-icon-variant p-3 rounded-full outline-1 outline-secondary-stroke'
            animateIcon={true}
            iconAnimation={"scale"}
            title='Contact us via email form'
            onClick={() => onPress()}
          />
          <a
            href={`tel:${contactInfo.Phone}`}
            aria-label='Call us to get more information about the property'
            title='Call us'
          >
            <IconButton
              big={true}
              icon={PhoneCall}
              iconSize={18}
              customClassName='social-dark-icon-variant p-3 rounded-full outline-1 outline-secondary-stroke'
              animateIcon={true}
              iconAnimation={"scale"}
            />
          </a>
        </div>
      </div>
    </aside>
  );
};
