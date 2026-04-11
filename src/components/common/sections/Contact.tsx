import { SocialLink } from "@/components/shared/components/SocialLink";
import { socials } from "@/data/socials";
import { LeadForm } from "../form/LeadForm";
import { ContactModel } from "@/interfaces";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { SmallLogo } from "@/components/shared/icons/logo/small-logo";

interface ContactProps {
  title?: string;
  contactInfo: ContactModel;
}

export const Contact = ({ title, contactInfo }: ContactProps) => {
  const arrSocialLinks = [
    contactInfo?.Facebook,
    contactInfo?.Instagram,
    contactInfo?.Linkedin,
    contactInfo?.YouTube,
    contactInfo?.TikTok,
  ];

  return (
    <section className='relative overflow-hidden bg-surface-background light'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-20 flex 
        flex-col laptop:flex-row gap-10'
      >
        <article className='flex-none laptop:flex-1 flex flex-col gap-0 laptop:gap-16 p-0 self-center w-full'>
          <div className='flex flex-col items-start gap-[48px] tablet:gap-[26px] max-w-full tablet:max-w-[500px]'>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.2}
              duration={0.3}
              type='figure'
              opacity={1}
              className='relative h-[52px]'
            >
              <SmallLogo />
            </AnimationReveal>
            <AnimationReveal
              x={-5}
              y={0}
              delay={0.4}
              duration={0.5}
              type='div'
              opacity={1}
              className='flex flex-col gap-'
            >
              <h2 className='text-primary-foreground tracking-[-1.38px]'>
                {title || "Connect With Savante Realty"}
              </h2>
              <p className='text-terciary-foreground text-[14px] leading-[180%]'>
                Ready to invest, relocate, or set up in the UAE? Reach out to
                our team and receive personalized guidance tailored to your
                goals.
              </p>
            </AnimationReveal>
          </div>

          <div className='hidden laptop:flex flex-col gap-1 w-full'>
            <ul className='flex flex-row flex-wrap tablet:flex-nowrap gap-2 laptop:gap-1.5 pb-4'>
              {socials.map((social, index) => (
                <SocialLink
                  key={index}
                  index={index}
                  href={arrSocialLinks[index] || ""}
                  icon={social.icon}
                  className='p-3.5 social-icon-variant group outline-primary-foreground/20'
                  animate={true}
                />
              ))}
            </ul>
            <AnimationReveal
              x={0}
              y={5}
              delay={0.9}
              duration={0.5}
              type='div'
              opacity={1}
              className='hidden laptop:flex flex-col gap-1'
            >
              <a
                href={`mailto:${contactInfo?.Email}`}
                className='text-[16px] text-primary-foreground leading-[140%] 
              font-semibold tracking-[-0.32px]'
              >
                {contactInfo?.Email}
              </a>
              <p className='text-[14px] text-terciary-foreground leading-[180%]'>
                {contactInfo?.Phone}
              </p>
            </AnimationReveal>
          </div>
        </article>
        <LeadForm formKey='lead-form' />
        <div className='flex laptop:hidden flex-col-reverse tablet:flex-row gap-4 tablet:gap-10'>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.9}
            duration={0.5}
            type='div'
            opacity={1}
            className='flex flex-col gap-1'
          >
            <a
              href={`mailto:${contactInfo?.Email}`}
              className='text-[16px] text-primary-foreground leading-[140%] 
              font-semibold tracking-[-0.32px]'
            >
              {contactInfo?.Email}
            </a>
            <p className='text-[14px] text-terciary-foreground leading-[180%]'>
              {contactInfo?.Phone}
            </p>
          </AnimationReveal>
          <ul className='flex flex-row flex-wrap tablet:flex-nowrap gap-2 laptop:gap-1.5 self-start tablet:self-center'>
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
      </div>
    </section>
  );
};