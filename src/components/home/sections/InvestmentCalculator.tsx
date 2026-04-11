"use client";
import { BigStatsLeft } from "@/components/common/text/BigStatsLeft";
import { InfoValueUp } from "../InfoValueUp";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { RangeCalculator } from "@/components/common/input/RangeCalculator";
import { ENVIRONMENT } from "@/config/env.config";
import { useState, useMemo } from "react";
import { NumberInput } from "@/components/common/input/NumberInput";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { formatFeatures } from "@/utils/utils";
import { AnimationReveal } from "@/components/ui/animation-reveal";

type CalculatorType = "ROI" | "ROE" | "MORTGAGE";

export const InvestmentCalculator = () => {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>("ROI");
  const [propertyValue, setPropertyValue] = useState<number>(600000);
  const [downPayment, setDownPayment] = useState<number>(10);
  const [duringConstruction, setDuringConstruction] = useState<number>(60);
  const [onHandover, setOnHandover] = useState<number>(30);
  const [constructionPeriod, setConstructionPeriod] = useState<number>(3);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(6);

  // Mortgage-specific states
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(25);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // ROI Calculation
  const roiCalculations = useMemo(() => {
    const downPaymentAmount = (propertyValue * downPayment) / 100;
    const appreciationRate = annualAppreciation / 100;
    const futureValue =
      propertyValue * Math.pow(1 + appreciationRate, constructionPeriod);
    const totalGain = futureValue - propertyValue;
    const roi = (totalGain / downPaymentAmount) * 100;
    const monthlyPayment =
      (propertyValue * duringConstruction) / 100 / (constructionPeriod * 12);

    return {
      roi: roi.toFixed(1),
      capitalGain: totalGain.toFixed(0),
      initialValue: propertyValue.toFixed(0),
      completionValue: futureValue.toFixed(0),
      monthlyPayment: monthlyPayment.toFixed(0),
    };
  }, [
    propertyValue,
    downPayment,
    duringConstruction,
    constructionPeriod,
    annualAppreciation,
  ]);

  // ROE Calculation (Return on Equity)
  const roeCalculations = useMemo(() => {
    const downPaymentAmount = (propertyValue * downPayment) / 100;
    const equityInvested = downPaymentAmount;
    const appreciationRate = annualAppreciation / 100;
    const futureValue =
      propertyValue * Math.pow(1 + appreciationRate, constructionPeriod);
    const totalGain = futureValue - propertyValue;
    const roe = (totalGain / equityInvested) * 100;
    const monthlyPayment =
      (propertyValue * duringConstruction) / 100 / (constructionPeriod * 12);

    return {
      roe: roe.toFixed(1),
      equityGain: totalGain.toFixed(0),
      initialValue: propertyValue.toFixed(0),
      futureValue: futureValue.toFixed(0),
      monthlyPayment: monthlyPayment.toFixed(0),
    };
  }, [
    propertyValue,
    downPayment,
    duringConstruction,
    constructionPeriod,
    annualAppreciation,
  ]);

  // Mortgage Calculation
  const mortgageCalculations = useMemo(() => {
    const principal = propertyValue * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const downPaymentAmount = (propertyValue * downPayment) / 100;

    return {
      monthlyPayment: monthlyPayment.toFixed(0),
      totalPayment: totalPayment.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      principal: principal.toFixed(0),
      downPaymentAmount: downPaymentAmount.toFixed(0),
    };
  }, [propertyValue, downPayment, interestRate, loanTerm]);

  const getDisplayValues = () => {
    switch (calculatorType) {
      case "ROI":
        return {
          mainTitle: "Total ROI at Completion",
          mainValue: `${roiCalculations.roi}%`,
          secondaryLabel: "Capital Gain",
          secondaryValue: `${formatFeatures.formatCurrency(
            Number(roiCalculations.capitalGain)
          )} ${ENVIRONMENT.CURRENCY}`,
          items: [
            {
              label: "Initial Value",
              value: `${formatFeatures.formatCurrency(
                Number(roiCalculations.initialValue)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
            {
              label: "Completion Value",
              value: `${formatFeatures.formatCurrency(
                Number(roiCalculations.completionValue)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
            {
              label: "Monthly Payments",
              value: `${formatFeatures.formatCurrency(
                Number(roiCalculations.monthlyPayment)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
          ],
        };
      case "ROE":
        return {
          mainTitle: "Return on Equity",
          mainValue: `${roeCalculations.roe}%`,
          secondaryLabel: "Equity Gain",
          secondaryValue: `${formatFeatures.formatCurrency(
            Number(roeCalculations.equityGain)
          )} ${ENVIRONMENT.CURRENCY}`,
          items: [
            {
              label: "Initial Value",
              value: `${formatFeatures.formatCurrency(
                Number(roeCalculations.initialValue)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
            {
              label: "Future Value",
              value: `${formatFeatures.formatCurrency(
                Number(roeCalculations.futureValue)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
            {
              label: "Monthly Payments",
              value: `${formatFeatures.formatCurrency(
                Number(roeCalculations.monthlyPayment)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
          ],
        };
      case "MORTGAGE":
        return {
          mainTitle: `Monthly Payment (${ENVIRONMENT.CURRENCY})`,
          mainValue: `${formatFeatures.formatCurrency(
            Number(mortgageCalculations.monthlyPayment)
          )}`,
          secondaryLabel: "Total Interest",
          secondaryValue: `${formatFeatures.formatCurrency(
            Number(mortgageCalculations.totalInterest)
          )} ${ENVIRONMENT.CURRENCY}`,
          items: [
            {
              label: "Down Payment",
              value: `${formatFeatures.formatCurrency(
                Number(mortgageCalculations.downPaymentAmount)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
            {
              label: "Loan Amount",
              value: `${formatFeatures.formatCurrency(
                Number(mortgageCalculations.principal)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
            {
              label: "Total Payment",
              value: `${formatFeatures.formatCurrency(
                Number(mortgageCalculations.totalPayment)
              )} ${ENVIRONMENT.CURRENCY}`,
            },
          ],
        };
    }
  };

  const displayValues = getDisplayValues();

  return (
    <section className='relative bg-surface-background overflow-hidden'>
      <div
        className='relative flex flex-col-reverse tablet:flex-col laptop:flex-row gap-3 tablet:gap-10 
        spacing-padding-x spacing-padding-y max-w-[1440px] mx-auto'
      >
        <div className='pt-3 tablet:pt-0 flex-1 flex flex-col gap-4 tablet:gap-5 self-stretch laptop:self-center'>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.2}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='flex-1 hidden tablet:flex flex-col gap-1'
          >
            <p
              className='text-terciary-foreground text-[10px] tablet:text-[12px] font-medium leading-[180%] 
              tracking-[0.96px] uppercase'
            >
              Visualize your property investment returns
            </p>
            <h2 className='text-primary-foreground tracking-[-1.38px]'>
              Investment Calculator
            </h2>
          </AnimationReveal>

          {/* Calculator Type Tabs */}
          <AnimationReveal
            x={0}
            y={5}
            delay={0.4}
            duration={0.3}
            opacity={1}
            whileInView={true}
            type='div'
            className='flex flex-row gap-0 p-1 bg-surface-container-background rounded-full w-fit'
          >
            {(["ROI", "ROE", "MORTGAGE"] as CalculatorType[]).map((type) => (
              <button
                key={type}
                onClick={() => setCalculatorType(type)}
                className={` and-full py-2 px-4 tablet:px-6 rounded-full text-[12px] font-medium uppercase 
                  tracking-[0.96px] transition-all duration-300 ${
                    calculatorType === type
                      ? "bg-primary-foreground text-white"
                      : "bg-transparent text-secondary-foreground hover:text-primary-foreground"
                  }`}
              >
                {type}
              </button>
            ))}
          </AnimationReveal>

          <div className='flex flex-row gap-5 w-full'>
            <RangeCalculator
              label={`Investment Value (${ENVIRONMENT.CURRENCY})`}
              value={propertyValue}
              minValue={300000}
              maxValue={50000000}
              step={100000}
              onValueChange={(value) => setPropertyValue(value)}
            />
            <NumberInput
              label='Down Payment'
              placeholder='10'
              valueMeasure='%'
              className='self-start max-w-[200px] hidden tablet:flex'
              value={downPayment}
              onChange={setDownPayment}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div
            className='grid grid-cols-2 grid-rows-[auto] tablet:flex flex-row gap-x-2 tablet:gap-x-4 
          gap-y-4 w-full animate-fade-in'
            key={calculatorType}
          >
            <NumberInput
              label='Down Payment'
              placeholder='10'
              valueMeasure='%'
              className='flex-1 flex tablet:hidden order-1'
              value={downPayment}
              onChange={setDownPayment}
              min={0}
              max={100}
              step={1}
            />

            {calculatorType !== "MORTGAGE" && (
              <>
                <NumberInput
                  label='During construction'
                  placeholder='60'
                  valueMeasure='%'
                  className='flex-1 order-2'
                  value={duringConstruction}
                  onChange={setDuringConstruction}
                  min={0}
                  max={100}
                  step={1}
                />
                <NumberInput
                  label='On handover'
                  placeholder='30'
                  valueMeasure='%'
                  className='flex-1 order-3'
                  value={onHandover}
                  onChange={setOnHandover}
                  min={0}
                  max={100}
                  step={1}
                />
                <NumberInput
                  label='Construction period'
                  placeholder='3'
                  valueMeasure='Years'
                  className='flex-1 [&_span]:text-[13.5px] col-span-2 tablet:col-span-full order-5 tablet:order-4'
                  value={constructionPeriod}
                  onChange={setConstructionPeriod}
                  min={1}
                  max={10}
                  step={1}
                />
                <NumberInput
                  label='Annual appreciation'
                  placeholder='6'
                  valueMeasure='%'
                  className='flex-1 order-4 tablet:order-5'
                  value={annualAppreciation}
                  onChange={setAnnualAppreciation}
                  min={0}
                  max={20}
                  step={0.5}
                />
              </>
            )}

            {calculatorType === "MORTGAGE" && (
              <>
                <NumberInput
                  label='Interest Rate'
                  placeholder='4.5'
                  valueMeasure='%'
                  className='flex-1 order-2'
                  value={interestRate}
                  onChange={setInterestRate}
                  min={0}
                  max={15}
                  step={0.1}
                />
                <NumberInput
                  label='Loan Term'
                  placeholder='25'
                  valueMeasure='Years'
                  className='flex-1 order-3 col-span-2 tablet:col-span-1'
                  value={loanTerm}
                  onChange={setLoanTerm}
                  min={1}
                  max={30}
                  step={1}
                />
              </>
            )}
          </div>
        </div>
        <AnimationReveal
          x={0}
          y={5}
          delay={0.5}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='div'
          className='flex tablet:hidden'
        >
          <TextButton
            text='Talk to an Expert'
            state='default'
            customClassName='btn-primary-fill-variant w-full rounded-full 
            overflow-hidden justify-center py-3 px-6 uppercase
            tracking-[0.96px] font-medium whitespace-nowrap cursor-pointer'
            textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={true}
            onClick={() => setIsContactModalOpen(true)}
            iconClassName='text-icon-primary-button'
          />
        </AnimationReveal>
        <article
          className='dark flex flex-col gap-0 p-0 bg-surface-container-background max-w-full laptop:max-w-[480px] 
         w-full rounded-2xl tablet:rounded-3xl overflow-hidden self-start'
        >
          {/* Header */}
          <header
            className='flex flex-row gap-[26px] py-[26px] tablet:py-[20px] px-[34px] 
          bg-on-surface-background animate-fade-in'
            key={displayValues.mainTitle}
          >
            <BigStatsLeft
              title={displayValues.mainTitle}
              value={displayValues.mainValue}
              largeLabel={false}
              className='flex-none tablet:flex-1 items-start tablet:items-center flex-row 
              max-w-[190px] laptop:max-w-full mx-auto tablet:mx-0'
              disableAnimation={true}
            />
            <InfoValueUp
              value={displayValues.secondaryValue}
              label={displayValues.secondaryLabel}
              type='vertical'
              className='hidden tablet:flex flex-none tablet:flex-1'
            />
          </header>
          {/* Content */}
          <div className='flex flex-col gap-5 pt-[16px] pb-[24px] spacing-padding-x tablet:px-[26px]'>
            <InfoValueUp
              value={displayValues.secondaryValue}
              label={displayValues.secondaryLabel}
              className='flex tablet:hidden flex-row w-full items-center justify-between [&_p]:quote-text
                [&_p]:font-medium [&_p]:leading-[140%] [&_p]:tracking-normal'
              role='listitem'
            />
            <ul
              className='flex flex-col tablet:flex-row laptop:flex-col gap-2 animate-fade-in'
              key={displayValues.mainTitle}
            >
              {displayValues.items.map((item, index) => (
                <InfoValueUp
                  key={index}
                  value={item.value}
                  label={item.label}
                  className='flex flex-none tablet:flex-1 laptop:flex-none flex-row-reverse tablet:flex-col-reverse 
                  laptop:flex-row-reverse w-full items-center tablet:items-start laptop:items-center justify-between 
                  [&_p]:text-[12px] tablet:[&_p]:text-[14px] laptop:[&_p]:text-[12px] 
                  [&_p]:font-medium [&_p]:leading-[100%] [&_p]:tracking-normal'
                  role='listitem'
                />
              ))}
            </ul>
            <AnimationReveal
              x={0}
              y={0}
              delay={0.7}
              duration={0.3}
              opacity={1}
              whileInView={true}
              type='div'
              className='hidden tablet:flex'
            >
              <TextButton
                text='Talk to an Expert'
                state='default'
                customClassName='btn-primary-dark-fill-variant w-full rounded-full
            overflow-hidden justify-center py-3 px-6 uppercase
            tracking-[0.96px] font-medium whitespace-nowrap cursor-pointer'
                textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
                showRightIcon={true}
                rightIcon={ArrowUpRight}
                onClick={() => setIsContactModalOpen(true)}
                iconClassName='text-icon-primary-button'
              />
            </AnimationReveal>
          </div>
        </article>
        <AnimationReveal
          x={-5}
          y={0}
          delay={0.3}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='div'
          className='flex-1 flex tablet:hidden flex-col gap-1'
        >
          <p
            className='text-terciary-foreground text-[10px] tablet:text-[12px] font-medium leading-[180%] 
              tracking-[0.96px] uppercase'
          >
            Visualize your property investment returns
          </p>
          <h2 className='text-primary-foreground tracking-[-1.38px]'>
            Investment Calculator
          </h2>
        </AnimationReveal>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title='Talk to an Expert'
        message='Get expert advice on your Dubai real estate investment'
        cta='Send Message'
      />
    </section>
  );
};
