import React, { FC } from "react";
import { Service } from "@/components/shared/icons/service";
import { CalendarDot } from "@/components/shared/icons/calendar-dot";
import { Buildings } from "@/components/shared/icons/buildings";
import { Signature } from "@/components/shared/icons/signature";
import { Sparkle } from "@/components/shared/icons/sparkle";
import { ChartLine } from "@/components/shared/icons/chart-line";

export interface StepProps {
  index: number;
  title: string;
  description: string;
  icon: FC;
}

export const stepsData: StepProps[] = [
  {
    index: 1,
    title: "Consultation",
    description:
      "We listen, understand, and align with your investment or lifestyle goals.",
    icon: Service,
  },
  {
    index: 2,
    title: "Property Selection",
    description:
      "We shortlist only top-tier, high-ROI developments that match your needs.",
    icon: Buildings,
  },
  {
    index: 3,
    title: "Secure Your Investment",
    description:
      "We handle all paperwork, ensuring a smooth and hassle-free process.",
    icon: Signature,
  },
  {
    index: 4,
    title: "Progress Updates",
    description:
      "Receive regular updates on your property's development from our dedicated team.",
    icon: CalendarDot,
  },
  {
    index: 5,
    title: "Final Handover",
    description:
      "We manage the final inspection and handover, ensuring everything is flawless.",
    icon: Sparkle,
  },
  {
    index: 6,
    title: "Profitable Exit or Rental",
    description: "We help you rent or resell for maximum returns, hassle-free.",
    icon: ChartLine,
  },
];