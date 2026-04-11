import React from "react";
import { Info } from "../text/Info";
import { formatFeatures, formatProjectType } from "@/utils/utils";
import { ENVIRONMENT } from "@/config/env.config";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface InfoListProps {
  startingPrice: string;
  projectType: string | string[];
  developerName: string;
}

export const InfoList = ({
  startingPrice,
  projectType,
  developerName,
}: InfoListProps) => {
  // Configuración de delays escalonados (cada elemento aparece 0.15s después del anterior)
  const baseDelay = 0.8;
  const delayIncrement = 0.1;

  return (
    <div role='list' className='flex-1 flex flex-col tablet:flex-row gap-1 tablet:gap-5 tablet:pb-5 pb-0 w-full tablet:w-auto 
    items-start tablet:items-center'>
      <Info
        label='Starting price'
        value={
          formatFeatures.formatCurrency(Number(startingPrice)) +
          " " +
          ENVIRONMENT.CURRENCY
        }
        type='number'
        delay={baseDelay}
      />

      <div className='hidden laptop:block h-[20px] w-[1px] bg-primary-stroke'></div>

      <Info
        label='Project Type'
        value={formatProjectType(projectType)}
        type='text'
        delay={baseDelay + delayIncrement * 1.5}
      />

      <div className='hidden laptop:block h-[20px] w-[1px] bg-primary-stroke'></div>

      <Info
        label='Developer'
        value={developerName || "N/A"}
        type='text'
        delay={baseDelay + delayIncrement * 2.5}
      />
    </div>
  );
};
