import * as motion from "motion/react-client";
import React from "react";

type HtmlTag = keyof React.JSX.IntrinsicElements;

interface Props {
  x?: number;
  y?: number;
  delay: number;
  duration: number;
  opacity: number;
  children: React.ReactNode;
  whileInView: boolean;
  type: HtmlTag;
  className?: string;
  [key: string]: any;
  onClick?: () => void;
  animate?: boolean;
}

function AnimationReveal(props: Partial<Props>) {
  const {
    delay = 0,
    x = 0,
    y = 10,
    opacity = 1,
    duration = 0.5,
    whileInView = true,
    type = "div",
    className,
    children,
    onClick,
    animate = true,
      ...rest
  } = props;

  const MotionComponent = motion[type as keyof typeof motion] as React.ComponentType<any>;

  if (!animate) {
    return (
      <MotionComponent className={className} {...rest}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

export { AnimationReveal };
