import { AboutPropertyForm } from "@/components/off-plan/AboutPropertyForm";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import React from "react";

interface ContactQRProps {
  projectId?: string;
  mainImage?: string;
  location?: string;
  projectNumber?: string;
  qr?: string;
}

export const ContactQR = ({
  projectId,
  mainImage,
  location,
  projectNumber,
  qr,
}: ContactQRProps) => {
  return (
    <section id="contact-qr" className="relative overflow-hidden">
      <div
        className="relative max-w-[1440px] w-full mx-auto flex flex-col 
      laptop:flex-row spacing-padding-x spacing-padding-y spacing-gap z-10"
      >
        <header className="flex laptop:hidden flex-col gap-1">
          <p
            className="text-secondary font-medium text-[10px] leading-[160%] 
          uppercase tracking-[0.6px]"
          >
            {location}
          </p>
          <h3 className="text-primary-foreground font-medium leading-[120%] tracking-[-1.2px]">
            Need more info about this property?
          </h3>
        </header>
        <article
          className="flex flex-col gap-16 max-w-full min-w-auto laptop:min-w-[560px] laptop:max-w-[560px] 
        h-[200px] tablet:h-[300px] tablet:max-h-[300px] laptop:h-auto self-stretch"
        >
          <div className="flex-1 flex flex-row laptop:flex-col gap-4 w-full h-full">
            <AnimationReveal
              x={0}
              y={0}
              delay={0.2}
              duration={0.3}
              type="figure"
              opacity={1}
              className="relative group w-full h-full"
            >
              <Image
                src={ENVIRONMENT.API_URL + mainImage}
                alt={"Content Image"}
                width={1100}
                height={500}
                className="object-cover w-full h-full rounded-xl overflow-hidden"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1100, 500)
                )}`}
              />
            </AnimationReveal>
            <AnimationReveal
              x={0}
              y={5}
              delay={0.3}
              duration={0.3}
              type="div"
              opacity={1}
              className={`hidden laptop:flex flex-row gap-5 ${
                !projectNumber ? "invisible" : "visible"
              }`}
            >
              {qr && (
                <figure
                  className="relative min-w-[136px] h-[136px] laptop:min-w-[120px] laptop:w-[120px] 
              laptop:h-[120px] laptop:min-h-[120px] p-2 outline-secondary-stroke outline-1"
                >
                  <Image
                    src={ENVIRONMENT.API_URL + qr}
                    alt="Hero Image"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </figure>
              )}
              <div className="flex flex-col justify-between max-w-[240px]">
                <div className="flex flex-col">
                  <span className="text-terciary-foreground text-[12px] font-montserrat leading-[200%]">
                    Project Number
                  </span>
                  <p className="text-accent-foreground text-[18px] font-medium leading-[160%] tracking-[-0.4px]">
                    {projectNumber || "XXXXXX"}
                  </p>
                </div>
                <p
                  className="max-w-[300px] laptop:max-w-full line-clamp-3 text-balance 
                text-terciary-foreground text-[12px] font-montserrat leading-[180%]"
                >
                  This property listing has been reviewed and verified by Dubai
                  Land Department
                </p>
              </div>
            </AnimationReveal>
          </div>
        </article>
        <AboutPropertyForm
          location={location || ""}
          projectId={projectId || ""}
        />
        {projectNumber && (
          <div className="flex laptop:hidden flex-row gap-5">
            {qr && (
              <figure
                className="relative min-w-[136px] h-[136px] laptop:min-w-[120px] laptop:w-[120px] 
                laptop:h-[120px] laptop:min-h-[120px] p-2 outline-secondary-stroke outline-1"
              >
                <Image
                  src={ENVIRONMENT.API_URL + qr}
                  alt="Hero Image"
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(150, 150)
                  )}`}
                />
              </figure>
            )}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-[2px]">
                <span className="text-terciary-foreground text-[12px] font-montserrat leading-[180%]">
                  Project Number
                </span>
                <p className="text-accent-foreground big-lowercase leading-[160%] tracking-[-0.4px]">
                  {projectNumber || "XXXXXX"}
                </p>
              </div>
              <p
                className="max-w-[300px] laptop:max-w-full line-clamp-3 text-balance 
                  text-terciary-foreground text-[12px] font-montserrat leading-[180%]"
              >
                This property listing has been reviewed and verified by Dubai
                Land Department
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
