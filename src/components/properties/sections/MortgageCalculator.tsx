"use client";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { ENVIRONMENT } from "@/config/env.config";
import { formatFeatures } from "@/utils/utils";
import { useMortgageCalculator } from "@/hooks/use-mortgage-calcultator";
import { PropertyMortgageModal } from "@/components/common/modal/PropertyMortgageModal";
import { MortgageSlider } from "../MortgageSlider";
import { Button } from "@/components/ui/button";
import { TextButton } from "@/components/common/button/TextButton";
import { Info } from "@/components/common/text/Info";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface MortgageCalculatorProps {
  title?: string;
  initialAmount?: number;
  currencyCode?: string;
  propertyName?: string;
  propertyId?: number;
  onPress?: () => void;
}

export const MortgageCalculator = ({
  title = "Mortgage Calculator",
  initialAmount,
  currencyCode = "AED",
  propertyName,
  propertyId,
  onPress,
}: MortgageCalculatorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mortgageState, setMortgageState] = useState({
    amount: String(initialAmount || 0),
    downPayment: String(ENVIRONMENT.CAL_DEFAULT_DOWN_PAYMENT),
    interest: String(ENVIRONMENT.CAL_DEFAULT_INTEREST),
    years: String(ENVIRONMENT.CAL_DEFAULT_YEARS),
  });

  const calculator = useMortgageCalculator({
    amount: mortgageState.amount,
    downPayment: mortgageState.downPayment,
    interestRate: mortgageState.interest,
    loanTerm: mortgageState.years,
  });

  const formatCurrency = (value: number | string) => {
    return formatFeatures.formatCurrency(Number(value));
  };

  return (
    <div className='relative dark w-full dark'>
      <PropertyMortgageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyName={propertyName}
        totalLoanAmount={Number(calculator.totalLoanAmount) || 0}
        message={`Property mortgage inquiry for ${propertyName}`}
      />

      <figure className='absolute inset-0 z-0'>
        <Image
          src={"/images/properties/mortgage-background.webp"}
          alt='Hero service background'
          fill
          priority={true}
          className='object-cover'
          sizes='100vw'
        />
      </figure>

      <div
        className='block absolute inset-0 z-5'
        style={{
          background: `linear-gradient(270deg, var(--color-stops-gray-50, rgba(0, 0, 0, 0.50)) 0%, var(--color-stops-gray-80, #000) 100%)`,
        }}
      ></div>

      <div
        className='spacing-padding-y spacing-padding-x max-w-[1440px] mx-auto flex flex-col gap-9 
      tablet:gap-10 z-50 relative'
      >
        <div
          className='flex flex-col-reverse tablet:flex-row justify-auto px-0 laptop:spacing-padding-x
          tablet:justify-between items-start tablet:items-center w-full gap-1 tablet:gap-0'
        >
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.1}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='h2'
            className='text-primary-foreground leading-[120%] tracking-[-1.38px]'
          >
            {title}
          </AnimationReveal>
          <div className='invisible flex tablet:hidden laptop:flex flex-row gap-3 items-center'>
            <span className='text-terciary-foreground text-[14px] leading-[180%]'>
              Currency
            </span>
            <button
              className='cursor-pointer rounded-lg py-1 px-1 tablet:py-2 tablet:px-4 flex flex-row gap-2 items-center justify-between 
              border-[1px] border-transparent hover:border-secondary-stroke/80 transition-colors duration-200 w-full'
            >
              <span className='text-[14px] leading-[180%] text-secondary-foreground'>
                {currencyCode}
              </span>
              <figure className='text-icon-secondary-button'>
                <CaretArrow size={10} />
              </figure>
            </button>
          </div>
        </div>
        <div
          className='flex flex-col-reverse laptop:flex-row gap-10 tablet:gap-10 laptop:gap-16 px-0 
        laptop:spacing-padding-x'
        >
          <AnimationReveal
            x={0}
            y={0}
            delay={0.3}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='flex-1 flex flex-col gap-5'
          >
            <div className='flex flex-col gap-0'>
              <p className='text-xs leading-[200%] text-terciary-foreground'>
                Loan Amount ({currencyCode})
              </p>
              <div className='flex flex-row justify-between w-full'>
                <span className='quote-text leading-[140%] text-primary-foreground font-semibold tracking-[-0.4px]'>
                  {formatCurrency(mortgageState.amount)}
                </span>
              </div>
              <MortgageSlider
                value={[Number(mortgageState.amount)]}
                onValueChange={(value) =>
                  setMortgageState({
                    ...mortgageState,
                    amount: String(value[0]),
                  })
                }
                min={((initialAmount || 0) * 50) / 100}
                max={((initialAmount || 0) * 150) / 100}
                step={10000}
              />
              <div className='flex flex-row justify-between w-full'>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {formatCurrency(((initialAmount || 0) * 50) / 100)}{" "}
                  {currencyCode}
                </span>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {formatCurrency(((initialAmount || 0) * 150) / 100)}{" "}
                  {currencyCode}
                </span>
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-xs leading-[200%] text-terciary-foreground'>
                Down Payment ({currencyCode})
              </p>
              <div className='flex flex-row justify-between w-full'>
                <span className='quote-text leading-[140%] text-primary-foreground font-semibold tracking-[-0.4px]'>
                  {formatCurrency(calculator.totalDownPayment || 0)}
                </span>
                <span className='quote-text leading-[140%] text-primary-foreground font-semibold tracking-[-0.4px]'>
                  {mortgageState.downPayment}%
                </span>
              </div>
              <MortgageSlider
                value={[Number(mortgageState.downPayment)]}
                onValueChange={(value) =>
                  setMortgageState({
                    ...mortgageState,
                    downPayment: String(value[0]),
                  })
                }
                min={10}
                max={90}
                step={5}
              />
              <div className='flex flex-row justify-between w-full'>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {formatCurrency((Number(mortgageState.amount) * 10) / 100)}{" "}
                  {currencyCode}
                </span>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {formatCurrency((Number(mortgageState.amount) * 90) / 100)}{" "}
                  {currencyCode}
                </span>
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-xs leading-[200%] text-terciary-foreground'>
                Loan Period (Years)
              </p>
              <div className='flex flex-row justify-between w-full'>
                <span className='quote-text leading-[140%] text-primary-foreground font-semibold tracking-[-0.4px]'>
                  {mortgageState.years}
                </span>
              </div>
              <MortgageSlider
                value={[Number(mortgageState.years)]}
                onValueChange={(value) =>
                  setMortgageState({
                    ...mortgageState,
                    years: String(value[0]),
                  })
                }
                min={ENVIRONMENT.CAL_MIN_YEARS}
                max={ENVIRONMENT.CAL_MAX_YEARS}
                step={1}
              />
              <div className='flex flex-row justify-between w-full'>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {ENVIRONMENT.CAL_MIN_YEARS} Years
                </span>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {ENVIRONMENT.CAL_MAX_YEARS} Years
                </span>
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-xs leading-[200%] text-terciary-foreground'>
                Interest Rate (%)
              </p>
              <div className='flex flex-row justify-between w-full'>
                <span className='quote-text leading-[140%] text-primary-foreground font-semibold tracking-[-0.4px]'>
                  {mortgageState.interest}%
                </span>
              </div>
              <MortgageSlider
                value={[Number(mortgageState.interest)]}
                onValueChange={(value) =>
                  setMortgageState({
                    ...mortgageState,
                    interest: String(value[0]),
                  })
                }
                min={ENVIRONMENT.CAL_MIN_INTEREST}
                max={ENVIRONMENT.CAL_MAX_INTEREST}
                step={1}
              />
              <div className='flex flex-row justify-between w-full'>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {ENVIRONMENT.CAL_MIN_INTEREST}%
                </span>
                <span className='text-[11px] leading-[180%] text-terciary-foreground font-medium tracking-[0.6px]'>
                  {ENVIRONMENT.CAL_MAX_INTEREST}%
                </span>
              </div>
            </div>
          </AnimationReveal>
          <article
            className='self-center w-full laptop:w-[550px] flex flex-col bg-surface-container-background h-max 
          dark mortgage-calculator-form backdrop-blur-[20px] rounded-3xl overflow-hidden'
          >
            <div className='flex gap-0 py-4 tablet:py-6 px-[20px] tablet:px-[26px] laptop:px-10 bg-on-surface-background'>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='w-full flex flex-col items-start'>
                  <p className='text-[12px] leading-[200%] text-terciary-foreground font-[400]'>
                    Monthly Payment
                  </p>
                  <h4 className='leading-[120%] text-accent-foreground tracking-[-1.08px]'>
                    {formatFeatures.formatCurrency(
                      Number(calculator.monthlyPayment || 0)
                    )}{" "}
                    {currencyCode}
                  </h4>
                </div>
                <TextButton
                  text='Send Application'
                  customClassName='btn-primary-dark-fill-variant min-w-max rounded-full 
            overflow-hidden justify-center py-3 px-6 hidden tablet:flex laptop:hidden'
                  textClassName='uppercase text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button [&_figure]:icon-primary-button'
                  showRightIcon={true}
                  rightIcon={ArrowUpRight}
                  animateIcon={false}
                  iconClassName='size-[18px]!'
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>
            <div className='flex flex-col gap-[40px] py-[26px] tablet:py-[40px] px-[20px] tablet:px-[34px]'>
              <ul className='flex flex-col tablet:flex-row gap-2 tablet:gap-10 w-full tablet:w-auto'>
                <Info
                  label='Total Loan Amount'
                  type='number'
                  value={
                    formatCurrency(calculator.totalLoanAmount || "N/A") +
                    " " +
                    currencyCode
                  }
                  className='flex-1 tablet:[&_p]:self-start w-full justify-between items-center'
                />
                <Info
                  label='Interest'
                  type='text'
                  value={
                    mortgageState.interest
                      ? mortgageState.interest + " " + "%"
                      : "N/A"
                  }
                  className='tablet:w-max tablet:[&_p]:self-start w-full justify-between items-center'
                />
                <Info
                  label='Load Period'
                  type='text'
                  value={
                    mortgageState.downPayment
                      ? mortgageState.downPayment + " " + "Years"
                      : "N/A"
                  }
                  className='tablet:w-max tablet:[&_p]:self-start w-full justify-between items-center last:flex'
                />
              </ul>
              <AnimationReveal
                x={0}
                y={0}
                delay={0.5}
                duration={0.3}
                opacity={1}
                whileInView={true}
                type='div'
                className='hidden laptop:flex'
              >
                <TextButton
                  text='Send Application'
                  customClassName='btn-primary-dark-fill-variant w-full rounded-full 
            overflow-hidden justify-center py-3 px-6'
                  textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button [&_figure]:icon-primary-button'
                  showRightIcon={true}
                  rightIcon={ArrowUpRight}
                  iconClassName='size-[18px]!'
                  onClick={() => setIsModalOpen(true)}
                />
              </AnimationReveal>
            </div>
          </article>
        </div>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.5}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='div'
          className='flex tablet:hidden'
        >
          <TextButton
            text='Send Application'
            customClassName='btn-primary-dark-fill-variant w-full rounded-full 
            overflow-hidden justify-center py-3 px-6'
            textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] font-medium whitespace-nowrap
              **:text-primary-button [&_figure]:icon-primary-button'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={false}
            iconClassName='size-[18px]!'
            onClick={() => setIsModalOpen(true)}
          />
        </AnimationReveal>
      </div>
    </div>
  );
};
