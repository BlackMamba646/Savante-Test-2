import { cn } from "@/lib/utils";

export interface TextLabelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text: string;
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
}

export function TextLabel({
  text,
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
  ...rest
}: TextLabelProps) {
  const getIconAnimationClass = () => {
    if (!animateIcon) return "";

    switch (iconAnimation) {
      case "rotate":
        return "transition-transform duration-300 ease-in-out group-hover:rotate-[var(--icon-rotation)]";
      case "scale":
        return "transition-transform duration-300 ease-in-out group-hover:scale-110";
      case "bounce":
        return "transition-transform duration-300 ease-in-out group-hover:animate-bounce";
      default:
        return "";
    }
  };

  const iconAnimationClass = getIconAnimationClass();

  const divClasses = cn(
    "group",
    customClassName,
    state === "disabled" && "opacity-50 pointer-events-none cursor-not-allowed"
  );

  const iconClasses = cn(iconClassName, iconAnimationClass);

  return (
    <div
      data-slot='custom-button'
      className={divClasses}
      data-state={state}
      style={
        {
          "--icon-rotation": `${iconRotation}deg`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {showLeftIcon && LeftIcon && (
        <LeftIcon size={iconSize} className={cn(iconClasses)} />
      )}

      <span
        className={cn(
          "text-[15px] leading-[180%] font-montserrat",
          textClassName
        )}
      >
        {text}
      </span>

      {showRightIcon && RightIcon && (
        <RightIcon size={iconSize} className={iconClasses} />
      )}
    </div>
  );
}
