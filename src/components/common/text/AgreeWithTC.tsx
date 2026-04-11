import { ROUTING } from "@/config/constant.config";
import Link from "next/link";

export const AgreeWithTC = () => {
  return (
    <p className='text-terciary-foreground text-[12px] leading-[180%] font-montserrat'>
      By submitting the form, you agree to our{" "}
      <span className='inline-block mr-1 group'>
        <Link
          href={ROUTING.TERMS_AND_CONDITIONS}
          target='_blank'
          rel='noopener noreferrer'
          className='no-underline group-hover:underline'
        >
          T. & C.
        </Link>
      </span>
      and
      <span className='inline-block ml-1 group'>
        <Link
          href={ROUTING.PRIVACY_POLICY}
          target='_blank'
          rel='noopener noreferrer'
          className='no-underline group-hover:underline'
        >
          Privacy Policy
        </Link>
      </span>
      .
    </p>
  );
};
