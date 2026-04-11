"use client";

import React, { ChangeEvent, useState } from "react";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { toast } from "sonner";
import { formatPhoneNumber } from "@/utils/phone-format";
import { submitAboutPropertyInquiry } from "@/app/actions/about-property.action";
import { aboutPropertySchema } from "@/lib/validations/lead.schema";
import { TextButton } from "@/components/common/button/TextButton";
import { useFormAction } from "@/hooks/use-form-action";
import { TextField } from "../common/input/TextField";
import { PhoneField } from "../common/input/PhoneField";
import { TextArea } from "../common/input/TextArea";
import { AnimationReveal } from "../ui/animation-reveal";

interface AboutPropertyFormProps {
  location: string;
  projectId?: number | string;
}

export const AboutPropertyForm = ({
  location,
  projectId,
}: AboutPropertyFormProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+971");
  const [phoneValue, setPhoneValue] = useState("");

  const {
    handleSubmit,
    isPending,
    formRef,
    hasError,
    clearFieldError,
    handleFieldChange,
    HoneypotFields,
  } = useFormAction({
    action: submitAboutPropertyInquiry,
    schema: aboutPropertySchema,
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
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='on'
      className='relative flex-1 flex flex-col gap-[34px] w-full min-w-0 max-w-full items-stretch'
    >
      <HoneypotFields />
      <input type='hidden' name='project' value={projectId || ""} />

      <header className='hidden laptop:flex flex-col gap-1'>
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

      <div className='flex flex-col gap-4 w-full'>
        <div className='flex flex-col tablet:flex-row gap-4 tablet:gap-5'>
          <TextField
            id='name'
            name='name'
            label='Name'
            placeholder='Your name'
            onChange={() => clearFieldError("name")}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("name")}
            containerClassName='**:font-montserrat'
            labelClassName='leading-[180%]'
            inputClassName='pt-1'
          />
          <TextField
            id='email'
            name='email'
            label='Email'
            placeholder='user@example.com'
            icon={<EnvelopeSimple />}
            showIcon={true}
            onChange={() => clearFieldError("email")}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("email")}
            containerClassName='**:font-montserrat [&_figure]:text-[#4D5157]'
            labelClassName='leading-[180%]'
            className='pt-1'
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
          className='pt-1'
          containerClassName='**:font-montserrat'
          labelClassName='leading-[180%]'
          key='lead-phone-field'
        />
        <TextArea
          id='about-property-message'
          name='message'
          label='Message'
          placeholder='Whatever your question is, we can answer.'
          onChange={() => clearFieldError("message")}
          state={isPending ? "disabled" : "default"}
          hasError={hasError("message")}
          className='pt-1'
          containerClassName='**:font-montserrat'
          labelClassName='leading-[180%]'
          textareaClassName='field-sizing-content'
        />
      </div>
      <AnimationReveal
        x={0}
        y={5}
        delay={0.5}
        duration={0.3}
        type='div'
        opacity={1}
        className='w-full'
      >
        <TextButton
          type='submit'
          text={isPending ? "Sending..." : "Send Message"}
          textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
          state={isPending ? "disabled" : "default"}
          customClassName='btn-primary-fill-variant justify-center w-full py-3 px-6 rounded-4xl'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          animateIcon={false}
        />
      </AnimationReveal>
    </form>
  );
};
