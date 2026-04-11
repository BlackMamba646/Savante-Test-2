import { Contact } from "@/components/common/sections/Contact";
import { DeveloperListing } from "@/components/developers/sections/DeveloperListing";
import { HeroDevelopers } from "@/components/developers/sections/HeroDevelopers";
import { DeveloperModelWithNumberOfProjects } from "@/interfaces/developers-response.interface";
import { APIService } from "@/services/api.service";
import { DevelopersSearchParams } from "@/types/params";
import { filterNonNull } from "@/utils/utils";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dubai Property Developers | Explore Top Real Estate Builders",
  description:
    "Discover Dubai’s leading property developers. Browse top builders, new projects, and investment opportunities.",
};

interface PageProps {
  searchParams: Promise<DevelopersSearchParams>;
}

export default async function DevelopersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const querySearch = (params.q as string) || "";
  const page = Number(params.page) || 1;
  const sort = (params.sort as string) || "";
  const developersByArea = (params.developersByArea as string) || "";
  const completionStatus = (params.completionStatus as string) || "";

  const developerQuery = {
    fields: ["Name", "slug", "createdAt"],
    populate: {
      Logo: {
        fields: ["url"],
      },
    },
  };

  /* console.log(sort);
  console.log(sort == 'fewer-projects' ? 'createdAt:asc' : 'createdAt:desc'); */
  const developersResponse = await APIService.findDevelopers({
    filters: filterNonNull({
      Name: filterNonNull({
        $contains: querySearch,
      }),
      DevelopersByArea: filterNonNull({
        $contains: developersByArea,
      }),
      CompletionStatus: filterNonNull({
        $contains: completionStatus,
      }),
    }),
    ...developerQuery,
    pagination: {
      page,
      pageSize: 12,
    },
    sort: sort == "fewer-projects" ? "createdAt:asc" : "createdAt:desc",
  });

  const data = developersResponse.data.map(async (developer) => {
    const projectsResponse = await APIService.findProjects({
      filters: filterNonNull({
        developer_ID: { slug: { $eq: developer.attributes.slug } },
      }),
      fields: ["Title"],
      sort: "createdAt:desc",
      pagination: {
        page: 1,
        pageSize: 1000,
      },
    });

    return {
      ...developer,
      numberOfProjects: projectsResponse.pagination.total || 0,
    };
  });

  const developers = await Promise.all(data);

  const contactInfo = await APIService.findContactInfo();

  /* console.log(developers); */

  return (
    <main>
      <HeroDevelopers />
      <DeveloperListing
        developers={developers as DeveloperModelWithNumberOfProjects[]}
        pagination={developersResponse.pagination}
      />
      <Contact contactInfo={contactInfo} />
    </main>
  );
}