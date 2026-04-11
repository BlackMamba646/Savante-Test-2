"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  state?: "default" | "hover" | "focus" | "disabled";
  showRightIcon?: boolean;
  showLeftIcon?: boolean;
  rightIcon?: React.ComponentType<{ size?: number; className?: string }>;
  leftIcon?: React.ComponentType<{ size?: number; className?: string }>;
  iconSize?: number;
  iconClassName?: string;
  textClassName?: string;
  customClassName?: string;
  animateIcon?: boolean;
  iconRotation?: number;
  iconAnimation?: "rotate" | "scale" | "bounce" | "none";
  ariaLabel?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TextButton({
  text,
  type = "button",
  state = "default",
  showRightIcon = false,
  showLeftIcon = false,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  iconSize = 10,
  iconClassName = "",
  textClassName = "",
  customClassName = "",
  animateIcon = false,
  iconRotation = 45,
  iconAnimation = "rotate",
  ariaLabel,
  title,
  onClick,
  ...rest
}: TextButtonProps) {
  const getIconAnimationClass = () => {
    if (!animateIcon) return "";

    switch (iconAnimation) {
      case "rotate":
        return "transition-transform duration-300 ease-in-out group-hover:rotate-45";
      case "scale":
        return "transition-transform duration-300 ease-in-out group-hover:scale-110";
      case "bounce":
        return "transition-transform duration-300 ease-in-out group-hover:animate-bounce";
      default:
        return "";
    }
  };

  const iconAnimationClass = getIconAnimationClass();

  const buttonClasses = cn(
    "group",
    customClassName,
    state === "disabled" && "opacity-50 pointer-events-none cursor-not-allowed"
  );

  const iconClasses = cn(iconClassName, iconAnimationClass);

  return (
    <button
      data-slot='custom-button'
      type={type}
      className={buttonClasses}
      disabled={state === "disabled"}
      onClick={onClick}
      data-state={state}
      aria-label={ariaLabel}
      title={title}
      {...rest}
    >
      {showLeftIcon && LeftIcon && (
        <LeftIcon size={iconSize} className={cn(iconClasses, "rotate-0 size-[18px]")} />
      )}

      <span
        className={cn(
          "text-[15px] leading-[100%]",
          textClassName
        )}
      >
        {text}
      </span>

      {showRightIcon && RightIcon && (
        <RightIcon size={iconSize} className={cn(iconClasses, "size-[18px]")} />
      )}
    </button>
  );
}
