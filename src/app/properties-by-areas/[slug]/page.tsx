import { HeroAreaDetail } from "@/components/areas/sections/HeroAreaDetail";
import { Contact } from "@/components/common/sections/Contact";
import { Description } from "@/components/common/sections/Description";
import { FeaturedProperties } from "@/components/common/sections/FeaturedProperties";
import { LatestProjects } from "@/components/common/sections/LatestProjects";
import MarkdownToJsx from "@/components/ui/markdown-to-jsx";
import { ROUTING } from "@/config/constant.config";
import { APIService } from "@/services/api.service";
import {
  latestProjectListingQuery,
  propertyListingQuery,
} from "@/utils/query-request.util";
import { filterNonNull, isMobile } from "@/utils/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface PropertiesByAreaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropertiesByAreaPageProps): Promise<Metadata> {
  const { slug } = await params;

  const areaQuery = {
    populate: {
      Image: {
        fields: ["url"],
      },
    },
  };

  const { data } = await APIService.findAreas({
    filters: filterNonNull({
      slug: filterNonNull({ $eq: slug }),
    }),
    ...areaQuery,
  });

  const area = data.at(0)?.attributes;

  return {
    title:
      area?.Area_name ||
      area?.H1 ||
      area?.Area_name ||
      `Properties in ${slug} | Savante Realty`,
    description:
      area?.Description ||
      area?.Description ||
      `Explore properties available in ${area?.Area_name || slug
      }. Find your perfect home in Dubai with Savante Realty.`,
  };
}

export default async function PropertiesByAreaPage({
  params,
}: PropertiesByAreaPageProps) {
  const { slug } = await params;

  console.log("slug", slug);

  const properties = await APIService.findProperties({
    filters: {
      area_ID: {
        slug: {
          $eq: slug,
        },
      },
    },
    ...propertyListingQuery,
    populate: {
      Images: { fields: ["url"] },
      area_ID: { fields: ["Area_name", "slug"] },
    },
    pagination: {
      pageSize: 8,
    },
    sort: "createdAt:desc",
  });

  const projectsByArea = await APIService.findProjects({
    filters: {
      area_ID: {
        slug: {
          $eq: slug,
        },
      },
    },
    ...latestProjectListingQuery,
    pagination: {
      pageSize: 5,
    },
    sort: "createdAt:desc",
  });

  const areaQuery = {
    populate: {
      Image: {
        fields: ["url"],
      },
    },
  };

  const { data } = await APIService.findAreas({
    filters: filterNonNull({
      slug: filterNonNull({ $eq: slug }),
    }),
    ...areaQuery,
  });

  if (!data.length || !data.at(0)?.id) return redirect(ROUTING.NOT_FOUND);

  const area = data.at(0)?.attributes;

  const contactInfo = await APIService.findContactInfo();

  /* console.log(area); */

  return (
    <main className='bg-surface-background'>
      <HeroAreaDetail
        title={area?.H1}
        image={area?.Image?.data?.attributes?.url}
        description={area?.Description}
      />
      {properties?.data?.length ? (
        <FeaturedProperties
          title='Featured Properties'
          properties={properties?.data}
        />
      ) : null}
      <Description
        title={area?.H1 || ""}
        subtitle={area?.Area_name || ""}
        image={area?.Image?.data?.attributes?.url || ""}
        description={area?.Description || ""}
      />
      {area?.Content && (
        <div className='prose prose-base mx-auto flex w-full max-w-[1440px] flex-col gap-5 spacing-padding-x laptop:prose-lg prose-headings:text-brand-dark overflow-hidden py-10'>
          <MarkdownToJsx content={area?.Content} />
        </div>
      )}
      {projectsByArea?.data?.length ? (
        <LatestProjects
          title={`Top New Projects Opportunities in ${area?.Area_name}`}
          projects={projectsByArea?.data}
        />
      ) : null}
      <Contact contactInfo={contactInfo} />
    </main>
  );
}
