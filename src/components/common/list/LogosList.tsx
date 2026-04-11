import React from "react";
import { Emaar } from "../logo/Emaar";
import { Nakheel } from "../logo/Nakheel";
import { Damac } from "../logo/Damac";
import { Meraas } from "../logo/Meraas";
import { cn } from "@/lib/utils";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface LogosListProps {
  className?: string;
  type?: "big" | "small";
}

export const LogosList = ({ className, type = "small" }: LogosListProps) => {
  return (
    <AnimationReveal
      x={0}
      y={5}
      delay={0.4}
      duration={0.3}
      opacity={1}
      type='ul'
      className='flex flex-row flex-wrap items-center gap-4 p-1'
    >
      <LogoItem
        icon={<Emaar />}
        className={`${type === "big" ? "h-[12px]" : "h-[8px]"}`}
      />
      <LogoItem
        icon={<Nakheel />}
        className={`${type === "big" ? "h-[18px]" : "h-[16px]"}`}
      />
      <LogoItem
        icon={<Damac />}
        className={`${type === "big" ? "h-[9px]" : "h-[6px]"}`}
      />
      <LogoItem
        icon={<Meraas />}
        className={`${type === "big" ? "h-[16px]" : "h-[12px]"}`}
      />
    </AnimationReveal>
  );
};

export const LogoItem = ({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <li
      className={cn(
        "relative opacity-80 text-accent-solid last:hidden laptop:last:flex",
        className
      )}
    >
      {icon}
    </li>
  );
};
