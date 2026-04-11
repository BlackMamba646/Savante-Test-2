"use client";
import { WhyChooseUsCard } from "@/components/common/card/WhyChooseUsCard";
import { Buildings } from "@/components/shared/icons/buildings";
import { CraneTower } from "@/components/shared/icons/crane-tower";
import { Handshake } from "@/components/shared/icons/handshake";
import { IdentificationBadge } from "@/components/shared/icons/identification-badge";
import { SealCheck } from "@/components/shared/icons/seal-check";
import { Target } from "@/components/shared/icons/target";
import { ThumbsUp } from "@/components/shared/icons/thumbs-up";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { WhyUs } from "@/interfaces";
import React, { useEffect, useRef, useState } from "react";

interface WhyChooseUsProps {
  page?: WhyUs;
  theme?: "light" | "dark";
}

export const WhyChooseUs = ({ page, theme = "light" }: WhyChooseUsProps) => {
  const icons = [
    <IdentificationBadge size={20} key='icon-0' />,
    <CraneTower size={20} key='icon-1' />,
    <SealCheck size={20} key='icon-2' />,
    <Target size={20} key='icon-3' />,
    <ThumbsUp size={20} key='icon-4' />,
    <Handshake size={20} key='icon-5' />,
  ];

  const listRef = useRef<HTMLUListElement>(null);
  const prevProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activatedCards, setActivatedCards] = useState<Record<number, boolean>>({});

  const totalCards = page?.About_item?.length ?? 0;

  useEffect(() => {
    const totalSegments = totalCards;
    const segmentSize = 100 / (totalSegments || 1);
    for (let i = 1; i <= totalSegments; i++) {
      const threshold = i * segmentSize;
      if (!activatedCards[i] && scrollProgress >= threshold) {
        setActivatedCards((prev) => ({ ...prev, [i]: true }));
      }
    }
  }, [scrollProgress, totalCards]);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;
      const rect = listRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom <= 0) {
        setScrollProgress(100);
        prevProgressRef.current = 100;
        return;
      }
      if (rect.top >= windowHeight) {
        setScrollProgress(0);
        prevProgressRef.current = 0;
        return;
      }
      const progress = ((windowHeight - rect.top) / rect.height) * 100;
      const clamped = Math.max(0, Math.min(100, progress));
      prevProgressRef.current = clamped;
      setScrollProgress(clamped);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`relative overflow-hidden ${theme === "light"
        ? "light bg-surface-background"
        : "dark bg-surface-container-background"
        }`}
    >
      <div
        className='relative max-w-[1440px] mx-auto flex flex-col spacing-padding-y spacing-padding-x 
        spacing-gap'
      >
        <header className='flex flex-col laptop:flex-row pt-0 laptop:pt-[24px] gap-1'>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.5}
            duration={0.3}
            opacity={1}
            type='div'
            className='flex-1 flex flex-col gap-1'
          >
            <p
              className='text-terciary-foreground text-[12px] font-medium leading-[180%] 
              tracking-[0.96px] uppercase hidden tablet:block'
            >
              Savante Realty goes beyond traditional real estate advisory.
            </p>
            <h2 className='text-primary-foreground tracking-[-1.38px]'>
              Why Choose Savante Realty
            </h2>
          </AnimationReveal>
        </header>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.7}
          duration={0.3}
          opacity={1}
          type='p'
          className='text-terciary-foreground text-[15px] font-normal leading-[180%] tracking-normal max-w-[480px]'
        >
          We provide a complete 360° service designed to support investors,
          relocators, and business owners from the moment they inquire to long
          after their property is delivered.
        </AnimationReveal>
        <ul
          ref={listRef}
          className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 grid-rows-[auto] tablet:gap-x-[16px] tablet:gap-y-[20px]
        laptop:gap-x-[24px] laptop:gap-y-[40px] gap-x-[24px] gap-y-[24px]'
        >
          {page?.About_item?.map((item, index) => (
            <WhyChooseUsCard
              key={item.id}
              index={index + 1}
              icon={icons[index] || <Buildings size={20} />}
              title={item.Title}
              description={item.Paragraph}
              disableAnimation={true}
              isActive={activatedCards[index + 1] ?? false}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
