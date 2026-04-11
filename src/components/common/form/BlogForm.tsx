"use client";
import { useFormAction } from "@/hooks/use-form-action";
import {
  blogInquirySchema,
  serviceInquirySchema,
} from "@/lib/validations/lead.schema";
import { formatPhoneNumber } from "@/utils/phone-format";
import { ChangeEvent, useState } from "react";
import { TextButton } from "../button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { TextField } from "../input/TextField";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { PhoneField } from "../input/PhoneField";
import { submitServiceInquiry } from "@/app/actions/service.action";
import { submitBlogInquiry } from "@/app/actions/blog.action";

interface BlogFormProps {
  formKey?: string;
  message?: string;
}

export const BlogForm = ({
  formKey,
  message = "Consultation request from blog page",
}: BlogFormProps) => {
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
    action: submitBlogInquiry,
    schema: blogInquirySchema,
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
      autoComplete="on"
      className="relative flex-1 max-w-full laptop:max-w-[600px] flex flex-col gap-0 p-0 backdrop-blur-[20px] 
      rounded-3xl w-full laptop:w-auto list-your-property-form"
    >
      <HoneypotFields />

      <input type="hidden" name="countryCode" value={selectedCountryCode} />
      <input type="hidden" name="message" value={message} />

      <header
        className="py-[16px] tablet:py-[24px] px-[20px] tablet:px-[40px] gap-[26px] flex justify-center tablet:justify-start rounded-t-3xl"
        style={{
          background: `var(--Background-On-surface, rgba(0, 0, 0, 0.20))`,
        }}
      >
        <p className="text-accent-solid text-[16px] leading-[180%] tracking-[0.64px] uppercase font-crimson text-center tablet:text-left">
          Request a Free Consultation
        </p>
      </header>

      <div className="flex flex-col gap-10 pt-[10px] tablet:pt-[16px] pb-[24px] px-[20px] tablet:px-[34px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col tablet:flex-row gap-2">
            <TextField
              id="name"
              name="name"
              label="Name"
              placeholder="Your name"
              onChange={() => handleFieldChange("name")}
              state={isPending ? "disabled" : "default"}
              hasError={hasError("name")}
              labelClassName="leading-[180%]"
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="user@email.com"
              onChange={() => handleFieldChange("email")}
              state={isPending ? "disabled" : "default"}
              hasError={hasError("email")}
              showIcon={true}
              icon={<EnvelopeSimple />}
              labelClassName="leading-[180%]"
              className="[&_figure]:text-icon-secondary-button"
              iconSize={20}
            />
          </div>

          <PhoneField
            id="lead-phone"
            name="phone"
            label="Phone"
            value={phoneValue}
            onChange={handlePhoneChange}
            onCountryCodeChange={handleCountryCodeChange}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("phone")}
            defaultCountryCode={selectedCountryCode}
            labelClassName="leading-[180%]"
          />
        </div>

        <div className=' animate-fade-in delay-700 duration-300'>
          <TextButton
            type='submit'
            text='Request Now'
            customClassName='btn-primary-dark-fill-variant w-full rounded-full 
            overflow-hidden justify-center py-3 px-6'
            textClassName='uppercase text-[12px] tracking-[0.96px] font-medium'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={false}
            state={isPending ? "disabled" : "default"}
            iconClassName='text-text-primary-button'
          />
        </div>
      </div>
    </form>
  );
};
