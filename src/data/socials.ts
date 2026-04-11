import { Facebook } from "@/components/shared/icons/facebook";
import { Instagram } from "@/components/shared/icons/instagram";
import { Linkedin } from "@/components/shared/icons/linkedin";
import { Tiktok } from "@/components/shared/icons/tiktok";
import { Youtube } from "@/components/shared/icons/youtube";
import { FC } from "react";

export interface SocialLink {
  href: string;
  icon: FC;
}

export const socials: SocialLink[] = [
  {
    href: "https://www.facebook.com/objectonedubai",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com/objectonedubai",
    icon: Instagram,
  },
  {
    href: "https://t.me/objectonedubai",
    icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/objectonedubai",
    icon: Youtube,
  },
  {
    href: "https://www.tiktok.com/@objectonedubai",
    icon: Tiktok,
  },
];
