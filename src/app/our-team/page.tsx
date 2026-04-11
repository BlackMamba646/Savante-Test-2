import { Contact } from "@/components/common/sections/Contact";
import { AgentListing } from "@/components/our-team/sections/AgentListing";
import { HeroOurTeam } from "@/components/our-team/sections/HeroOurTeam";
import { APIService } from "@/services/api.service";
import { AgentListingSearchParams } from "@/types/params";
import { filterNonNull } from "@/utils/utils";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Meet Our Agents | Dubai Property Experts at Primadom",
  description:
    "Connect with Dubai’s top real estate agents. Primadom’s team helps you buy, sell, or rent with confidence.",
};

interface PageProps {
  searchParams: Promise<AgentListingSearchParams>;
}

export default async function OurTeam({ searchParams }: PageProps) {
  const params = await searchParams;

  const querySearch = (params.q as string) || "";
  const page = Number(params.page) || 1;
  const sort = (params.sort as string) || "";
  const language = (params.language as string) || "";
  const role = (params.role as string) || "";

  const agentQuery = {
    populate: {
      Image: {
        fields: ["url"],
      },
    },
  };

  const agents = await APIService.findAgents({
    filters: filterNonNull({
      Name: filterNonNull({
        $contains: querySearch,
      }),
      Language: filterNonNull({
        $contains: language,
      }),
      Role: filterNonNull({
        $contains: role,
      }),
    }),
    ...agentQuery,
    pagination: {
      page,
      pageSize: 10,
    },
  });

  const contactInfo = await APIService.findContactInfo();

  return (
    <main className="bg-white relative">
      <HeroOurTeam />
      <AgentListing agents={agents.data} pagination={agents.pagination} />
      <Contact contactInfo={contactInfo} />
    </main>
  );
}
