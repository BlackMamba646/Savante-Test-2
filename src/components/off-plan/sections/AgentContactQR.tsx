import { AboutPropertyForm } from "@/components/off-plan/AboutPropertyForm";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ENVIRONMENT } from "@/config/env.config";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";
import React from "react";

interface AgentContactQRProps {
  projectId?: string;
  mainImage?: string;
  location?: string;
  projectNumber?: string;
  qr?: string;
  agentImage?: string;
}

export const AgentContactQR = ({
  projectId,
  mainImage,
  location,
  projectNumber,
  qr,
  agentImage,
}: AgentContactQRProps) => {
  return (
    <section id='contact-qr' className='relative overflow-hidden'>
      <div
        className='relative max-w-[1440px] w-full mx-auto flex flex-col-reverse
      laptop:flex-row spacing-padding-x spacing-padding-y spacing-gap z-10'
      >
        <article className='flex-1 flex flex-row justify-between max-w-full laptop:max-w-[560px] -space-x-[112px]'>
          <div className='flex flex-col gap-5 px-0 py-0 tablet:px-2.5 tablet:py-5'>
            <div className='flex flex-row gap-4'>
              {qr && (
                <figure
                  className='relative min-w-[108px] h-[108px] laptop:min-w-[120px] laptop:w-[120px] 
              laptop:h-[120px] laptop:min-h-[120px] p-2 outline-secondary-stroke outline-1'
                >
                  <Image
                    src={ENVIRONMENT.API_URL + qr}
                    alt='Hero Image'
                    width={150}
                    height={150}
                    className='object-cover w-full h-full'
                  />
                </figure>
              )}
              <div className='flex flex-col justify-between'>
                <div className='flex flex-col'>
                  <span className='text-terciary-foreground text-[12px] font-montserrat leading-[200%]'>
                    Project Number
                  </span>
                  <p className='text-accent-foreground text-[18px] font-medium leading-[160%] tracking-[-0.4px]'>
                    {projectNumber || "XXXXXX"}
                  </p>
                </div>
                <p
                  className='block tablet:hidden max-w-[300px] laptop:max-w-full line-clamp-3 text-balance 
                text-terciary-foreground text-[12px] font-montserrat leading-[180%]'
                >
                  This property listing has been reviewed and verified by Dubai
                  Land Department
                </p>
              </div>
            </div>
            <div className='hidden tablet:flex flex-col justify-between max-w-[240px]'>
              <p
                className='max-w-[300px] laptop:max-w-full line-clamp-3 text-balance 
                text-terciary-foreground text-[12px] font-montserrat leading-[180%]'
              >
                This property listing has been reviewed and verified by Dubai
                Land Department
              </p>
            </div>
          </div>
          <figure className='hidden tablet:block flex-1 relative h-[420px] max-w-[420px] laptop:max-w-full'>
            <Image
              src={agentImage || ""}
              alt='Agent Image'
              width={560}
              height={420}
              className='agent-image object-contain w-full h-full'
            />
          </figure>
        </article>
        <AboutPropertyForm
          location={location || ""}
          projectId={projectId || ""}
        />
        <header className='flex laptop:hidden flex-col gap-1'>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.3}
            duration={0.3}
            type='p'
            opacity={1}
            className='text-secondary font-medium text-[10px] leading-[160%] 
          uppercase tracking-[0.6px]'
          >
            {location}
          </AnimationReveal>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.4}
            duration={0.5}
            type='h3'
            opacity={1}
            className='text-primary-foreground font-medium leading-[120%] tracking-[-1.2px]'
          >
            Need more info about this property?
          </AnimationReveal>
        </header>
      </div>
    </section>
  );
};
