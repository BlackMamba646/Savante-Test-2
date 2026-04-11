import { ArrowUp } from "@/components/shared/icons/arrow-up";
import { FC } from "react";

interface FeatureItem {
  title: string;
  value: string;
  bodyText?: string;
  icon?: FC;
}

export const features: FeatureItem[] = [
  {
    title: "913%",
    value: "YoY increase in sales value",
    bodyText: "2024",
  },
  {
    title: "+4.5 M SQFT",
    value: "Project area",
    bodyText: "In planning and progress",
  },
  {
    title: "1,059%",
    value: "Rise in Sales Volume",
    bodyText: "2024",
  },
];

export const moreFeatures: FeatureItem[] = [
  {
    title: "90%",
    value: "Occupation rate",
  },
  {
    title: "#5",
    value: "Most visited cities ",
    bodyText: "In the world",
  },
  {
    title: "141.9 B",
    value: "Total Sales Volume",
    bodyText: "Q3 2024",
  },
  {
    title: "6 Mos.",
    value: "Positive Revaluation",
    bodyText: "Average time in well-located properties",
  },
  {
    title: "46%",
    value: "Transactions",
    bodyText: "Increase in off-plan transactions in Nov 2024",
    icon: ArrowUp,
  },
  {
    title: "X2",
    value: "Population",
    bodyText: "Since 2010",
  },
];