"use client";

import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { Check } from "@/components/shared/icons/check";
import { FloorPlan } from "@/interfaces/project-response.interface";
import { ENVIRONMENT } from "@/config/env.config";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import { ImageLoader } from "@/components/common/skeleton/ImageLoader";
import { TextButton } from "@/components/common/button/TextButton";
import { DownloadSimple } from "@/components/shared/icons/download-simple";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface FloorPlansProps {
  floor_plans?: FloorPlan[];
  subtitle?: string;
  projectName?: string;
}

export const FloorPlans = ({
  floor_plans,
  subtitle,
  projectName,
}: FloorPlansProps) => {
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<
    FloorPlan | undefined
  >(floor_plans?.[0]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (floor_plans && floor_plans.length > 0 && !selectedFloorPlan) {
      setSelectedFloorPlan(floor_plans[0]);
    }
  }, [floor_plans, selectedFloorPlan]);

  const handleSelectFloorPlan = (floorPlan: FloorPlan) => {
    setSelectedFloorPlan(floorPlan);
  };

  return (
    <section id="floor-plans" className="relative pt-16">
      <div className="flex flex-col laptop:flex-row gap-[34px] h-full">
        <div className="flex-col gap-2 flex laptop:hidden">
          <div className="h-[1px] bg-accent-foreground w-[26px]"></div>
          <h4
            className="text-primary-foreground leading-[140%] line-clamp-2
                font-medium"
          >
            Floor Plans
          </h4>
        </div>
        <figure
          key={selectedFloorPlan?.id}
          className="flex-none laptop:flex-1 max-w-full tablet:max-w-[400px] relative group animate-fade-in
          duration-300 delay-100 self-stretch h-[335px] laptop:h-[280px] min-h-auto laptop:min-h-full"
        >
          {selectedFloorPlan?.Floor_plan_image?.data ? (
            <Image
              src={
                ENVIRONMENT.API_URL +
                selectedFloorPlan.Floor_plan_image.data.attributes.url
              }
              alt={`Floor plan ${selectedFloorPlan.Type}`}
              fill
              className="object-cover w-full h-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(710, 360)
              )}`}
            />
          ) : (
            <figure className="relative w-full h-full rounded-xl overflow-hidden">
              {/* <div className="absolute inset-0 inner-border-all-container"></div> */}
              <Image
                src={"/images/off-plan/floor-plan-fallback.webp"}
                width={710}
                height={580}
                alt="Floor plan placeholder"
                className="object-cover w-full h-full"
              />
            </figure>
          )}
          <div className="hidden absolute left-4 top-4 items-center justify-center dark">
            <button
              className="cursor-pointer bg-background-primary-button border-[1px] border-primary-stroke/20
                  p-2 flex items-center justify-center gap-1"
            >
              <span className="text-text-primary-button text-[15px] leading-[180%]">
                See 3d model
              </span>
              <figure className="text-icon-primary-button size-4">
                <ArrowUpRight size={8} />
              </figure>
            </button>
          </div>
        </figure>
        <div className="flex-none laptop:flex-1 flex flex-col gap-5">
          <div className="flex-col gap-2 hidden laptop:flex">
            <div className="h-[1px] bg-accent-foreground w-[26px]"></div>
            <AnimationReveal
              x={-10}
              y={0}
              delay={0.1}
              duration={0.3}
              opacity={1}
              type="h4"
              className="text-primary-foreground leading-[140%] line-clamp-2
                font-medium tracking-[-1.08px]"
            >
              Floor Plans
            </AnimationReveal>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 flex-wrap">
              {floor_plans?.map((floorPlan, index) => {
                const isSelected = selectedFloorPlan?.id === floorPlan.id;
                return (
                  <AnimationReveal
                    x={0}
                    y={0}
                    delay={0.2 + index * 0.1}
                    duration={0.3}
                    opacity={1}
                    type="button"
                    aria-selected={isSelected}
                    aria-label={`Select ${floorPlan.Type} floor plan`}
                    key={floorPlan.id}
                    className="flex flex-row gap-2 items-center cursor-pointer"
                    onClick={() => handleSelectFloorPlan(floorPlan)}
                  >
                    <div
                      className={`size-6 rounded-full border-[1px] border-primary-stroke
                      flex items-center justify-center transition-colors duration-300 ${
                        isSelected ? "bg-accent-foreground" : "bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <figure className="relative text-white">
                          <Check size={14} />
                        </figure>
                      )}
                    </div>
                    <span className="text-terciary-foreground text-[14px] leading-[180%] font-montserrat">
                      {floorPlan.Type}
                    </span>
                  </AnimationReveal>
                );
              })}
            </div>
            <AnimationReveal
              x={0}
              y={5}
              delay={0.2}
              duration={0.3}
              key={selectedFloorPlan?.id}
              opacity={1}
              className="flex flex-row gap-5"
            >
              <div className="flex flex-col">
                <span className="text-terciary-foreground text-[12px] leading-[180%]">
                  Total Area
                </span>
                <p
                  className="text-accent-foreground big-lowercase font-medium 
                  leading-[180%] tracking-[-0.4px]"
                >
                  {selectedFloorPlan?.Size || "N/A"} sq. ft
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-terciary-foreground text-[12px] leading-[180%]">
                  Starting price
                </span>
                <p
                  className="text-accent-foreground big-lowercase font-medium 
                  leading-[180%] tracking-[-0.4px]"
                >
                  {selectedFloorPlan?.Starting_price
                    ? `${selectedFloorPlan.Starting_price.trim()}`
                    : "N/A"}
                </p>
              </div>
            </AnimationReveal>
          </div>
          <AnimationReveal
            x={0}
            y={5}
            delay={0.5}
            duration={0.3}
            opacity={1}
            className="flex-none laptop:flex-1 flex items-start laptop:items-end pt-2.5"
          >
            <div className=" flex flex-col tablet:flex-row flex-nowrap gap-5 w-auto">
              <TextButton
                text={"Learn more"}
                state={"default"}
                customClassName="btn-primary-fill-variant w-max flex py-3! px-6! rounded-4xl w-full tablet:w-max justify-center"
                textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                animateIcon
                onClick={() => setIsContactModalOpen(true)}
              />
              <TextButton
                text="Download Floor Plan"
                state="default"
                customClassName="btn-secondary-variant gap-2"
                textClassName="font-helvetica-neue text-text-secondary-button! heading-secondary! leading-[95%]"
                showLeftIcon={true}
                leftIcon={DownloadSimple}
                iconClassName="w-[18px]! mobile:w-[20px]!"
                onClick={() => setIsContactModalOpen(true)}
              />
            </div>
          </AnimationReveal>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={`Download Floor Plan`}
        cta="Download Floor Plan"
        message={`Interested in learning more about the ${selectedFloorPlan?.Type} floor plan in ${projectName}`}
      />
    </section>
  );
};
