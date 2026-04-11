import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface LinkButtonProps {
  text: string
  href: string
  state?: "default" | "hover" | "focus" | "disabled"
  showRightIcon?: boolean
  showLeftIcon?: boolean
  rightIcon?: React.ComponentType<{ size?: number; className?: string }>
  leftIcon?: React.ComponentType<{ size?: number; className?: string }>
  iconSize?: number
  iconClassName?: string
  textClassName?: string
  customClassName?: string
  animateIcon?: boolean
  iconRotation?: number
  iconAnimation?: "rotate" | "scale" | "bounce" | "none"
  ariaLabel?: string
  title?: string
  prefetch?: boolean
  target?: "_blank" | "_self"
  rel?: string
}

export function LinkButton({
  text,
  href,
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
  prefetch = true,
  target,
  rel,
}: LinkButtonProps) {
  const getIconAnimationClass = () => {
    if (!animateIcon) return ""
    
    switch (iconAnimation) {
      case "rotate":
        return "transition-transform duration-300 ease-in-out group-hover:rotate-[var(--icon-rotation)]"
      case "scale":
        return "transition-transform duration-300 ease-in-out group-hover:scale-110"
      case "bounce":
        return "transition-transform duration-300 ease-in-out group-hover:animate-bounce"
      default:
        return ""
    }
  }

  const iconAnimationClass = getIconAnimationClass()

  const linkClasses = cn(
    "group inline-flex items-center",
    customClassName,
    state === "disabled" && "opacity-50 pointer-events-none cursor-not-allowed"
  )

  const iconClasses = cn(
    iconClassName,
    iconAnimationClass
  )

  // Si está disabled, no renderizar como Link
  if (state === "disabled") {
    return (
      <div
        data-slot="link-button"
        className={linkClasses}
        data-state={state}
        aria-label={ariaLabel}
        title={title}
      >
        {showLeftIcon && LeftIcon && (
          <LeftIcon size={iconSize} className={cn(iconClasses, "rotate-0 size-[18px]")} />
        )}
        
        <span className={cn("text-[15px] leading-[180%] font-montserrat", textClassName)}>
          {text}
        </span>
        
        {showRightIcon && RightIcon && (
          <RightIcon size={iconSize} className={cn(iconClasses, "size-[18px]")} />
        )}
      </div>
    )
  }

  return (
    <Link
      href={href}
      data-slot="link-button"
      className={linkClasses}
      data-state={state}
      aria-label={ariaLabel}
      title={title}
      prefetch={prefetch}
      target={target}
      rel={rel}
      style={
        {
          '--icon-rotation': `${iconRotation}deg`
        } as React.CSSProperties
      }
    >
      {showLeftIcon && LeftIcon && (
        <LeftIcon size={iconSize} className={cn(iconClasses, "rotate-0 size-[18px]")} />
      )}
      
      <span className={cn("text-[15px] leading-[180%] font-montserrat", textClassName)}>
        {text}
      </span>
      
      {showRightIcon && RightIcon && (
        <RightIcon size={iconSize} className={cn(iconClasses, "size-[18px]")} />
      )}
    </Link>
  )
}