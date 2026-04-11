import React from "react";
import { InfoValueUp } from "./InfoValueUp";
import { formatFeatures } from "@/utils/utils";
import { AnimationReveal } from "../ui/animation-reveal";

interface ProfileStatisticsProps {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export const ProfileStatistics = ({
  postsCount,
  followersCount,
  followingCount,
}: ProfileStatisticsProps) => {
  return (
    <AnimationReveal
      x={0}
      y={5}
      delay={0.4}
      duration={0.3}
      opacity={1}
      type='ul'
      className='flex flex-wrap tablet:flex-nowrap flex-row pt-0 laptop:pt-2 px-0 laptop:px-2 pb-2 
          laptop:pb-[40px] gap-4 tablet:gap-[26px] '
    >
      <InfoValueUp
        label='Posts'
        value={formatFeatures.formatNumber(postsCount)}
        className='flex-col-reverse tablet:flex-row gap-0 tablet:gap-2 items-start 
              tablet:items-center [&_span]:font-medium tablet:[&_span]:font-semibold'
        role='listitem'
        animated={true}
      />
      <InfoValueUp
        label='Followers'
        value={formatFeatures.formatNumber(followersCount)}
        className='flex-col-reverse tablet:flex-row gap-0 tablet:gap-2 items-start 
              tablet:items-center [&_span]:font-medium tablet:[&_span]:font-semibold'
        role='listitem'
        animated={true}
      />
      <InfoValueUp
        label='Following'
        value={formatFeatures.formatNumber(followingCount)}
        className='flex-col-reverse tablet:flex-row gap-0 tablet:gap-2 items-start 
              tablet:items-center [&_span]:font-medium tablet:[&_span]:font-semibold'
        role='listitem'
        animated={true}
      />
    </AnimationReveal>
  );
};
