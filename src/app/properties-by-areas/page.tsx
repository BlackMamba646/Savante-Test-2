
import { AreasListing } from "@/components/areas/sections/AreasListing";
import { HeroPropertiesByAreas } from "@/components/areas/sections/HeroPropertiesByAreas";
import { Contact } from "@/components/common/sections/Contact";
import { APIService } from "@/services/api.service";
import { AreasSearchParams } from "@/types/params";
import { filterNonNull, sortAreasByPrice } from "@/utils/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dubai Areas Guide | Explore the Best Neighborhoods",
  description:
    "Browse Dubai’s top areas and communities. Discover neighborhoods and property opportunities with Savant Realty.",
};

interface PageProps {
  searchParams: Promise<AreasSearchParams>;
}

export default async function PropertiesByAreas({ searchParams }: PageProps) {
  const params = await searchParams;

  const querySearch = (params.q as string) || "";
  const page = Number(params.page) || 1;
  const sort = (params.sort as string) || "";

  const areaQuery = {
    fields: ["Area_name", "Featured", "slug", "createdAt"],
    populate: {
      Image: {
        fields: ["url"],
      },
    },
  };

  const areas = await APIService.findAreas({
    filters: filterNonNull({
      Area_name: filterNonNull({
        $contains: querySearch?.toLowerCase().trim(),
      }),
    }),
    ...areaQuery,
    pagination: {
      page,
      pageSize: 100,
    },
    sort: "createdAt:asc",
  });

  /* const sortedAreas = sortAreasByPrice(areas, sort); */

  const contactInfo = await APIService.findContactInfo();

  return (
    <main className='relative bg-white'>
      <HeroPropertiesByAreas />
      <AreasListing
        areas={areas.data}
        pagination={areas.pagination}
      />
      <Contact contactInfo={contactInfo} />
    </main>
  );
}