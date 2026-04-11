"use client";
import { submitListYourPropertyForm } from "@/app/actions/list-property.action";
import { useFormAction } from "@/hooks/use-form-action";
import { listPropertySchema } from "@/lib/validations/lead.schema";
import { formatPhoneNumber } from "@/utils/phone-format";
import React, { ChangeEvent, useState } from "react";
import { TextButton } from "../button/TextButton";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { TextField } from "../input/TextField";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { PhoneField } from "../input/PhoneField";
import {
  SORT_DEVELOPER_OPTIONS,
  WANT_TO_OPTIONS,
} from "@/config/constant.config";
import { DropdownMinimal } from "../input/DropdownMinimal";

interface ListYourPropertyFormProps {
  formKey?: string;
}

export const ListYourPropertyForm = ({
  formKey,
}: ListYourPropertyFormProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+971");
  const [phoneValue, setPhoneValue] = useState("");
  const [selectedOperation, setSelectedOperation] = useState<string | number>(
    ""
  );

  const {
    handleSubmit,
    isPending,
    formRef,
    hasError,
    handleFieldChange,
    HoneypotFields,
  } = useFormAction({
    action: submitListYourPropertyForm,
    schema: listPropertySchema,
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

  const handleOperationChange = (value: string | number) => {
    setSelectedOperation(value);
    handleFieldChange("operation");
  };

  return (
    <form
      id={formKey}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='on'
      className='relative flex-1 max-w-full laptop:max-w-[600px] flex flex-col gap-0 p-0 backdrop-blur-[20px] 
      rounded-3xl w-full laptop:w-auto list-your-property-form'
    >
      <HoneypotFields />

      <input type='hidden' name='countryCode' value={selectedCountryCode} />
      <input type='hidden' name='operation' value={selectedOperation} />

      <header
        className='py-[24px] px-[40px] gap-[26px] flex justify-center tablet:justify-start rounded-t-3xl'
        style={{
          background: `var(--Background-On-surface, rgba(0, 0, 0, 0.20))`,
        }}
      >
        <p className='text-accent-solid text-[16px] leading-[180%] tracking-[0.64px] uppercase font-crimson'>
          Get a free Consultation
        </p>
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

          <div className={hasError("operation") ? "animate-shake" : ""}>
            <DropdownMinimal
              label='I Want to'
              placeholder='Select an option'
              items={WANT_TO_OPTIONS.map((option) => ({
                text: option.text,
                value: option.value,
              }))}
              defaultSelectedKey={selectedOperation}
              onSelectionChange={handleOperationChange}
              disabled={isPending}
              className={`*:text-terciary-foreground p-0! border-b-[1px] rounded-none! h-[44px]! bg-transparent! ${
                hasError("operation")
                  ? "border-red-500"
                  : "border-primary-stroke"
              }`}
              containerClassName='gap-1!'
              labelClassName='text-secondary! text-[15px] leading-[180%]'
              spanWidth='w-full'
              iconSize={10}
              width='w-full'
            />
          </div>
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
