import { IconButton } from "@/components/common/button/IconButton";
import { LinkButton } from "@/components/common/button/LinkButton";
import { BigStatsLeft } from "@/components/common/text/BigStatsLeft";
import { InfoValueUp } from "@/components/home/InfoValueUp";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { Phone } from "@/components/shared/icons/phone";
import { Whatsapp } from "@/components/shared/icons/whatsapp";
import { WhatsappAlpha } from "@/components/shared/icons/whatsapp-alpha";
import { CONTACT_INFO } from "@/config/constant.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { cleanPhoneNumber } from "@/utils/phone-format";
import Image from "next/image";
import React from "react";

interface HeroAgentProps {
  name: string;
  role: string;
  imageUrl: string;
  whatsapp: string;
  email: string;
  phone: string;
  brokerNumber: string;
  experience: string;
  languages: string[];
  biography: string;
}

export const HeroAgentDetail = ({
  name,
  role,
  imageUrl,
  whatsapp,
  email,
  phone,
  brokerNumber,
  experience,
  languages,
  biography,
}: HeroAgentProps) => {
  return (
    <section className='relative'>
      <div
        className='max-w-[1440px] mx-auto flex flex-col laptop:flex-row pt-[80px] pb-[10px] spacing-padding-x 
      laptop:px-0 gap-[24px] laptop:gap-0'
      >
        <div className='flex laptop:hidden flex-col gap-2 tablet:gap-4 pt-[48px]'>
          <InfoValueUp
            label='Role'
            value={role}
            className='flex tablet:hidden flex-row-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1 w-max items-center
            [&_span]:translate-y-[1px]'
          />
          <div className='hidden tablet:flex flex-row gap-2 items-center'>
            {whatsapp && (
              <LinkButton
                text='Whatsapp'
                href={`https://wa.me/${whatsapp}`}
                customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-4xl 
                overflow-hidden justify-center py-3 px-6 gap-2'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
                showLeftIcon={true}
                leftIcon={WhatsappAlpha}
                iconSize={18}
                iconRotation={45}
                target='_blank'
                rel='noopener noreferrer'
              />
            )}
            {phone && (
              <LinkButton
                text='Email'
                href={`mailto:${email}`}
                customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-4xl 
                overflow-hidden justify-center py-3 px-6 gap-2'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
                showLeftIcon={true}
                leftIcon={EnvelopeSimple}
                iconSize={19}
                iconRotation={45}
                target='_blank'
                rel='noopener noreferrer'
              />
            )}
            {phone && (
              <LinkButton
                text='Phone'
                href={`tel:${phone}`}
                customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-4xl 
                overflow-hidden justify-center py-3 px-6 gap-2'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
                showLeftIcon={true}
                leftIcon={Phone}
                iconSize={18}
                iconRotation={45}
                target='_blank'
                rel='noopener noreferrer'
              />
            )}
          </div>
          <h2 className='text-primary-foreground tracking-[-1.38px] line-clamp-2'>
            About {name}
          </h2>
          <div className='hidden tablet:flex flex-row gap-5 items-start'>
            <BigStatsLeft
              title='Years of Experience'
              value={experience}
              className='[&_p]:max-w-[90px]'
            />
            <InfoValueUp
              label='Role'
              value={role}
              className='flex-col-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1'
            />
            <InfoValueUp
              label='Languages'
              value={languages.join(", ")}
              className='flex-col-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1'
            />
          </div>
        </div>
        {/* Agent background blackc container */}
        <div
          className='relative flex-1 flex flex-col tablet:flex-row laptop:flex-col py-5 laptop:py-[34px] pr-5 laptop:pr-[34px] pl-5 laptop:pl-[112px] w-full laptop:w-max
        gap-5 max-w-full laptop:max-w-[600px] dark h-max self-start bg-surface-background rounded-[32px] laptop:rounded-none laptop:bg-transparent'
        >
          <div
            className='absolute hidden laptop:block top-0 right-0 w-[100vw] h-full bg-transparent laptop:bg-surface-background 
            z-5 rounded-br-[64px] rounded-tr-[64px] animate-fade-in-left delay-100 animate-distance-md duration-300'
          ></div>
          <figure
            className='flex-none tablet:flex-1 laptop:flex-none relative max-w-full tablet:max-w-[300px] laptop:max-w-full 
            h-[200px] tablet:h-[170px] animate-fade-in delay-300 duration-300
            laptop:h-[300px] rounded-2xl laptop:rounded-3xl overflow-hidden z-10'
          >
            <Image
              src={imageUrl}
              alt={name}
              width={500}
              height={300}
              className='object-cover w-full h-full mix-blend-plus-darken'
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1014, 580)
              )}`}
            />
          </figure>
          <div className='flex-1 laptop:flex-none flex flex-col gap-4'>
            <div
              className='flex-1 laptop:flex-none relative z-10 flex flex-col gap-1 pb-3 
            animate-fade-in-left animate-distance-xs delay-500 duration-300'
            >
              {brokerNumber && (
                <div className='flex flex-row items-center gap-2'>
                  <span className='text-terciary-foreground text-[12px] font-medium leading-[200%]'>
                    Broker Number
                  </span>
                  <p className='text-accent-foreground text-[12px] font-medium leading-[100%]'>
                    {brokerNumber}
                  </p>
                </div>
              )}
              <h3 className='text-accent-foreground tracking-[-1.2px] line-clamp-2'>
                {name}
              </h3>
            </div>
            <div
              className='hidden tablet:flex flex-none laptop:flex-1 dark
            animate-fade-in-up delay-600 animate-distance-xs duration-300 relative z-10'
            >
              <LinkButton
                href={
                  whatsapp
                    ? CONTACT_INFO.agentWhatsAppMessage(
                        cleanPhoneNumber(whatsapp),
                        name
                      )
                    : ""
                }
                text='Contact me'
                customClassName='relative z-10 btn-primary-dark-fill-variant
              rounded-full [&_figure]:text-icon-primary-button w-full
              overflow-hidden justify-center py-3 px-6 gap-2'
                textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
                showLeftIcon={true}
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                leftIcon={WhatsappAlpha}
                iconSize={10}
                iconClassName='size-[18px]! w-auto scale-90 text-icon-primary-button'
                target='_blank'
                rel='noopener noreferrer'
              />
            </div>
          </div>
          <div className='flex-1 flex tablet:hidden flex-row gap-1'>
            <LinkButton
              href={
                whatsapp
                  ? CONTACT_INFO.agentWhatsAppMessage(
                      cleanPhoneNumber(whatsapp),
                      name
                    )
                  : ""
              }
              text='Contact me'
              customClassName='relative z-10 dark btn-primary-dark-fill-variant flex-1 rounded-full [&_figure]:text-icon-primary-button
            overflow-hidden justify-center py-3 px-6 gap-2'
              textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
              showLeftIcon={true}
              leftIcon={WhatsappAlpha}
              iconSize={10}
              iconClassName='size-[18px]! w-auto scale-90 text-icon-primary-button'
              target='_blank'
              rel='noopener noreferrer'
            />
            <IconButton
              big={false}
              icon={EnvelopeSimple}
              iconSize={18}
              customClassName='social-dark-icon-variant outline-terciary-foreground rounded-full p-3'
              iconClassName='h-[18px]! w-auto scale-90 text-secondary'
            />
            <IconButton
              big={false}
              icon={Phone}
              iconSize={18}
              customClassName='social-dark-icon-variant outline-terciary-foreground rounded-full p-3'
              iconClassName='h-[18px]! w-auto scale-90 text-secondary'
            />
          </div>
        </div>
        <div className='tablet:hidden flex flex-col gap-1'>
          <InfoValueUp
            label='Years of Experience'
            value={experience}
            className='flex-row-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1 justify-between items-center'
          />
          <InfoValueUp
            label='Languages'
            value={languages.join(", ")}
            className='flex-row-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1 justify-between items-center'
          />
        </div>
        <article className='flex-1 flex flex-col py-0 laptop:py-4 px-0 laptop:px-16 gap-[34px]'>
          <div className='hidden laptop:flex flex-col gap-4 pt-[24px]'>
            <div
              className='flex flex-row gap-2 items-center 
            animate-fade-in-up delay-300 animate-distance-xs duration-300'
            >
              {whatsapp && (
                <LinkButton
                  text='Whatsapp'
                  href={`https://wa.me/${whatsapp}`}
                  customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-4xl 
                overflow-hidden justify-center py-3 px-6 gap-2'
                  textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
                  showLeftIcon={true}
                  leftIcon={WhatsappAlpha}
                  iconSize={18}
                  iconRotation={45}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              )}
              {phone && (
                <LinkButton
                  text='Email'
                  href={`mailto:${email}`}
                  customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-4xl 
                overflow-hidden justify-center py-3 px-6 gap-2'
                  textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
                  showLeftIcon={true}
                  leftIcon={EnvelopeSimple}
                  iconSize={19}
                  iconRotation={45}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              )}
              {phone && (
                <LinkButton
                  text='Phone'
                  href={`tel:${phone}`}
                  customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-4xl 
                overflow-hidden justify-center py-3 px-6 gap-2'
                  textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
                  showLeftIcon={true}
                  leftIcon={Phone}
                  iconSize={18}
                  iconRotation={45}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              )}
            </div>
            <h2
              className='text-primary-foreground tracking-[-1.38px] line-clamp-2
            animate-fade-in-left delay-500 animate-distance-xs duration-300'
            >
              About {name}
            </h2>
            <div className='flex flex-row gap-5 items-start
            animate-fade-in delay-600 duration-300'>
              <BigStatsLeft title='Years of Experience' value={experience} />
              <InfoValueUp
                label='Role'
                value={role}
                className='flex-col-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1'
              />
              <InfoValueUp
                label='Languages'
                value={languages.join(", ")}
                className='flex-col-reverse [&_p]:text-[14px] [&_p]:leading-[100%] gap-1'
              />
            </div>
          </div>
          <p className='text-terciary-foreground text-[15px] leading-[180%] whitespace-pre-line
          animate-fade-in delay-800 duration-300'>
            {biography ? biography : "No biography available"}
          </p>
        </article>
      </div>
    </section>
  );
};
