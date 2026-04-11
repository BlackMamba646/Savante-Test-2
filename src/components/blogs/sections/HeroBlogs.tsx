import { ContactModel } from "@/interfaces";
import { SocialLink } from "../../shared/components/SocialLink";
import { socials } from "@/data/socials";

interface HeroProps {
  data: string;
  contactInfo?: ContactModel;
}

export const HeroBlogs = (props: HeroProps) => {
  const { data, contactInfo } = props;

  const arrSocialLinks = [
    contactInfo?.Facebook,
    contactInfo?.Instagram,
    contactInfo?.Linkedin,
    contactInfo?.YouTube,
    contactInfo?.TikTok,
  ];

  return (
    <section className='relative light overflow-hidden'>
      <div
        className='relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center items-center h-full pt-[112px] pb-[40px] 
      spacing-padding-x gap-[34px]'
      >
        <div className='flex flex-col gap-4 pt-10 items-center'>
          <div className='w-[48px] h-[1px] bg-accent-solid animate-fade-in delay-100'></div>
          <div
            className='flex flex-col gap-1 items-center  animate-fade-in-up delay-300
            animate-distance-xs duration-300'
          >
            <h1 className='text-primary-foreground tracking-[-1.8px] text-center'>
              Welcome to our blog
            </h1>
            <p
              className='text-accent-foreground font-medium leading-[180%] tracking-[0.96px] text-[12px]
            text-center uppercase'
            >
              Welcome to Savante Realty
            </p>
          </div>
        </div>
        <ul className='flex flex-row flex-wrap tablet:flex-nowrap gap-2 justify-center laptop:gap-1.5'>
          {socials.map((social, index) => (
            <SocialLink
              key={index}
              href={arrSocialLinks[index] || ""}
              icon={social.icon}
              className='p-3.5 social-icon-variant group'
              animate={true}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
