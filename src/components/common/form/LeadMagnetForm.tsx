"use client";
import { useFormAction } from "@/hooks/use-form-action";
import { leadMagnetFormSchema } from "@/lib/validations/lead.schema";
import { formatPhoneNumber } from "@/utils/phone-format";
import React, { ChangeEvent, useState } from "react";
import { TextButton } from "../button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { TextField } from "../input/TextField";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { PhoneField } from "../input/PhoneField";
import { submitLeadMagnetForm } from "@/app/actions/lead-magnet";
import { heroFeaturesData } from "@/data/guide";
import { FeatureItem } from "@/components/lead-magnet/FeatureItem";
import { Check } from "@/components/shared/icons/check";

interface LeadMagnetFormProps {
  formKey?: string;
}

export const LeadMagnetForm = ({ formKey }: LeadMagnetFormProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+971");
  const [phoneValue, setPhoneValue] = useState("");

  const {
    handleSubmit,
    isPending,
    formRef,
    hasError,
    handleFieldChange,
    HoneypotFields,
  } = useFormAction({
    action: submitLeadMagnetForm,
    schema: leadMagnetFormSchema,
    onSuccess: () => {
      setPhoneValue("");
    },
  });

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, selectedCountryCode);
    setPhoneValue(formatted);
    handleFieldChange("phone");
  };

  const handleCountryCodeChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setPhoneValue("");
  };

  return (
    <form
      id={formKey}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='on'
      className='relative flex-1 max-w-full laptop:max-w-[600px] flex flex-col gap-0 p-0 backdrop-blur-[20px] 
      rounded-none tablet:rounded-3xl w-full laptop:w-auto bg-surface-container-background'
    >
      <HoneypotFields />

      <input type='hidden' name='countryCode' value={selectedCountryCode} />

      <header
        className='py-[16px] tablet:py-[24px] spacing-padding-x tablet:px-[40px] gap-[26px] flex 
        justify-center tablet:justify-start rounded-t-3xl'
        style={{
          background: `var(--Background-On-surface, rgba(0, 0, 0, 0.20))`,
        }}
      >
        <div className='flex flex-row relative text-accent-solid font-crimson w-full gap-2'>
          <p
            className='hidden tablet:block big-lowercase leading-[180%] tracking-[0.22px] font-crimson text-left italic'
          >
            Free Download:
          </p>
          <span className='inline-block quote-text leading-[180%] tracking-[0.9px] uppercase not-italic'>
            The Ultimate Starter Guide
          </span>
        </div>
      </header>

      <div className='flex flex-col gap-10 pt-[10px] tablet:pt-[16px] pb-[24px] px-[20px] tablet:px-[34px]'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col tablet:flex-row gap-2'>
            <TextField
              id='name'
              name='name'
              label='Name'
              placeholder='Your name'
              onChange={() => handleFieldChange("name")}
              state={isPending ? "disabled" : "default"}
              hasError={hasError("name")}
              labelClassName='leading-[180%]'
            />
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              placeholder='user@email.com'
              onChange={() => handleFieldChange("email")}
              state={isPending ? "disabled" : "default"}
              hasError={hasError("email")}
              showIcon={true}
              icon={<EnvelopeSimple />}
              labelClassName='leading-[180%]'
              className='[&_figure]:text-icon-secondary-button'
              iconSize={20}
            />
          </div>

          <PhoneField
            id='lead-phone'
            name='phone'
            label='Phone'
            value={phoneValue}
            onChange={handlePhoneChange}
            onCountryCodeChange={handleCountryCodeChange}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("phone")}
            defaultCountryCode={selectedCountryCode}
            labelClassName='leading-[180%]'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <TextButton
            type='submit'
            text='Get the free guide'
            customClassName='btn-primary-dark-fill-variant w-full rounded-full 
            overflow-hidden justify-center py-3 px-6'
            textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={false}
            iconRotation={45}
            state={isPending ? "disabled" : "default"}
          />
          <p className='text-secondary text-[15px] leading-[180%] line-clamp-1 text-center'>
            No spam. Instant access after signup.
          </p>
        </div>

        <ul className='grid tablet:hidden grid-cols-1 grid-rows-[auto] gap-2.5 self-start'>
          {heroFeaturesData.map((item) => (
            <FeatureItem
              key={item.id}
              type='item-text'
              text={item.title}
              icon={<Check size={10} />}
            />
          ))}
        </ul>
      </div>
    </form>
  );
};
