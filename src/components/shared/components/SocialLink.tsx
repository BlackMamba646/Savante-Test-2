import { AnimationReveal } from "@/components/ui/animation-reveal";
import React, { FC } from "react";

interface SocialLinkProps {
  index?: number;
  href: string;
  icon: FC;
  size?: number;
  className?: string;
  animate?: boolean;
}

export const SocialLink = ({
  index,
  href,
  icon,
  size = 14,
  className,
  animate = false,
}: SocialLinkProps) => {
  const content = (
    <a
      href={href}
      className={`social-icon-variant ${className || ""}`}
      aria-label='Social Link'
      target='_blank'
      rel='noopener noreferrer'
    >
      <figure
        className={`min-w-[${size}px] group-hover:scale-115 transition-transform duration-300 ease`}
      >
        {React.createElement(icon ?? (() => null))}
      </figure>
    </a>
  );

  if (!animate) {
    return <li className='list-none'>{content}</li>;
  }

  return (
    <AnimationReveal
      y={10}
      delay={0.2 + (index || 0) * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={true}
      type='li'
      className='list-none'
    >
      {content}
    </AnimationReveal>
  );
};
