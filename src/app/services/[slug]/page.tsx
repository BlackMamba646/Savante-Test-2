import { OurServices } from "@/components/common/sections/OurServices";
import { Reviews } from "@/components/common/sections/Reviews";
import { EverythingYouNeed } from "@/components/services/sections/EverythingYouNeed";
import { HeroService } from "@/components/services/sections/HeroService";
import { TrustedAndReliable } from "@/components/services/sections/TrustedAndReliable";
import { ROUTING } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { APIService } from "@/services/api.service";
import { serviceListingQuery, serviceQuery } from "@/utils/query-request.util";
import { filterNonNull } from "@/utils/utils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { redirect } from "next/navigation";
import React from "react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  const services = await APIService.findServices({
    filters: filterNonNull({ slug: filterNonNull({ $ne: slug }) }),
    ...serviceListingQuery,
    sort: ["createdAt:desc"],
  });

  const data = await APIService.findServices({
    filters: filterNonNull({ slug: filterNonNull({ $eq: slug }) }),
    ...serviceQuery,
  });

  const reviews = await APIService.findTestimonies({
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });

  if (!data.at(0)?.id) {
    return redirect(ROUTING.NOT_FOUND);
  }

  const page = {
    id: data.at(0)?.id,
    ...data.at(0)?.attributes,
  };

  return (
    <main className="bg-white relative">
      <HeroService
        title={page?.Title}
        description={page?.Introduction ?? ""}
        image={page?.Main_image?.data?.attributes?.url ?? ""}
        value={page?.id}
      />
      <Reviews reviews={reviews} />
      <TrustedAndReliable
        title={page?.Title ?? ""}
        description={page?.Introduction ?? ""}
        phrase={page?.Phrase ?? ""}
        image={page?.Main_image?.data?.attributes?.url ?? ""}
      />
      {page?.Service_content?.map((el, idx) => (
        <EverythingYouNeed
          key={idx}
          isReverse={idx % 2 === 0}
          title={el?.Subtitle}
          index={idx + 1}
          content={<BlocksRenderer content={el?.Content} />}
          image={ENVIRONMENT.API_URL + (el?.Image?.data?.attributes?.url ?? "")}
        />
      ))}
      {services?.length > 0 && <OurServices services={services} />}
    </main>
  );
}
