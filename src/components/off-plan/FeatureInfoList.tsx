import { cn } from "@/lib/utils";
import React from "react";
import { Info } from "../common/text/Info";
import { formatFeatures, formatProjectType } from "@/utils/utils";
import { ENVIRONMENT } from "@/config/env.config";

interface FeatureInfoListProps {
  startingPrice: string;
  projectType: string | string[];
  developerName: string;
  handover: string;
  className?: string;
}

export const FeatureInfoList = ({
  startingPrice,
  projectType,
  developerName,
  handover,
  className,
}: FeatureInfoListProps) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-row gap-[20px] tablet:gap-[40px] flex-wrap"
      )}
    >
      <Info
        label='Developer'
        value={developerName}
        type='text'
        className='flex-col gap-1 tablet:gap-0 animate-fade-in-up animate-distance-xs delay-700 duration-300'
        disableAnimation={true}
      />
      <Info
        label='Project Type'
        value={formatProjectType(projectType)}
        type='text'
        className='flex-col gap-1 tablet:gap-0 animate-fade-in-up animate-distance-xs delay-800 duration-300'
        disableAnimation={true}
      />
      <Info
        label='Starting price'
        value={
          formatFeatures.formatCurrency(Number(startingPrice)) +
          " " +
          ENVIRONMENT.CURRENCY
        }
        type='number'
        className='hidden tablet:flex flex-col gap-1 tablet:gap-0 animate-fade-in-up animate-distance-xs delay-900 duration-300'
        disableAnimation={true}
      />
      <Info
        label='Handover'
        value={handover}
        type='text'
        className='flex laptop:last:hidden flex-col gap-1 tablet:gap-0 animate-fade-in-up animate-distance-xs delay-1000 duration-300'
        disableAnimation={true}
      />
    </div>
  );
};
