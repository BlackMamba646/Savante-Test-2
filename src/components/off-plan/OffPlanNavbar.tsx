"use client";
import { useEffect, useState } from "react";
import { TextButton } from "@/components/common/button/TextButton";
import { ArrowUpRight } from "../shared/icons/arrow-up-right";
import { ContactModel } from "@/interfaces/contact-info.interface";
import Image from "next/image";
import { ENVIRONMENT } from "@/config/env.config";
import { ProjectModal } from "../common/modal/ProjectModal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";

const navLinks = [
  { label: "Download Brochure", href: "#brochure" },
  { label: "Payment Plan", href: "#payment-plan" },
  { label: "Floor Plans", href: "#floor-plans" },
  { label: "Location", href: "#location" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
];

interface OffPlanNavbarProps {
  projectLogo?: string;
  contactInfo?: ContactModel;
  projectName?: string;
  projectId?: number;
}

export const OffPlanNavbar = ({
  projectLogo,
  contactInfo,
  projectName,
  projectId,
}: OffPlanNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determinar el theme basado en scroll
  const currentTheme = isScrolled ? "light" : "dark";
  const logoIsDark = currentTheme === "dark";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`${
        currentTheme === "light" ? "light" : "dark"
      } fixed top-0 left-0 right-0 w-full z-100
      transition-all duration-300 ease-in-out font-montserrat
      ${
        isScrolled
          ? "bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.14)]"
          : "py-0"
      }
      `}
    >
      <ProjectModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        projectName={projectName}
        projectId={projectId || 0}
        message={`Project information inquiry for ${projectName}`}
      />
      <div
        className={`flex flex-row items-center justify-between h-auto max-w-[1440px] mx-auto
          px-5 tablet:px-10 gap-1 tablet:gap-0 transition-all duration-300 ease-in-out
          ${isScrolled ? "laptop:px-10 py-0" : "laptop:px-16 py-2"}
        `}
      >
        {/* Logo - Center */}
        <div className='flex flex-row items-center justify-between w-full tablet:w-auto'>
          <figure
            className={`flex items-center justify-center
              transition-all duration-300 ease-in-out px-4 tablet:px-6
              ${
                isScrolled
                  ? "py-2.5 tablet:py-4 laptop:py-5 bg-shades-gray-50 inner-border-vertical-secondary"
                  : "py-2.5 laptop:py-2.5 bg-white outline-[0px] shadow-none"
              }
            `}
          >
            <Image
              src={
                projectLogo
                  ? ENVIRONMENT.API_URL + projectLogo
                  : "/images/logo-fallback.webp"
              }
              alt='Project Logo'
              width={83}
              height={32}
              className='object-contain h-[27px] w-[83px]'
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(83, 32)
              )}`}
            />
          </figure>
        </div>

        {/* Right Navigation - Desktop only */}
        <div className='hidden laptop:flex flex-row gap-[26px] items-center'>
          {navLinks.map((link) => (
            <div
              key={link.href}
              className={`flex items-center relative group h-auto py-1 ${
                isScrolled ? "opacity-100" : "opacity-60"
              }`}
            >
              <a
                href={link.href}
                className={`group-hover:text-accent-foreground text-secondary flex items-center 
                cursor-pointer text-[14px] leading-[180%]`}
              >
                {link.label}
              </a>
              <div
                className='absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all 
                duration-300 group-hover:w-full'
              ></div>
            </div>
          ))}
        </div>

        <div className='flex flex-row items-center gap-4 tablet:gap-[26px]'>
          <TextButton
            text={"Register your interest"}
            state={"default"}
            customClassName='btn-primary-outline-alpha-variant w-max py-3 px-5
            hidden laptop:flex rounded-4xl overflow-hidden'
            textClassName="text-[14px] tracking-normal text-background-primary-button whitespace-nowrap"
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            onClick={() => {
              setIsContactModalOpen(true);
            }}
          />
          <TextButton
            text={"Register interest"}
            state={"default"}
            customClassName='btn-secondary-variant w-max **:text-[14px] hidden mobile:flex laptop:hidden'
            textClassName="text-[12px] tracking-normal text-background-primary-button whitespace-nowrap"
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={true}
            iconAnimation={"rotate"}
            iconClassName="text-accent-solid"
            onClick={() => {
              setIsContactModalOpen(true);
            }}
          />
          {/* Hamburger Menu - Mobile/Tablet only */}
          <button
            onClick={toggleMenu}
            className='laptop:hidden flex flex-col gap-[3px] justify-center items-center 
            w-[40px] h-[40px] rounded-full border border-primary-stroke transition-all duration-300'
            aria-label='Toggle menu'
          >
            <span
              className={`block h-[2px] w-4 bg-secondary transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            ></span>
            <span
              className={`block h-[2px] w-4 bg-secondary transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-[2px] w-4 bg-secondary transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <div
        className={`laptop:hidden absolute top-full left-0 right-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.14)] overflow-hidden transition-all bg-surface-background duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className='flex flex-col gap-0 pt-0'>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={`text-secondary hover:text-accent-foreground text-[15px] leading-[180%] 
                py-3 border-b border-secondary-stroke px-5 tablet:px-10 ${
                  index === 0 ? "border-t" : ""
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
