import { Crimson_Text, Plus_Jakarta_Sans } from "next/font/google";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: [ "400", "600", "700"],
  display: "swap",
  variable: "--font-crimson-text",
  preload: true,
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  preload: true,
});

export { crimsonText, plusJakartaSans };