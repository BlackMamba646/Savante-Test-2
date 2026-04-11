import { Binghatti } from "@/components/shared/icons/partners/binghatti";
import { Damac } from "@/components/shared/icons/partners/damac";
import { Danube } from "@/components/shared/icons/partners/danube";
import { DubaiProperties } from "@/components/shared/icons/partners/dubai-properties";
import { Ellington } from "@/components/shared/icons/partners/ellington";
import { Emaar } from "@/components/shared/icons/partners/emaar";
import { Meraas } from "@/components/shared/icons/partners/meraas";
import { Nakheel } from "@/components/shared/icons/partners/nakheel";
import { Sobha } from "@/components/shared/icons/partners/sobha";

const logos = [
  Emaar,
  Nakheel,
  Damac,
  DubaiProperties,
  Sobha,
  Meraas,
  Ellington,
  Binghatti,
  Danube,
];

export const DevelopersLogos = () => {
  return (
    <section id='brands-carousel' className='bg-transparent overflow-hidden'>
      <div className='max-w-full laptop:max-w-[2000px] mx-auto flex flex-col py-[24px] laptop:px-[112px] gap-2.5 tablet:gap-4'>
        <p className='self-center text-terciary-foreground text-[12px] font-semibold uppercase text-center leading-[180%] tracking-wide'>
          We work with
        </p>
        <div className='logos h-[44px] relative'>

          <div
            className='hidden tablet:block absolute inset-0 pointer-events-none z-10'
            style={{
              background:
                "linear-gradient(90deg, var(--Background-Surface, #FFF) 0%, var(--color-stops-mode-0, rgba(255, 255, 255, 0.00)) 50%, var(--Background-Surface, #FFF) 100%)",
            }}
          ></div>
          <div
            className='block tablet:hidden absolute inset-0 pointer-events-none z-10'
            style={{
              background:
                "linear-gradient(90deg, var(--Background-Surface, #FFF) 0%, var(--color-stops-mode-0, rgba(255, 255, 255, 0.00)) 50%, var(--Background-Surface, #FFF) 100%)",
            }}
          ></div>
          <div className='logo_items inline-flex gap-[24px] tablet:gap-10'>
            {[...logos, ...logos, ...logos].map((LogoComponent, index) => (
              <div key={index} className='flex-shrink-0'>
                <LogoComponent />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
