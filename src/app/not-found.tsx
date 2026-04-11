import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { NotFoundIcon } from "@/components/shared/icons/not-found-icon";
import { socials } from "@/data/socials";
import { SocialLink } from "@/components/shared/components/SocialLink";
import { LinkButton } from "@/components/common/button/LinkButton";
import { ROUTING } from "@/config/constant.config";
import { Buildings } from "@/components/shared/icons/buildings";
import Navbar from "@/components/shared/navbar/navbar";

export const metadata: Metadata = {
  title: "Page Not Found | Savante Realty",
  description:
    "The page you are looking for could not be found. Return to Savante Realty's homepage to explore Dubai's finest real estate properties.",
  icons: {
    icon: "https://savante.propphy.com/uploads/favicon_32x32_e99826ebd3.png",
    apple: "https://savante.propphy.com/uploads/favicon_32x32_e99826ebd3.png",
  },
};

const arrSocialLinks = [
  "https://www.facebook.com/theproperteaguy",
  "https://www.instagram.com/theproperteaguy",
  "https://t.me/theproperteaguy",
  "https://www.youtube.com/@theproperteaguy",
  "https://www.tiktok.com/@theproperteaguy",
];

export default function NotFound() {
  return (
    <div className='relative bg-white'>
      <Navbar theme='light' position='fixed' />
      <div
        className='absolute inset-x-0 top-0 tablet:inset-0 tablet:flex tablet:items-center 
      tablet:justify-center overflow-hidden pointer-events-none'
      >
        <figure className='relative z-5 w-full h-[300px] tablet:h-[500px]'>
          <NotFoundIcon />
        </figure>
      </div>
      <div className='relative flex flex-col gap-10 tablet:gap-16 pb-[64px] pt-[112px] spacing-padding-x z-10'>
        <div className='flex flex-col gap-[26px] pt-[24px] items-center tablet:items-start laptop:items-center justify-center'>
          <div className='flex flex-col gap-4 items-center tablet:items-start laptop:items-center pt-20 tablet:pt-0'>
            <div className='w-[48px] h-[1px] bg-accent-solid'></div>
            <div className='flex flex-col gap-1'>
              <h1
                className='text-primary-foreground leading-[120%] tracking-[0.8px] 
              font-crimson text-center tablet:text-left'
              >
                Oh no! Error 404
              </h1>
              <p
                className='text-terciary-foreground leading-[180%] text-[14px] 
              text-center tablet:text-left'
              >
                We are sorry but the page you are looking for could not be
                found.
              </p>
            </div>
          </div>
          <ul className='flex flex-row flex-wrap tablet:flex-nowrap gap-2 laptop:gap-1.5 self-center tablet:self-start laptop:self-center'>
            {socials.map((social, index) => (
              <SocialLink
                key={index}
                index={index}
                href={arrSocialLinks[index] || ""}
                icon={social.icon}
                className='p-3 tablet:p-4 social-icon-variant group outline-primary-foreground/20'
                animate={true}
              />
            ))}
          </ul>
        </div>
        <div
          className='flex flex-col tablet:flex-row gap-[16px] tablet:gap-[34px] 
          items-center justify-start laptop:justify-center'
        >
          <LinkButton
            href={ROUTING.HOME}
            text='Back to homepage'
            showLeftIcon={true}
            leftIcon={ArrowUpRight}
            customClassName='btn-primary-fill-variant py-3 px-6 gap-[6px] rounded-full w-full justify-center tablet:w-auto'
            textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px]'
            iconClassName='rotate-275! group-hover:rotate-225! scale-90'
            animateIcon={true}
            iconSize={10}
            iconAnimation='rotate'
            iconRotation={45}
          />
          <LinkButton
            href={ROUTING.OFF_PLAN}
            text='Search properties'
            showLeftIcon={true}
            leftIcon={Buildings}
            customClassName='btn-secondary-variant gap-[6px] rounded-full'
            textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px]'
            iconClassName='text-icon-secondary-button'
            animateIcon={true}
            iconSize={20}
            iconAnimation='rotate'
            iconRotation={45}
          />
        </div>
      </div>
    </div>
  );
}
