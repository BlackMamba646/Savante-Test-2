"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CaretArrow } from "../icons/caret-arrow";
import { ArrowUpRight } from "../icons/arrow-up-right";
import { Hamburguer } from "../icons/hamburguer";
import { usePathname } from "next/navigation";
import { CONTACT_INFO, ROUTING } from "@/config/constant.config";
import { ServiceModel } from "@/interfaces/service-response.interface";
import { AreaModel } from "@/interfaces/areas-response.interface";
import { getNavbarConfig, NavbarConfig } from "@/utils/navbar-config";
import { ContactModal } from "@/components/common/modal/ContactModal";
import { MenuBar } from "./menu-bar";
import { NavigationTab } from "./navigation-tab";
import { LogoResize } from "../components/LogoResize";

interface NavbarProps {
  theme?: "light" | "dark";
  position?: NavbarConfig["position"];
  services?: ServiceModel[];
  areas?: AreaModel[];
  contactNumber?: string;
}

export default function Navbar({
  theme: themeProp,
  position: positionProp,
  services = [],
  areas = [],
  contactNumber = CONTACT_INFO.phone,
}: NavbarProps) {
  const pathname = usePathname();

  const config = getNavbarConfig(pathname);

  const theme = themeProp ?? config.theme;
  const position = positionProp ?? config.position;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [position]);

  // Determinar el theme y el estado del logo basado en scroll (solo si no es relative)
  const shouldApplyScrollEffect = position !== "relative" && isScrolled;
  const currentTheme = shouldApplyScrollEffect ? "light" : theme;
  const logoIsDark = currentTheme === "dark";

  return (
    <header
      className={`${
        currentTheme === "light" ? "light" : "dark"
      } ${getPositionClass(
        position
      )} top-0 left-0 right-0 w-full z-100 pb-2 tablet:pb-2 laptop:pb-3 bg-transparent
      ${
        position !== "relative"
          ? "transition-all duration-300 ease-in-out"
          : "bg-white"
      }
      ${
        shouldApplyScrollEffect
          ? "bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.14)] pt-2 tablet:pt-2 laptop:pt-3 laptop:pb-2"
          : "pt-2 tablet:pt-2 laptop:pt-3 bg-transparent"
      }   
      ${
        pathname !== ROUTING.OFF_PLAN && pathname.startsWith(ROUTING.OFF_PLAN)
          ? "hidden"
          : "block"
      }`}
    >
      <div
        className={`flex flex-row items-center justify-between h-auto max-w-[1440px] mx-auto
        px-5 tablet:spacing-padding-x transition-all duration-300 ease-in-out ${
          shouldApplyScrollEffect ? "laptop:px-10" : "laptop:px-16"
        }`}
      >
        <MenuBar
          isVisible={isMenuOpen}
          onClose={toggleMenu}
          onOpenContactModal={() => setIsContactModalOpen(true)}
          services={services}
          areas={areas}
        />
        <LogoResize logoIsDark={logoIsDark} />
        <div className='laptop:hidden flex flex-row gap-5 items-center'>
          <button
            onClick={setIsContactModalOpen.bind(null, true)}
            className='hidden tablet:flex flex-row gap-1.5 items-center'
          >
            <p className='normal-case tracking-wide text-sm text-text-secondary-button'>
              Get a free quotation
            </p>
            <figure className='text-text-secondary-button translate-y-[1px]'>
              <ArrowUpRight size={18} />
            </figure>
          </button>
          <button
            onClick={toggleMenu}
            className={`cursor-pointer bg-surface-background p-4 rounded-full outline-1
              ${shouldApplyScrollEffect ? "outline-secondary-stroke" : "outline-transparent"}
              `}
          >
            <figure className='relative text-secondary-foreground'>
              <Hamburguer size={14} />
            </figure>
          </button>
        </div>

        <nav className='hidden laptop:flex relative items-center text-secondary'>
          <ul className='flex items-center gap-[26px] h-auto'>
            <li className='flex items-center relative group h-auto'>
              <Link
                href={`${ROUTING.HOME}`}
                className={`group-hover:text-accent-foreground flex items-center py-3 h-full cursor-pointer text-[15px] leading-[180%] ${
                  pathname === ROUTING.HOME ? "text-accent-foreground" : ""
                }`}
              >
                Home
              </Link>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
            </li>
            <li className='flex items-center relative group h-auto'>
              <Link
                href={`${ROUTING.FOR_SALE}`}
                className={`group-hover:text-accent-foreground flex items-center py-3 h-full cursor-pointer text-[15px] leading-[180%] ${
                  pathname === ROUTING.FOR_SALE ? "text-accent-foreground" : ""
                }`}
              >
                Buy
              </Link>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
            </li>
            <li className='flex items-center h-auto relative group'>
              <Link
                href={`${ROUTING.FOR_RENT}`}
                className={`group-hover:text-accent-foreground flex items-center h-full py-3 cursor-pointer text-[15px] leading-[180%] ${
                  pathname === ROUTING.FOR_RENT ? "text-accent-foreground" : ""
                }`}
              >
                Rent
              </Link>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
            </li>
            <li className='flex items-center h-auto relative group'>
              <Link
                href={`${ROUTING.OFF_PLAN}`}
                className={`group-hover:text-accent-foreground flex items-center h-full py-3 cursor-pointer text-[15px] leading-[180%] ${
                  pathname === ROUTING.OFF_PLAN ? "text-accent-foreground" : ""
                }`}
              >
                New Projects
              </Link>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
            </li>
            <li className='flex items-center h-auto relative group'>
              <Link
                href={`${ROUTING.LIST_YOUR_PROPERTY}`}
                className={`group-hover:text-accent-foreground flex items-center h-full py-3 cursor-pointer text-[15px] leading-[180%] ${
                  pathname === ROUTING.LIST_YOUR_PROPERTY
                    ? "text-accent-foreground"
                    : ""
                }`}
              >
                List Your Property
              </Link>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
            </li>
            <li
              className='flex flex-row gap-1 items-center relative group cursor-pointer text-[15px] py-3 h-full'
              onMouseEnter={() => setIsSitemapOpen(true)}
              onMouseLeave={() => setIsSitemapOpen(false)}
              onFocus={() => setIsSitemapOpen(true)}
              onBlur={() => setIsSitemapOpen(false)}
              tabIndex={0}
            >
              <span className='text-secondary group-hover:text-accent-foreground leading-[180%]'>
                More
              </span>
              <figure className='text-terciary-foreground/80 group-hover:text-accent-foreground h-max translate-y-[1px]'>
                <CaretArrow size={8} direction='down' />
              </figure>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
              <NavigationTab
                isOpen={isSitemapOpen}
                onClickContactButton={() => {
                  setIsSitemapOpen(false);
                  setIsContactModalOpen(true);
                }}
                services={services}
                areas={areas}
              />
            </li>
            <li className='flex flex-row gap-2 items-center h-full relative group cursor-pointer text-[15px]'>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className='text-secondary-foreground group-hover:text-accent-foreground leading-[180%] py-3'
              >
                Get a free consultation
              </button>
              <figure className='text-terciary-foreground/80 group-hover:text-accent-foreground translate-y-[2px]'>
                <ArrowUpRight size={18} />
              </figure>
              <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full'></div>
            </li>
          </ul>
        </nav>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title='Get a Free Quotation'
      />
    </header>
  );
}

function getPositionClass(position: "absolute" | "relative" | "fixed") {
  return position === "absolute"
    ? "absolute"
    : position === "fixed"
    ? "fixed"
    : "relative";
}
