"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

/**
 * Formatea un número con separadores de miles y decimales
 * @param num - Número a formatear
 * @param decimals - Cantidad de decimales a mostrar
 * @returns String formateado con comas para miles y decimales
 */
const formatNumber = (num: number, decimals: number): string => {
  // Si tiene decimales, los mostramos
  if (decimals > 0) {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // Si es entero, solo agregamos separadores de miles
  return Math.round(num).toLocaleString("en-US");
};

export const AnimatedCounter = ({
  value,
  duration = 2,
  className = "",
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Parsear el valor (puede venir como "4.5" o "1,059" o número)
  const targetValue = typeof value === "string" 
    ? parseFloat(value.replace(/,/g, "")) 
    : value;

  // Detectar cuántos decimales tiene el valor original
  const decimalPlaces = typeof value === "string" && value.includes(".")
    ? value.split(".")[1]?.length || 0
    : 0;

  // Formatear el valor en tiempo real durante la animación
  const formatted = useTransform(() => 
    formatNumber(count.get(), decimalPlaces)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const controls = animate(count, targetValue, { duration });
          setHasAnimated(true);
          
          return () => controls.stop();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [count, targetValue, duration, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  );
};

