import React from "react";
import { Guy } from "../Guy";

export const FromStruggleToPurpose = () => {
  return (
    <section className='relative overflow-hidden'>
      <div
        className='max-w-[1440px] mx-auto flex flex-col spacing-padding-x spacing-padding-y gap-[24px]
        items-start laptop:items-center'
      >
        <figure className='relative animate-fade-in delay-200 duration-300'>
          <Guy />
        </figure>
        <h2
          className='text-primary-foreground tracking-[-1.38px] font-crimson max-w-[700px]
          text-start laptop:text-center animate-fade-in-up animate-distance-xs delay-400 duration-300'
        >
          From Personal Struggle to Purpose-Driven Advisory
        </h2>
        <div className='flex flex-col laptop:flex-row gap-5 max-w-[1000px]'>
          <p className='flex-1 text-terciary-foreground text-[15px] leading-[180%] font-normal tracking-normal
          animate-fade-in delay-600 duration-300'>
            After graduating with a degree in Business Management, Zayyan faced
            a challenging period marked by financial pressure, uncertainty, and
            personal setbacks. That experience became a turning point.
          </p>
          <p className='flex-1 text-terciary-foreground text-[15px] leading-[180%] font-normal tracking-normal
          animate-fade-in delay-800 duration-300'>
            Through sales and consulting roles, he rebuilt confidence, developed
            high-level communication skills, and began studying real estate as a
            long-term vehicle for stability and wealth creation.
          </p>
        </div>
      </div>
    </section>
  );
};
