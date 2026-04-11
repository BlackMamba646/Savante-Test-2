"use client";
import { ChangeEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { TextField } from "../common/input/TextField";
import { formatPhoneNumber, cleanPhoneNumber } from "@/utils/phone-format";
import { submitProjectInquiry } from "@/app/actions/project.action";
import { PhoneField } from "../common/input/PhoneField";
import { TextButton } from "../common/button/TextButton";
import { ArrowUpRight } from "../shared/icons/arrow-up-right";
import { PhoneCall } from "../shared/icons/phone-call";
import { Whatsapp } from "../shared/icons/whatsapp";
import { ContactModel } from "@/interfaces";
import { CONTACT_INFO } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { useFormAction } from "@/hooks/use-form-action";
import { projectInquirySchema } from "@/lib/validations/lead.schema";
import { IconButton } from "../common/button/IconButton";
import { WhatsappAlpha } from "../shared/icons/whatsapp-alpha";
import { EnvelopeSimple } from "../shared/icons/envelope-simple";
import { generateCanonicalURL } from "@/utils/utils";
import Image from "next/image";
import { MapPin } from "../shared/icons/map-pin";
import { ProjectModal } from "../common/modal/ProjectModal";

interface FixedCardProps {
  title: string;
  address: string;
  thumbnail: string;
  contactInfo: ContactModel;
  projectId: number;
}

export const FixedCard = ({
  title,
  address,
  thumbnail,
  contactInfo,
  projectId,
}: FixedCardProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <aside
        className='hidden laptop:flex bg-surface-container-background w-[320px] dark
     flex-col h-max sticky top-[80px] rounded-3xl overflow-hidden'
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
        <div className='flex flex-col gap-[12px] px-6 pb-[24px] pt-[12px]'>
          <figure className='relative overflow-hidden rounded-xl'>
            <Image
              src={ENVIRONMENT.API_URL + thumbnail}
              alt={title}
              width={420}
              height={280}
              className='w-full h-[180px] object-cover'
            />
          </figure>
          <div className='flex flex-row gap-1.5 items-center'>
            <a
              href={CONTACT_INFO.whatsappPropertyProjectMessage(
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
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
                showLeftIcon={true}
                leftIcon={WhatsappAlpha}
                iconClassName="size-[18px]!"
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
              onClick={() => setIsOpen(true)}
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
      <ProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectName={title}
        projectId={projectId || 0}
        message={`Project information inquiry for ${title}`}
      />
    </>
  );
};
