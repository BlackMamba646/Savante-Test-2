"use client";
import { useState } from "react";
import { SocialLink } from "../components/SocialLink";
import { ContactModel } from "@/interfaces/contact-info.interface";
import { AreaModel, ProjectModel, ServiceModel } from "@/interfaces";
import { SocialLink as SocialLinkType, socials } from "@/data/socials";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { LogoFooter } from "../icons/logo/logo-footer";
import { CompanyColumn } from "./CompanyColumn";
import { AreasColumn } from "./AreasColumn";
import { ListingColumn } from "./ListingColumn";
import { SiteColumn } from "./SiteColumn";
import { ContactColumn } from "./ContactColumn";
import Link from "next/link";
import { ROUTING } from "@/config/constant.config";
import { ServicesContainer } from "./ServicesContainer";
import { BottomSection } from "./BottomSection";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "../icons/arrow-up-right";
import { ContactSection } from "./ContactSection";

interface FooterProps {
  services?: ServiceModel[];
  areas?: AreaModel[];
  contact?: ContactModel;
  projects?: ProjectModel[];
}

export default function Footer({
  services,
  areas,
  contact,
  projects,
}: FooterProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const arrSocialLinks = [
    contact?.Facebook,
    contact?.Instagram,
    contact?.Linkedin,
    contact?.YouTube,
    contact?.TikTok,
  ];

  return (
    <footer className='relative overflow-hidden dark'>
      <div
        className='absolute inset-0 z-5'
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), var(--Background-Surface, #000)",
        }}
      ></div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <div className='relative flex flex-col z-50 py-5 tablet:py-0 gap-5 tablet:gap-0'>
        {/* First Section */}
        <div className='flex flex-col pt-2 tablet:py-[40px] laptop:py-[34px] spacing-padding-x gap-10 items-center'>
          <figure className='relative'>
            <LogoFooter />
          </figure>
          <ul className='hidden tablet:flex flex-row gap-2 laptop:gap-1.5'>
            {socials.map((social, index) => (
              <SocialLink
                key={index}
                href={arrSocialLinks[index] || ""}
                icon={social.icon}
                className='p-3.5 social-dark-icon-variant group'
              />
            ))}
          </ul>
        </div>
        {/* ALTERNATIVE Second Section (ONLY for mobile) */}
        <div className='flex tablet:hidden items-start flex-col py-[20px] spacing-padding-x gap-[34px]'>
          <div className='flex flex-col gap-2.5'>
            <a
              href={`mailto:${contact?.Email}`}
              rel='noopener noreferrer'
              target='_blank'
              className='flex flex-col gap-1'
            >
              <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
                Email
              </span>
              <h4 className='text-secondary font-medium tracking-[-0.72px]'>
                {contact?.Email}
              </h4>
            </a>
            <a
              href={`tel:${contact?.Phone}`}
              rel='noopener noreferrer'
              target='_blank'
              className='flex flex-row gap-2 items-center'
            >
              <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium mt-[1px]'>
                Phone
              </span>
              <p className='text-secondary text-[14px] leading-[180%]'>
                {contact?.Phone}
              </p>
            </a>
          </div>
          <ul className='flex flex-row gap-2 laptop:gap-1.5'>
            {socials.map((social, index) => (
              <SocialLink
                key={index}
                href={social.href}
                icon={social.icon}
                className='p-3.5 social-dark-icon-variant group [&>figure]:h-[14px]'
              />
            ))}
          </ul>
          <TextButton
            onClick={() => setIsContactModalOpen(true)}
            text='Connect with us'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            customClassName='btn-primary-fill-variant py-3 px-6 justify-center gap-[6px] rounded-full w-full'
            textClassName='uppercase text-[12px] font-medium tracking-[0.96px]'
            animateIcon={true}
            iconAnimation='rotate'
            iconRotation={45}
          />
        </div>
        {/* Second Section */}
        <div
          className='flex flex-row flex-wrap tablet:flex-nowrap spacing-padding-x gap-y-4 gap-x-8 tablet:gap-2.5 
        justify-start tablet:justify-center'
        >
          <CompanyColumn
            className='py-0 px-[0px] tablet:py-[20px] tablet:px-[12px] laptop:py-[34px] 
            laptop:pr-[40px] laptop:pl-[20px]'
            onClick={() => setIsContactModalOpen(true)}
          />
          <AreasColumn
            className='py-0 px-[0px] tablet:py-[20px] tablet:px-[12px] laptop:py-[34px] laptop:px-[20px]'
            areas={areas}
          />
          <ListingColumn
            className='py-0 px-[0px] tablet:py-[20px] tablet:px-[12px] 
          laptop:py-[34px] laptop:px-[20px]'
          />
          <SiteColumn className='py-[20px] px-[12px] laptop:py-[34px] laptop:px-[20px] hidden tablet:flex' />
          <ContactColumn
            className='py-[34px] px-[40px] hidden laptop:flex'
            contactInfo={contact}
            onClick={() => setIsContactModalOpen(true)}
          />
        </div>
        {/* ALTERNATIVE Contact Section (ONLY for tablet) */}
        <ContactSection
          className='hidden tablet:block laptop:hidden'
          contactInfo={contact}
          onClick={() => setIsContactModalOpen(true)}
        />
        {/* Third Section */}
        <ServicesContainer services={services} />
        {/* Bottom Section */}
        <BottomSection />
      </div>
    </footer>
  );
}
