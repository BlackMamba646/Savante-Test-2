import Link from "next/link";
import { Close } from "../icons/close";
import { ROUTING } from "@/config/constant.config";
import { AreaModel, ServiceModel } from "@/interfaces";
import { ArrowUpRight } from "../icons/arrow-up-right";
import { useEffect } from "react";
import { LogoTabletWhite } from "../icons/logo/logo-tablet-white";
import { LogoMobileWhite } from "../icons/logo/logo-mobile-white";
import { TextButton } from "@/components/common/button/TextButton";

interface MenuBarProps {
  isVisible: boolean;
  onClose: () => void;
  onOpenContactModal: () => void;
  services?: ServiceModel[];
  areas?: AreaModel[];
}

export const MenuBar = ({
  isVisible,
  onClose,
  onOpenContactModal,
  services,
  areas,
}: MenuBarProps) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  return (
    <div
      className={`bg-accent dark h-dvh tablet:h-max max-h-full overflow-y-auto scrollbar-hide fixed top-0 left-0 w-full z-100 dark inset-0 
        transition-all duration-300 ease-out flex flex-col ${
          isVisible
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), var(--Background-Surface, #000)",
      }}
    >
      <header className="flex flex-row justify-between items-center w-full py-4 px-5 tablet:py-5 tablet:spacing-padding-x">
        <figure className="relative text-shades-gray-0">
          <>
            <div className="hidden tablet:block">
              <LogoTabletWhite />
            </div>
            <div className="block tablet:hidden">
              <LogoMobileWhite />
            </div>
          </>
        </figure>
        <button
          onClick={onClose}
          className="cursor-pointer bg-surface-container-background rounded-full text-shades-gray-0 font-medium text-sm"
        >
          <figure className="rounded-full border-1 border-secondary-stroke/20 p-4">
            <Close size={14} />
          </figure>
        </button>
      </header>
      <nav className="py-10 px-5 tablet:py-10 flex-1 tablet:spacing-padding-x gap-[34px] flex flex-col">
        {/* Company column */}
        <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-10">
          <span className="min-w-auto w-[140px] max-w-[140px] text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.48px] font-semibold">
            Company
          </span>
          <div className="flex-1 flex flex-row gap-5">
            <ul className="flex-1 flex flex-col gap-4">
              <li>
                <Link
                  href={ROUTING.ABOUT_US}
                  onClick={onClose}
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                  title="About Us"
                  aria-label="About Us"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.OUR_TEAM}
                  onClick={onClose}
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                  title="Our Team"
                  aria-label="Our Team"
                >
                  Our team
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.DEVELOPERS}
                  onClick={onClose}
                  title="Developers"
                  aria-label="Developers"
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.PROPERTIES_BY_AREAS}
                  onClick={onClose}
                  title="Developers"
                  aria-label="Developers"
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                >
                  Area Guides
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.BLOGS}
                  onClick={onClose}
                  title="Blog"
                  aria-label="Blog"
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    onClose();
                    onOpenContactModal();
                  }}
                  title="Contact Us"
                  aria-label="Contact Us"
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
            <ul className="flex-1 flex flex-col gap-4">
              <li>
                <Link
                  href={ROUTING.FOR_SALE}
                  onClick={onClose}
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                  title="Buy"
                  aria-label="Buy"
                >
                  Buy
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.FOR_RENT}
                  onClick={onClose}
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                  title="Rent"
                  aria-label="Rent"
                >
                  Rent
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.OFF_PLAN}
                  onClick={onClose}
                  title="New Developments"
                  aria-label="New Developments"
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                >
                  New Developments
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTING.LIST_YOUR_PROPERTY}
                  onClick={onClose}
                  title="List Your Property"
                  aria-label="List Your Property"
                  className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
                >
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Services column */}
        <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-10">
          <span className="min-w-auto w-[140px] max-w-[140px] text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.48px] font-semibold">
            Services
          </span>
          <div className="flex-1 flex flex-row gap-5">
            {/* Primera columna */}
            <ul className="flex-1 flex flex-col gap-4">
              {services
                ?.slice(0, Math.ceil(services.length / 2))
                .map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`${ROUTING.SERVICES}/${service.attributes.slug}`}
                      onClick={onClose}
                      className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                leading-[180%] hover:underline transition-all duration-200"
                      title={service.attributes.Title}
                      aria-label={service.attributes.Title}
                    >
                      {service.attributes.Title}
                    </Link>
                  </li>
                ))}
            </ul>
            {/* Segunda columna */}
            <ul className="flex-1 flex flex-col gap-4">
              {services
                ?.slice(Math.ceil(services.length / 2))
                .map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`${ROUTING.SERVICES}/${service.attributes.slug}`}
                      onClick={onClose}
                      className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                leading-[180%] hover:underline transition-all duration-200"
                      title={service.attributes.Title}
                      aria-label={service.attributes.Title}
                    >
                      {service.attributes.Title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {/* Properties by Areas column */}
        <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-10">
          <span className="min-w-auto w-[140px] max-w-[140px] text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.48px] font-semibold">
            Buy properties in
          </span>
          <div className="flex-1 flex flex-row gap-5">
            {/* Primera columna */}
            <ul className="flex-1 flex flex-col gap-4">
              {areas?.slice(0, Math.ceil(areas.length / 2)).map((area) => (
                <li key={area.id}>
                  <Link
                    href={`${ROUTING.PROPERTIES_BY_AREAS}/${area.attributes.slug}`}
                    onClick={onClose}
                    className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                leading-[180%] hover:underline transition-all duration-200"
                    title={area.attributes.Area_name}
                    aria-label={area.attributes.Area_name}
                  >
                    {area.attributes.Area_name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Segunda columna */}
            <ul className="flex-1 flex flex-col gap-4">
              {areas?.slice(Math.ceil(areas.length / 2)).map((area) => (
                <li key={area.id}>
                  <Link
                    href={`${ROUTING.PROPERTIES_BY_AREAS}/${area.attributes.slug}`}
                    onClick={onClose}
                    className="text-[14px] text-secondary-foreground/60 font-extralight tracking-wide 
                leading-[180%] hover:underline transition-all duration-200"
                    title={area.attributes.Area_name}
                    aria-label={area.attributes.Area_name}
                  >
                    {area.attributes.Area_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex-1 flex tablet:block items-end">
          <TextButton
            text={"Connect with us"}
            state={"default"}
            customClassName="btn-primary-dark-fill-variant w-full justify-center 
            rounded-4xl overflow-hidden py-3 px-6"
            textClassName="uppercase text-[12px] font-medium tracking-[0.96px] whitespace-nowrap"
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            onClick={() => {
              onClose();
              onOpenContactModal();
            }}
          />
        </div>
      </nav>
    </div>
  );
};
