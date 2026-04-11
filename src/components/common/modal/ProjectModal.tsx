"use client";

import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { Close } from "@/components/shared/icons/close";
import { EnvelopeSimple } from "@/components/shared/icons/envelope-simple";
import { Phone } from "@/components/shared/icons/phone";
import { motion, AnimatePresence } from "motion/react";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import {
  formatPhoneNumber,
  getPhonePlaceholder,
  cleanPhoneNumber,
} from "@/utils/phone-format";
import { PHONE_TYPES } from "@/utils/phone-types";
import { submitPropertyMortgageForm } from "@/app/actions/mortgage.action";
import { TextButton } from "../button/TextButton";
import { AgreeWithTC } from "../text/AgreeWithTC";
import { PhoneField } from "../input/PhoneField";
import { TextField } from "../input/TextField";
import { useFormAction } from "@/hooks/use-form-action";
import { aboutPropertySchema, mortgageFormSchema, projectInquirySchema } from "@/lib/validations/lead.schema";
import { getBudgetFromLoanAmount } from "@/utils/utils";
import { submitAboutPropertyInquiry } from "@/app/actions/about-property.action";
import { submitProjectInquiry } from "@/app/actions/project.action";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  projectId?: number;
  message?: string;
  title?: string;
}

export const ProjectModal = ({
  isOpen,
  onClose,
  projectName,
  projectId,
  message = 'Project information inquiry',
  title = 'Get a free consultation',
}: ProjectModalProps) => {
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
      onClose();
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 flex items-center justify-center z-999 py-0 tablet:py-20 px-0 tablet:px-10 
          laptop:px-16 light'
          style={{
            background:
              "var(--color-gray-color-stops-60, rgba(12, 12, 12, 0.60))",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
            className='relative flex flex-col py-[34px] tablet:py-[34px] laptop:py-[34px] px-5 z-999 rounded-none tablet:rounded-3xl
            tablet:px-10 bg-white w-full max-w-full tablet:max-w-[700px] gap-9 tablet:gap-[20px] laptop:gap-[24px]
            max-h-full overflow-y-auto min-h-dvh tablet:min-h-auto h-full tablet:h-auto'
          >
            <div className='flex flex-row justify-between w-full items-center'>
              <h4 className='text-primary-foreground tracking-[-1.44px] leading-[140%]'>
                {title}
              </h4>
              <button
                onClick={onClose}
                className='cursor-pointer bg-[#F6F6F6] backdrop-blur-sm self-start
                            rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform'
              >
                <figure className='fill-accent-foreground'>
                  <Close size={16} />
                </figure>
              </button>
            </div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              autoComplete='on'
              className='flex flex-col gap-6 w-full h-full tablet:h-auto'
            >
              <HoneypotFields />

              <input
                type='hidden'
                name='countryCode'
                value={selectedCountryCode}
              />
              <input
                type='hidden'
                name='message'
                value={message}
              />
              <input
                type='hidden'
                name='project'
                value={projectId || 0}
              />
              <div className='flex flex-col tablet:flex-row gap-6 tablet:gap-5'>
                <TextField
                  id='name'
                  name='name'
                  label='Name'
                  placeholder='Your name'
                  onChange={() => handleFieldChange("name")}
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
                  onChange={() => handleFieldChange("email")}
                  state={isPending ? "disabled" : "default"}
                  hasError={hasError("email")}
                  containerClassName='**:font-montserrat [&_figure]:text-[#4D5157]'
                  labelClassName='leading-[180%]'
                  className='pt-1'
                />
              </div>
              <div className='flex flex-col tablet:flex-row gap-6 tablet:gap-5'>
                <PhoneField
                  id='contact-phone'
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
                <div className='flex-1 hidden tablet:flex flex-col gap-1 opacity-40 cursor-not-allowed select-none'>
                  <label
                    htmlFor='project'
                    className='text-[#212121] text-[15px] pointer-events-none'
                  >
                    Project
                  </label>
                  <div
                    className='flex flex-row gap-2 border-b-[1px] border-[#0C0C0C33] items-center py-2 px-1 pointer-events-none
                                  focus-within:border-accent-foreground transition-colors duration-300'
                  >
                    <input
                      type='text'
                      id='project'
                      value={projectName || ""}
                      placeholder='Project name'
                      readOnly
                      disabled
                      className='flex-1 indent-0 outline-none text-[15px] leading-[180%] line-clamp-1'
                    />
                    <figure className='relative fill-terciary-foreground'>
                      <CaretArrow direction='down' size={10} />
                    </figure>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 mt-3 flex-1 tablet:flex-none justify-end tablet:justify-start'>
                <TextButton
                  type='submit'
                  text={isPending ? "Sending..." : "Claim your free consultation"}
                  state={isPending ? "disabled" : "default"}
                  customClassName='btn-primary-fill-variant w-full justify-center py-4 px-6 h-auto w-full py-3 px-6
                  rounded-4xl'
                  textClassName='uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap'
                  showRightIcon={true}
                  rightIcon={ArrowUpRight}
                  animateIcon={true}
                />
                <AgreeWithTC />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
