import * as React from "react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  icon: React.ComponentType<{ size?: number; className?: string }>
  big: boolean
  state?: "default" | "hover" | "focus" | "disabled"
  iconSize?: number
  iconClassName?: string
  customClassName?: string
  animateIcon?: boolean
  iconRotation?: number // Grados de rotación (ej: 45, 90, 180)
  iconAnimation?: "rotate" | "scale" | "bounce" | "none"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function IconButton({
  icon: Icon,
  big,
  state = "default",
  iconSize = 16,
  iconClassName = "",
  customClassName = "",
  animateIcon = false,
  iconRotation = 45,
  iconAnimation = "rotate",
  onClick,
  ...rest
}: IconButtonProps) {
  // Clases para la animación del ícono
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

  const paddingClass = big ? "px-[24px] py-[20px]" : "p-[12px]"

  const buttonClasses = cn(
    "group inline-flex items-center justify-center",
    paddingClass,
    customClassName,
    state === "disabled" && "opacity-50 pointer-events-none cursor-not-allowed"
  )

  const iconClasses = cn(
    iconClassName,
    iconAnimationClass
  )

  return (
    <button
      data-slot="icon-button"
      className={buttonClasses}
      disabled={state === "disabled"}
      onClick={onClick}
      data-state={state}
      {...rest}
    >
      <figure className={iconClasses}>
        <Icon size={iconSize} />
      </figure>
    </button>
  )
}

export { IconButton }
export type { IconButtonProps }