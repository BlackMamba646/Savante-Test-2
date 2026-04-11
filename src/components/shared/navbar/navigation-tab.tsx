import { ROUTING } from "@/config/constant.config";
import { AreaModel } from "@/interfaces/areas-response.interface";
import { ServiceModel } from "@/interfaces/service-response.interface";
import Link from "next/link";
import React from "react";

interface NavigationTabProps {
  isOpen?: boolean;
  onClickContactButton?: () => void;
  services?: ServiceModel[];
  areas?: AreaModel[];
}

export const NavigationTab = ({
  isOpen,
  onClickContactButton,
  services,
  areas,
}: NavigationTabProps) => {
  const handleContactButtonClick = () => {
    onClickContactButton?.();
  };

  return (
    <article
      className={`hidden laptop:flex absolute -right-44.5 top-full dark
        bg-transparent z-999 transition-opacity duration-200 ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className="py-10 px-16 max-w-[1100px] flex flex-row w-full gap-16 items-start content-start cursor-default rounded-2xl"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), var(--Background-Surface, #000)",
        }}
      >
        <div className="flex flex-col gap-6">
          <span className="text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[1.5] font-semibold">
            Company
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href={`${ROUTING.ABOUT_US}`}
                className="text-[14px] text-secondary-foreground opacity-60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTING.BLOGS}`}
                className="text-[14px] text-secondary-foreground opacity-60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTING.DEVELOPERS}`}
                className="text-[14px] text-secondary-foreground opacity-60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
              >
                Developers
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTING.PROPERTIES_BY_AREAS}`}
                className="text-[14px] text-secondary-foreground opacity-60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
              >
                Areas
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTING.OUR_TEAM}`}
                className="text-[14px] text-secondary-foreground opacity-60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
              >
                Agents
              </Link>
            </li>
            <li>
              <button
                onClick={handleContactButtonClick}
                className="cursor-pointer text-[14px] text-secondary-foreground opacity-60 font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-6 whitespace-nowrap">
          <span className="w-full text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[1.8] font-semibold">
            Buy properties in
          </span>
          <ul className="flex flex-col gap-4">
            {areas?.map((area) => (
              <li key={area.attributes.slug}>
                <Link
                  href={`${ROUTING.PROPERTIES_BY_AREAS}/${area.attributes.slug}`}
                  className="text-[14px] text-secondary-foreground font-extralight tracking-wide 
                      leading-[180%] hover:underline transition-all duration-200 opacity-60"
                >
                  {area.attributes.Area_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <span className="text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[1.8] font-semibold">
            Services
          </span>
          <div className="flex flex-row gap-6 w-full">
            <ul className="flex flex-col gap-4 flex-[1_0_0]">
              {" "}
              {/* max-w-[160px] */}
              {services?.map((service) => (
                <li key={service.attributes.slug}>
                  <Link
                    href={`${ROUTING.SERVICES}/${service.attributes.slug}`}
                    className="text-[14px] text-secondary-foreground font-extralight tracking-wide opacity-60
                                  leading-[180%] hover:underline transition-all duration-200 whitespace-nowrap"
                  >
                    {service.attributes.Title}
                  </Link>
                </li>
              ))}
            </ul>
            {/* <ul className='flex flex-col gap-4 flex-[1_0_0]'>
              <li>
                <Link
                  href='/legal-&-financial-assistance'
                  className='text-[14px] text-secondary-foreground font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200'
                >
                  Legal & Financial Assistance
                </Link>
              </li>
              <li>
                <Link
                  href='/representation-of-clients-interests'
                  className='text-[14px] text-secondary-foreground font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200'
                >
                  Representation of Clients' Interests
                </Link>
              </li>
              <li>
                <Link
                  href='/obtaining-residency-in-dubai'
                  className='text-[14px] text-secondary-foreground font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200'
                >
                  Obtaining Residency in Dubai
                </Link>
              </li>
              <li>
                <Link
                  href='/advice-on-relocation-and-work'
                  className='text-[14px] text-secondary-foreground font-extralight tracking-wide 
                    leading-[180%] hover:underline transition-all duration-200'
                >
                  Advice on Relocation and Work
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </article>
  );
};