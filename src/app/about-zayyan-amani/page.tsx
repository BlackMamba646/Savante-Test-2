import { AdvisoryPhilosophy } from "@/components/about-zayyan-amani/sections/AdvisoryPhilosophy";
import { FromStruggleToPurpose } from "@/components/about-zayyan-amani/sections/FromStruggleToPurpose";
import { HeroAboutZayyanAmani } from "@/components/about-zayyan-amani/sections/HeroAboutZayyanAmani";
import { InvestmentPhilosophy } from "@/components/about-zayyan-amani/sections/InvestmentPhilosophy";
import { LongTermVision } from "@/components/about-zayyan-amani/sections/LongTermVision";
import { RealEstateTrackRecord } from "@/components/about-zayyan-amani/sections/RealEstateTrackRecord";
import { OurServices } from "@/components/common/sections/OurServices";
import { APIService } from "@/services/api.service";
import { serviceListingQuery } from "@/utils/query-request.util";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Zayyan Amani | Dubai Real Estate Developer",
  description: "Discover the story of Zayyan Amani, the founder of Savante Realty. Learn about his journey, his vision, and his commitment to the real estate industry.",
};

export default async function AboutZayyanAmaniPage() {

  const services = await APIService.findServices(serviceListingQuery);
  return (
    <main className="bg-white relative">
      <HeroAboutZayyanAmani />
      <FromStruggleToPurpose />
      <RealEstateTrackRecord />
      <AdvisoryPhilosophy />
      <InvestmentPhilosophy />
      <LongTermVision />
      <OurServices services={services} />
    </main>
  );
}