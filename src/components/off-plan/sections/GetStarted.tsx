"use client";
import { TextButton } from "@/components/common/button/TextButton";
import { StepCard } from "@/components/common/card/StepCard";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { LogoSmall } from "@/components/shared/icons/logo/logo-small";
import { SmallLogo } from "@/components/shared/icons/logo/small-logo";
import { stepsData } from "@/data/steps";
import React, { useState, useEffect, useRef } from "react";

export const GetStarted = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const prevProgressRef = useRef(0);
  
  // Estado para mantener las cards que ya fueron activadas (permanente)
  const [activatedCards, setActivatedCards] = useState<Record<number, boolean>>({});

  // Efecto para activar cards cuando el scroll las alcanza (solo una vez)
  useEffect(() => {
    const totalCards = stepsData.length;
    const segmentSize = 100 / totalCards;

    for (let i = 1; i <= totalCards; i++) {
      const activationThreshold = i * segmentSize;
      // Solo activar si no está ya activada y el scroll ha llegado
      if (!activatedCards[i] && scrollProgress >= activationThreshold) {
        setActivatedCards(prev => ({ ...prev, [i]: true }));
      }
    }
  }, [scrollProgress, activatedCards]);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;

      const rect = listRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      if (elementTop < windowHeight && rect.bottom > 0) {
        const progress = ((windowHeight - elementTop) / elementHeight) * 100;
        const clampedProgress = Math.max(0, Math.min(100, progress));

        setIsScrollingDown(clampedProgress > prevProgressRef.current);
        prevProgressRef.current = clampedProgress;

        setScrollProgress(clampedProgress);
      } else if (elementTop >= windowHeight) {
        setScrollProgress(0);
        prevProgressRef.current = 0;
      } else if (rect.bottom <= 0) {
        setScrollProgress(100);
        prevProgressRef.current = 100;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className='bg-transparent'>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <div
        className='max-w-[1440px] flex laptop:flex-row justify-center mx-auto spacing-padding-x spacing-gap laptop:gap-[80px]
        spacing-padding-y flex-col'
      >
        <aside
          className='self-start flex flex-col tablet:flex-row laptop:flex-col gap-[26px] max-w-full laptop:max-w-[500px] items-start 
          relative laptop:sticky top-0 laptop:top-[84px] justify-between laptop:justify-start w-full laptop:w-auto'
        >
          <div className='flex flex-col gap-[26px] items-start w-full laptop:w-auto'>
            <figure className='block relative h-[32px] laptop:h-[44px]'>
              <SmallLogo />
            </figure>
            <div className='flex flex-col gap-1'>
              <h4 className='text-primary-foreground font-medium leading-[120%] tracking-[-1.08px]'>
                Ready to get started?
              </h4>
              <p className='text-[14px] text-terciary-foreground leading-[180%]'>
                Claim your free consultation and let’s find the perfect
                opportunity for you.
              </p>
            </div>
            <TextButton
              type='submit'
              text={"Claim your free consultation"}
              textClassName='uppercase text-[12px] font-medium tracking-[0.96px]'
              state={"default"}
              customClassName='btn-primary-fill-variant justify-center w-full tablet:w-max flex tablet:hidden laptop:flex
              py-3 px-6 rounded-4xl'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              animateIcon={true}
              onClick={() => setIsContactModalOpen(true)}
            />
          </div>
          <TextButton
            type='submit'
            text={"Claim your free consultation"}
            textClassName='uppercase text-[12px] font-medium tracking-[0.96px] overflow-hidden whitespace-nowrap'
            state={"default"}
            customClassName='btn-primary-fill-variant justify-center w-max py-3 px-6 rounded-4xl
            hidden tablet:flex laptop:hidden self-end'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            iconClassName='size-[18px]!'
            animateIcon={true}
            iconAnimation={"rotate"}
            onClick={() => setIsContactModalOpen(true)}
          />
        </aside>
        <ul
          ref={listRef}
          className='flex flex-col gap-2 relative overflow-hidden max-w-full laptop:max-w-[600px]'
        >
          {/* Línea de progreso horizontal */}
          <div className='block absolute left-[3px] top-0 -bottom-6 w-0.5 bg-secondary-stroke/80 z-10'>
            <div
              className='w-full bg-accent-foreground'
              style={{
                height: `calc(${scrollProgress}% - 30px)`,
                transition: isScrollingDown
                  ? "height 2000ms cubic-bezier(0.48, 1, 0.68, 1)"
                  : "height 500ms ease-out",
              }}
            ></div>
          </div>
          {stepsData.map((step) => (
            <StepCard
              key={step.index}
              {...step}
              isActive={activatedCards[step.index] ?? false}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
