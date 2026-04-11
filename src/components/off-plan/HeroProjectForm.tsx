"use client";
import { TextButton } from "../common/button/TextButton";
import { TextField } from "../common/input/TextField";
import { ArrowUpRight } from "../shared/icons/arrow-up-right";
import { ChangeEvent, useState } from "react";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { formatPhoneNumber } from "@/utils/phone-format";
import { submitProjectInquiry } from "@/app/actions/project.action";
import { PhoneField } from "../common/input/PhoneField";
import { useFormAction } from "@/hooks/use-form-action";
import { projectInquirySchema } from "@/lib/validations/lead.schema";

interface ProjectFormProps {
  projectId?: number | string;
}

export const HeroProjectForm = ({ projectId }: ProjectFormProps) => {
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
    action: submitProjectInquiry,
    schema: projectInquirySchema,
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
      autoComplete="on"
      className="relative hidden laptop:flex flex-col min-h-auto p-0 gap-10 tablet:gap-0 w-full 
          shadow-none tablet:inner-border-all-container justify-end max-w-full laptop:max-w-[650px] overflow-hidden"
    >
      <HoneypotFields />
      <input type="hidden" name="countryCode" value={selectedCountryCode} />
      {projectId && (
        <input type="hidden" name="project" value={String(projectId)} />
      )}

      <div
        className="hidden tablet:block absolute top-0 left-0 w-full h-full -z-5"
        style={{
          background: `var(--color-stops-gray-40, rgba(0, 2, 10, 0.40))`,
        }}
      ></div>

      <div
        className="flex flex-col p-0 tablet:pt-[40px] tablet:pr-[36px] tablet:pl-[36px] tablet:pb-[36px] laptop:pt-[56px] laptop:pr-[40px] 
        laptop:pl-[40px] laptop:pb-[40px] gap-[20px] h-full"
      >
        <div className="flex flex-col tablet:flex-row laptop:flex-col gap-4 tablet:gap-5">
          <TextField
            id="first-name"
            name="firstName"
            label="Name"
            placeholder="Your name"
            onChange={() => handleFieldChange("firstName")}
            state={isPending ? "disabled" : "default"}
            inputClassName="text-[15px] tablet:text-[18px] laptop:text-[18px] text-secondary placeholder:text-secondary"
            containerClassName="max-w-full tablet:max-w-[200px] laptop:max-w-full"
            labelClassName="inline-block tablet:hidden"
            className="py-4 px-2"
            hasError={hasError("firstName")}
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="user@example.com"
            onChange={() => handleFieldChange("email")}
            state={isPending ? "disabled" : "default"}
            inputClassName="text-[15px] tablet:text-[18px] laptop:text-[18px] text-secondary placeholder:text-secondary"
            className="py-4 px-2"
            labelClassName="inline-block tablet:hidden"
            hasError={hasError("email")}
            showIcon={true}
            icon={<EnvelopeSimple />}
            iconSize={20}
          />
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
            inputClassName="text-[15px] tablet:text-[18px] laptop:text-[18px] text-secondary placeholder:text-secondary"
            className="py-4 px-2"
            containerClassName="flex tablet:hidden"
            key="lead-phone-field-mobile"
            labelClassName="inline-block tablet:hidden"
          />
        </div>
        <PhoneField
          id="lead-phone-desktop"
          name="phone"
          label="Phone"
          value={phoneValue}
          onChange={handlePhoneChange}
          onCountryCodeChange={handleCountryCodeChange}
          state={isPending ? "disabled" : "default"}
          hasError={hasError("phone")}
          defaultCountryCode={selectedCountryCode}
          inputClassName="text-[15px] tablet:text-[18px] laptop:text-[18px] text-secondary placeholder:text-secondary"
          className="py-4 px-2"
          containerClassName="hidden tablet:flex"
          key="lead-phone-field-desktop"
          labelClassName="inline-block tablet:hidden"
        />
      </div>
      <div className="animate-fadeIn-hidden duration-normal delay-900 w-full">
        <TextButton
          type="submit"
          text={isPending ? "Sending..." : "Request Now"}
          textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
          state={isPending ? "disabled" : "default"}
          customClassName="btn-primary-fill-variant-alpha justify-center w-full"
          showRightIcon={true}
          rightIcon={ArrowUpRight}
        />
      </div>
    </form>
  );
};
