"use client";
import { TextButton } from "@/components/common/button/TextButton";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { BigStats } from "@/components/common/text/BigStats";
import { CraneTower } from "@/components/shared/icons/crane-tower";
import { DownloadSimple } from "@/components/shared/icons/download-simple";
import { HandDeposit } from "@/components/shared/icons/hand-deposit";
import { Key } from "@/components/shared/icons/key";
import { PaymentPlan as PaymentPlanType } from "@/interfaces/project-response.interface";
import React, { useState } from "react";

interface PaymentPlanProps {
  paymentPlan?: PaymentPlanType;
  projectName?: string;
}

export const PaymentPlan = ({ paymentPlan, projectName }: PaymentPlanProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  if (!paymentPlan) return null;

  const paymentOptions = [
    {
      id: 1,
      title: "Down Payment",
      value: `${paymentPlan.Down_payment_percentage || 0}%`,
      bodyText: "On Booking Date",
      icon: HandDeposit,
    },
    {
      id: 2,
      title: "During Construction",
      value: `${paymentPlan.During_construction_percentage || 0}%`,
      bodyText: "1st to 4th Installment",
      icon: CraneTower,
    },
    {
      id: 3,
      title: "On Handover",
      value: `${paymentPlan.On_handover_percentage || 0}%`,
      bodyText: "100% Completion",
      icon: Key,
    },
  ];

  return (
    <section id='payment-plan' className='relative overflow-hidden pt-16'>
      <div className='flex flex-col gap-0 rounded-3xl overflow-hidden bg-surface-container-background dark'>
        <header
          className='flex flex-col mobile:flex-row justify-between items-start mobile:items-center 
          spacing-padding-x tablet:px-[34px] py-[20px] bg-on-surface-background dark gap-2 mobile:gap-0'
        >
          <h4 className='text-primary-foreground leading-[120%] font-medium tracking-[-1.08]'>
            Payment Plan
          </h4>
          <TextButton
            text='Download Payment Plan'
            state='default'
            customClassName='btn-secondary-variant gap-2 hover:brightness-125 transition-all duration-300 ease-in-out'
            textClassName='font-helvetica-neue text-terciary-foreground! heading-secondary! leading-[95%]'
            showLeftIcon={true}
            leftIcon={DownloadSimple}
            iconClassName='size-[18px]! mobile:size-[20px]! text-icon-secondary-button!'
            onClick={() => setIsContactModalOpen(true)}
          />
        </header>
        <ul
          role='list'
          className='flex flex-col tablet:flex-row spacing-padding-x tablet:px-[34px] py-[20px] tablet:py-[26px] 
          gap-[16px] tablet:gap-3 
          laptop:gap-5 justify-center'
        >
          {paymentOptions.map((option, index) => (
            <React.Fragment key={option.id}>
              <BigStats
                id={index}
                title={option.value}
                value={option.title}
                bodyText={option.bodyText}
                icon={option.icon}
                headingType='h2'
                showIconLeft={false}
                showIconRight={true}
                iconClassName='text-terciary-foreground w-[20px] tablet:w-[22px]'
                customClassName='[&>div]:flex-row-reverse tablet:[&>div]:flex-col [&>div]:justify-between'
              />
            </React.Fragment>
          ))}
        </ul>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        message={`Interested in downloading the payment plan for: ${projectName}?`}
        title='Download Payment Plan'
        cta='Download Payment Plan'
      />
    </section>
  );
};
