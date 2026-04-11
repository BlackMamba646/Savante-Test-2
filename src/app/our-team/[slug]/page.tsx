import { HeroAgentDetail} from "@/components/our-team/sections/HeroAgentDetail";
import { ROUTING, SortPrice } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { APIService } from "@/services/api.service";
import { SimpleListingSearchParams } from "@/types/params";
import { agentQuery, propertyListingQuery } from "@/utils/query-request.util";
import { filterNonNull, getSortOrder } from "@/utils/utils";
import { redirect } from "next/navigation";
import React from "react";
import { Contact } from "@/components/common/sections/Contact";
import { FeaturedProperties } from "@/components/common/sections/FeaturedProperties";
import { AgentPropertiesListing } from "@/components/our-team/sections/AgentPropertiesListing";

interface AgentDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<SimpleListingSearchParams>;
}

const getAgentDetail = async (slug: string) => {
  const res = await APIService.findAgents({
    filters: filterNonNull({ slug: filterNonNull({ $eq: slug }) }),
    ...agentQuery,
  });

  const agentItem = res.data?.[0];

  if (!agentItem || !agentItem.id) {
    return null;
  }

  return agentItem.attributes;
};

export default async function AgentDetailPage({
  params,
  searchParams,
}: AgentDetailPageProps) {
  const { slug } = await params;
  const { page = "1", sort } = await searchParams;

  if (!slug) throw new Response("Not Found", { status: 404 });

  const agent = await getAgentDetail(slug);

  if (!agent) return redirect(ROUTING.NOT_FOUND);

  const properties = await APIService.findProperties({
    ...propertyListingQuery,
    pagination: {
      page: Number(page) || 1,
      pageSize: 8,
    },
    sort: getSortOrder(sort),
  });

  const contactInfo = await APIService.findContactInfo();

  /* console.log(agent) */

  return (
    <main className="bg-surface-background">
      <HeroAgentDetail
        name={agent.Name}
        role={agent.Role}
        imageUrl={ENVIRONMENT.API_URL + agent.Image.data.attributes.url}
        whatsapp={agent.Contact.WhatsApp}
        email={agent.Contact.Email}
        phone={agent.Contact.Phone}
        brokerNumber={agent.Broker_number}
        experience={agent.Experience}
        languages={agent.Language}
        biography={agent.Short_biography}
      />
      <AgentPropertiesListing
        properties={properties.data}
      />
      <Contact contactInfo={contactInfo} />
    </main>
  );
}

export async function generateMetadata({ params }: AgentDetailPageProps) {
  const { slug } = await params;

  const agent = await getAgentDetail(slug);
  const agentName = agent?.Name || slug;

  return {
    title: `${agentName} | Savante Realty`,
    description: `View details for ${agentName}'s profile at Savante Realty`,
  };
}