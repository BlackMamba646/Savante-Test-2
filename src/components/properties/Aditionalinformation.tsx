"use client";
import { MapPinArea } from "../shared/icons/map-pin-area";
import { Amenities } from "../common/sections/Amenities";
import { Features } from "./Features";
import { FixedCard } from "./FixedCard";
import { ContactModel } from "@/interfaces/contact-info.interface";
import { AnimationReveal } from "../ui/animation-reveal";

interface AdditionalInformationProps {
  title: string;
  description: string;
  address: string;
  operationType: string;
  operation: string;
  features: string[];
  amenities: string[];
  thumbnail: string;
  slug: string;
  onPress: () => void;
  contactInfo: ContactModel;
}

export const AdditionalInformation = ({
  title,
  description,
  address,
  features,
  amenities,
  thumbnail,
  operationType,
  operation,
  slug,
  onPress,
  contactInfo,
}: AdditionalInformationProps) => {
  return (
    <div className='spacing-padding-x py-10 max-w-[1440px] mx-auto flex flex-row gap-[26px]'>
      <article className='flex-1 flex flex-col spacing-gap'>
        <section className='flex flex-col gap-[26px]'>
          <div className='flex flex-col gap-[24px]'>
            <div className='w-[48px] h-[1px] bg-accent-foreground'></div>
            <div className='flex flex-col gap-0'>
              <h2 className='text-primary font-crimson leading-[120%]'>
                Description
              </h2>
              <p
                className='text-[12px] text-primary-foreground leading-[180%] 
            font-medium uppercase tracking-[0.96px]'
              >
                Discover the latest insights and trends from Dubai
              </p>
            </div>
          </div>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.3}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='flex flex-col gap-4'
          >
            <p className='whitespace-break-spaces text-pretty text-left text-terciary-foreground text-[15px] leading-[180%]'>
              {description}
            </p>
          </AnimationReveal>
        </section>
        <section className='flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[24px]'>
            <div className='w-[48px] h-[1px] bg-accent-foreground'></div>
            <div className='flex flex-col gap-0'>
              <h3 className='text-primary font-crimson leading-[140%] tracking-[-1.2px]'>
                Location Map & Overview of Downtown Dubai
              </h3>
              <div className='flex flex-row gap-1.5 items-center'>
                <figure className='text-terciary-foreground'>
                  <MapPinArea size={20} />
                </figure>
                <p className='text-terciary-foreground heading-secondary font-medium leading-[160%] line-clamp-1'>
                  {address}
                </p>
              </div>
            </div>
          </div>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.3}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='w-full h-[300px]'
          >
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                address
              )}&output=embed`}
              width='100%'
              height='300'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='w-full h-[300px] border-none'
            />
          </AnimationReveal>
        </section>
        <Features items={features} title='Features' />
        <Amenities items={amenities} title='Amenities' className='pt-0' />
      </article>
      <FixedCard
        title={title}
        address={address}
        thumbnail={thumbnail}
        operation={operation}
        onPress={onPress}
        contactInfo={contactInfo}
      />
    </div>
  );
};
