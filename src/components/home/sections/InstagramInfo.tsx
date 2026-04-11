import { InstagramProfile } from "../InstagramProfile";
import { InfoValueUp } from "../InfoValueUp";
import { Instagram } from "@/components/shared/icons/instagram";
import { LinkButton } from "@/components/common/button/LinkButton";
import { PostsGrid } from "../PostsGrid";
import { formatFeatures } from "@/utils/utils";
import {
  InstagramDataResponse,
  InstagramErrorResponse,
} from "@/interfaces/instagram-response.interface";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ProfileStatistics } from "../ProfileStatistics";

interface InstagramInfoProps {
  data?: InstagramDataResponse | InstagramErrorResponse | null;
}

export const InstagramInfo = ({ data }: InstagramInfoProps) => {
  const hasData = data && !("error" in data);
  const profile = hasData ? data.profile : null;
  const reels = hasData ? data.reels : [];

  const username = profile?.username || "savante.realty";
  const fullName = profile?.fullName || "Savante Realty";
  const profilePicUrl =
    profile?.profilePicUrl ??
    "/images/social/instagram/savante-realty-brand-logo.webp";
  const postsCount = profile?.postsCount || 175;
  const followersCount = profile?.followersCount || 4521;
  const followingCount = profile?.followingCount || 1616;

  return (
    <section
      className='bg-surface-container-background laptop:bg-transparent relative flex flex-col laptop:flex-row 
    justify-center spacing-padding-x tablet:px-0 spacing-padding-y laptop:py-5 spacing-gap laptop:gap-0'
    >
      <article
        className='flex flex-row laptop:flex-col justify-center self-center laptop:self-stretch 
        gap-4 tablet:spacing-gap laptop:gap-2.5 p-0 laptop:p-10 max-w-[624px] laptop:max-w-[500px] w-full 
        laptop:bg-surface-container-background bg-transparent'
      >
        <AnimationReveal
          x={0}
          y={0}
          delay={0.2}
          duration={0.3}
          opacity={1}
          type='div'
          className='flex laptop:flex-row gap-5'
        >
          <InstagramProfile
            href={`https://www.instagram.com/${username}`}
            imageSrc={
              profilePicUrl ||
              "/images/social/instagram/savante-realty-brand-logo.webp"
            }
            alt={`${fullName} Instagram Profile`}
          />
          <div className='self-end hidden laptop:flex flex-col pb-5'>
            <h5 className='text-accent-foreground tracking-[-0.52px] font-semibold font-plus line-clamp-1'>
              {fullName}
            </h5>
            <a
              href={`https://www.instagram.com/${username}`}
              className='text-terciary-foreground tracking-normal leading-[200%] font-plus text-[12px]'
            >
              @{username}
            </a>
          </div>
        </AnimationReveal>
        <div className='flex-1 laptop:flex-none flex flex-col items-start gap-2 tablet:gap-3 self-center tablet:self-start'>
          <div className='flex laptop:hidden flex-col-reverse'>
            <h5 className='text-accent-foreground tracking-[-0.52px] font-semibold font-plus'>
              {fullName}
            </h5>
            <a
              href={`https://www.instagram.com/${username}`}
              className='text-terciary-foreground tracking-normal leading-[200%] text-[12px] font-plus'
            >
              @{username}
            </a>
          </div>
          {profile && (
            <ProfileStatistics
              postsCount={postsCount}
              followersCount={followersCount}
              followingCount={followingCount}
            />
          )}
          <AnimationReveal
            x={0}
            y={5}
            delay={0.5}
            duration={0.5}
            opacity={1}
            type='div'
            className='hidden tablet:flex'
          >
            <LinkButton
              href={`https://www.instagram.com/${username}`}
              text='Follow us'
              customClassName='btn-primary-fill-variant w-max rounded-full [&_figure]:text-icon-primary-button
            overflow-hidden justify-center py-3 px-6 gap-2'
              textClassName='uppercase text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
              showLeftIcon={true}
              leftIcon={Instagram}
              animateIcon={false}
              target='_blank'
              rel='noopener noreferrer'
            />
          </AnimationReveal>
        </div>
      </article>
      <PostsGrid reels={reels} />
      <AnimationReveal
        x={0}
        y={5}
        delay={0.8}
        duration={0.5}
        opacity={1}
        type='div'
        className='flex tablet:hidden w-full'
      >
        <LinkButton
          href={`https://www.instagram.com/${username}`}
          text='Follow us'
          customClassName='btn-primary-fill-variant w-full rounded-full [&_figure]:text-icon-primary-button
            overflow-hidden justify-center py-3 px-6 gap-2'
          textClassName='uppercase text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button'
          showLeftIcon={true}
          leftIcon={Instagram}
          animateIcon={false}
          iconClassName='size-[18px]!'
          target='_blank'
          rel='noopener noreferrer'
        />
      </AnimationReveal>
    </section>
  );
};
