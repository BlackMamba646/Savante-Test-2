"use client";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { ChangeEvent, useState } from "react";
import { submitLeadForm } from "@/app/actions/contact.action";
import { formatPhoneNumber } from "@/utils/phone-format";
import { TextButton } from "../button/TextButton";
import { TextArea } from "../input/TextArea";
import { TextField } from "../input/TextField";
import { PhoneField } from "../input/PhoneField";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { useFormAction } from "@/hooks/use-form-action";
import { contactFormSchema } from "@/lib/validations/lead.schema";

interface LeadFormProps {
  formKey?: string;
}

export const LeadForm = ({ formKey }: LeadFormProps) => {
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
    action: submitLeadForm,
    schema: contactFormSchema,
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
      className='relative flex-1 flex flex-col gap-10 tablet:gap-[34px] h-auto self-center w-full'
    >
      <HoneypotFields />

      <input type='hidden' name='countryCode' value={selectedCountryCode} />

      <div className='flex flex-col gap-6 tablet:gap-5 **:font-montserrat relative z-10'>
        <div className='flex flex-col tablet:flex-row gap-6 tablet:gap-5'>
          <TextField
            id='name'
            name='name'
            label='Name'
            placeholder='Your name'
            onChange={() => handleFieldChange("name")}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("name")}
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
            iconSize={20}
          />
        </div>

        <div className='flex flex-col tablet:flex-row gap-6 tablet:gap-5'>
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
          />
        </div>

        <TextArea
          id='lead-form-message'
          name='message'
          label='Message'
          placeholder='Whatever your question is, we can answer it.'
          autoComplete='on'
          onChange={() => handleFieldChange("message")}
          state={isPending ? "disabled" : "default"}
          hasError={hasError("message")}
        />
      </div>

      <AnimationReveal
        x={0}
        y={5}
        delay={0.3}
        duration={0.3}
        opacity={1}
        whileInView={true}
        type='div'
      >
        <TextButton
          type='submit'
          text={isPending ? "Sending..." : "Send message"}
          state={isPending ? "disabled" : "default"}
          customClassName='btn-primary-fill-variant w-full tablet:w-max rounded-full overflow-hidden
          justify-center py-3 px-6'
          textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
          showRightIcon={true}
          rightIcon={ArrowUpRight}
          animateIcon={true}
        />
      </AnimationReveal>
    </form>
  );
};
