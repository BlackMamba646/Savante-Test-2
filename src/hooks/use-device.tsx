import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/config/constant.config";

export type DeviceType = "mobile" | "tablet" | "laptop" | "desktop";

export interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  width: number;
}

export function useDeviceType(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "desktop",
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: true,
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
  });

  useEffect(() => {
    function getDeviceType(width: number): DeviceType {
      if (width < BREAKPOINTS.TABLET) return "mobile";
      if (width < BREAKPOINTS.LAPTOP) return "tablet";
      if (width < BREAKPOINTS.DESKTOP) return "laptop";
      return "desktop";
    }

    function handleResize() {
      const width = window.innerWidth;
      const type = getDeviceType(width);

      setDeviceInfo({
        type,
        isMobile: type === "mobile",
        isTablet: type === "tablet",
        isLaptop: type === "laptop",
        isDesktop: type === "desktop",
        width,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}