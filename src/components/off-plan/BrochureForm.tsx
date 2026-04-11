"use client";

import { ChangeEvent, useState } from "react";
import { DownloadSimple } from "@/components/shared/icons/download-simple";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { ENVIRONMENT } from "@/config/env.config";
import { submitBrochureDownload } from "@/app/actions/brochure.action";
import { TextButton } from "@/components/common/button/TextButton";
import { TextField } from "../common/input/TextField";
import { PhoneField } from "../common/input/PhoneField";
import { AgreeWithTC } from "../common/text/AgreeWithTC";
import { AnimationReveal } from "../ui/animation-reveal";
import { formatPhoneNumber } from "@/utils/phone-format";
import { useFormAction } from "@/hooks/use-form-action";
import { brochureFormSchema } from "@/lib/validations/lead.schema";

interface BrochureFormProps {
  projectId?: number | string;
  brochureUrl?: string;
}

export const BrochureForm = ({ projectId, brochureUrl }: BrochureFormProps) => {
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
    action: submitBrochureDownload,
    schema: brochureFormSchema,
    onSuccess: () => {
      setPhoneValue("");
      if (brochureUrl) {
        window.open(
          ENVIRONMENT.API_URL + brochureUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }
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
      className="flex-1 flex flex-col gap-5"
    >
      <HoneypotFields />
      <input type="hidden" name="countryCode" value={selectedCountryCode} />
      {projectId && (
        <input type="hidden" name="project" value={String(projectId)} />
      )}

      <div className="flex flex-col gap-3">
        <div className="hidden laptop:flex flex-col gap-2">
          <div className="w-[26px] h-[1px] bg-accent-foreground"></div>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.2}
            duration={0.3}
            type="h4"
            opacity={1}
            className="text-primary-foreground font-medium leading-[120%] tracking-[-1.08px]"
          >
            Download brochure
          </AnimationReveal>
        </div>
        <div className="flex flex-col tablet:flex-row gap-3">
          <TextField
            id="first-name"
            name="firstName"
            label="Name"
            placeholder="Your name"
            onChange={() => handleFieldChange("firstName")}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("firstName")}
            containerClassName="**:font-montserrat"
            labelClassName="leading-[180%]"
            inputClassName="pt-1"
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            placeholder="user@example.com"
            icon={<EnvelopeSimple />}
            showIcon={true}
            onChange={() => handleFieldChange("email")}
            state={isPending ? "disabled" : "default"}
            hasError={hasError("email")}
            containerClassName="**:font-montserrat [&_figure]:text-[#4D5157]"
            labelClassName="leading-[180%]"
            className="pt-1"
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
          className="pt-1"
          containerClassName="**:font-montserrat"
          labelClassName="leading-[180%]"
          key="lead-phone-field"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <AnimationReveal
          x={0}
          y={5}
          delay={0.5}
          duration={0.3}
          type="div"
          opacity={1}
          className="w-full"
        >
          <TextButton
            type="submit"
            text={isPending ? "Downloading..." : "Download Brochure"}
            textClassName="leading-[95%] uppercase text-[12px] tracking-[0.96px] font-medium"
            state={isPending ? "disabled" : "default"}
            customClassName="btn-primary-fill-variant justify-center **:leading-[180%]! w-full py-3 px-6 rounded-4xl"
            showLeftIcon={true}
            leftIcon={DownloadSimple}
            iconClassName="size-[18px]!"
          />
        </AnimationReveal>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.7}
          duration={0.3}
          type="div"
          opacity={1}
        >
          <AgreeWithTC />
        </AnimationReveal>
      </div>
    </form>
  );
};
