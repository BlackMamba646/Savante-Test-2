import { AboutSavanteRealty } from "@/components/about/sections/AboutSavanteRealty";
import { AboutZayyanAmani } from "@/components/about/sections/AboutZayyanAmani";
import { HeroAbout } from "@/components/about/sections/HeroAbout";
import { HighlightSection } from "@/components/about/sections/HighlightSection";
import { WhatMakesSavanteUnique } from "@/components/about/sections/WhatMakesSavanteUnique";
import { OurServices } from "@/components/common/sections/OurServices";
import { Reviews } from "@/components/common/sections/Reviews";
import { APIService } from "@/services/api.service";
import { reviewListingQuery, serviceListingQuery } from "@/utils/query-request.util";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Savante Realty | Dubai Real Estate Developer",
  description: "Discover the story of Savante Realty, the leading property developer in Dubai. Learn about our journey, our vision, and our commitment to the real estate industry.",
};

export default async function AboutPage() {

  const reviews = await APIService.findTestimonies({
    ...reviewListingQuery,
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });

  const services = await APIService.findServices({
    ...serviceListingQuery,
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });

  return (
    <main className="bg-white relative">
      <HeroAbout />
      <AboutSavanteRealty />
      <AboutZayyanAmani />
      <Reviews reviews={reviews} />
      <WhatMakesSavanteUnique />
      <HighlightSection />
      <OurServices services={services} />
    </main>
  );
}
