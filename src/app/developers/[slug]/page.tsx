import { Contact } from "@/components/common/sections/Contact";
import { Filters } from "@/components/project-listing/Filters";
import { ProjectListing } from "@/components/project-listing/sections/ProjectListing";
import { AreasSlider } from "@/components/common/navigation/AreasSlider";
import MarkdownToJsx from "@/components/ui/markdown-to-jsx";
import { ENVIRONMENT } from "@/config/env.config";
import { AreaModel, ProjectModelWithDeveloperName } from "@/interfaces";
import { APIService } from "@/services/api.service";
import { ProjectSearchParams } from "@/types/params";
import { areaListingQuery, reviewsQuery } from "@/utils/query-request.util";
import { filterNonNull, getProjectSortOrder } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";
import { HeroDeveloperDetail } from "@/components/developers/sections/HeroDeveloperDetail";

interface DeveloperDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<ProjectSearchParams>;
}

export default async function DeveloperDetailPage({
  params,
  searchParams,
}: DeveloperDetailPageProps) {
  const { slug } = await params;
  const paramsQuery = await searchParams;

  const {
    q,
    page,
    limit,
    sort,
    status,
    project_type,
    beds,
    baths,
    price_min,
    price_max,
    area,
    developer,
  } = paramsQuery;

  const developerQuery = {
    populate: {
      Logo: {
        fields: ["url"],
      },
    },
  };

  const developerResp = await APIService.findDevelopers({
    filters: filterNonNull({
      slug: filterNonNull({
        $eq: slug,
      }),
    }),
    ...developerQuery,
  });

  const filters: Record<string, any> = {
    // Filtro principal: proyectos de este desarrollador
    developer_ID: { slug: { $eq: slug } },
  };

  // Búsqueda por nombre/título y dirección (q)
  if (q) {
    filters.$or = [{ Title: { $contains: q } }, { Address: { $contains: q } }];
  }

  // Filtro por desarrollador
  if (developer) {
    filters.developer_ID = { slug: { $eq: developer } };
  }

  // Status del proyecto
  if (status) {
    filters.Handover = { $eq: status };
  }

  // Tipo de proyecto/propiedad
  if (project_type) {
    filters.Project_type = { $contains: project_type };
  }

  // Habitaciones (beds) - mínimo
  if (beds) {
    filters.Bedrooms = { $gte: Number(beds) };
  }

  // Baños (baths) - mínimo
  if (baths) {
    filters.Bathrooms = { $gte: Number(baths) };
  }

  // Rango de precios
  if (price_min || price_max) {
    filters.Starting_price = {
      ...(price_min && { $gte: Number(price_min) }),
      ...(price_max && { $lte: Number(price_max) }),
    };
  }

  // Filtro por área
  if (area) {
    filters.area_ID = { slug: { $eq: area } };
  }

  const allProjects = await APIService.findProjects({
    populate: {
      area_ID: { fields: ["id"] },
    },
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  });

  const projects = await APIService.findProjects({
    filters: filterNonNull(filters),
    populate: {
      Main_image: { fields: ["url"] },
      Images: { fields: ["url"] },
      developer_ID: { fields: ["Name", "slug"] },
      area_ID: { fields: ["Area_name", "slug"] },
    },
    pagination: {
      page: Number(page) || 1,
      pageSize: Number(limit) || 10,
    },
    sort: getProjectSortOrder(sort) || "createdAt:desc",
  });

  const projectsWithDeveloper = projects.data.map((project) => ({
    ...project,
    developerName:
      project.attributes.developer_ID?.data?.attributes?.Name || null,
  }));

  // aqui extramos los ids de las areas de los proyectos para
  // luego hacer la consulta de las areas por id y evitar hacer una
  // consulta por cada proyecto
  const uniqueAreaIds = Array.from(
    new Set(
      allProjects.data
        .map((project) => project.attributes.area_ID?.data?.id)
        .filter((id): id is number => id !== null && id !== undefined)
    )
  );

  const areasByProjects = await APIService.findAreas({
    filters: filterNonNull({
      id: { $in: uniqueAreaIds },
    }),
    ...areaListingQuery,
    sort: "createdAt:asc",
  });

  // removemos duplicados y ordenamos por id
  const areasUnique = (areasByProjects.data || []).sort(
    (a: AreaModel, b: AreaModel) => b.id - a.id
  );

  const contactInfo = await APIService.findContactInfo();

  const reviewsPage = await APIService.findHomePage(reviewsQuery);

  return (
    <main className='bg-surface-background'>
      <HeroDeveloperDetail
        developer={developerResp.data[0]}
        projects={projects.data}
        averageReview={reviewsPage.Hero.Average_reviews}
        numberOfReviews={reviewsPage.Hero.Number_reviews}
      />
      {developerResp.data[0].attributes?.Content && (
        <div
          className='relative prose prose-base mx-auto flex w-full max-w-[1440px] flex-col gap-5 spacing-padding-x laptop:prose-lg 
        prose-headings:text-brand-dark overflow-hidden pt-10 pb-10 
        [&_h2]:text-primary-foreground [&_h2]:font-medium [&_h2]:tracking-[-1.92px] [&_h2]:mt-4
          [&_h3]:font-medium [&_h3]:tracking-[-1.92px] [&_h3]:mt-2
          [&_h4]:font-medium [&_h4]:tracking-[-1.92px] [&_h4]:mt-2
          [&_p]:text-secondary [&_p]:text-[15px] [&_p]:leading-[180%] [&_p]:font-montserrat
          [&_a]:text-primary-foreground [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-4
          [&_ul]:font-plus [&_ul]:list-none [&_li]:text-[15px] [&_li]:leading-[180%] [&_ul]:font-normal [&_li]:text-secondary'
        >
          <div className='absolute left-0 bottom-0 border-b-[1px] border-primary-stroke h-[1px] w-full'></div>
          <MarkdownToJsx
            API={ENVIRONMENT.API_URL}
            content={developerResp.data[0].attributes.Content}
          />
        </div>
      )}
      <div className="py-5">
        <Filters developers={developerResp.data} areas={areasUnique} className="py-0 pb-3 relative" />
        {areasUnique.length > 0 && (
          <AreasSlider
            className='hidden laptop:flex spacing-padding-x gap-4
          max-w-[1440px] mx-auto flex-row'
            areas={areasUnique}
            selectedArea={area}
          />
        )}

        <ProjectListing
          projects={projectsWithDeveloper as ProjectModelWithDeveloperName[]}
          pagination={projects.pagination}
        />
      </div>
      <Contact contactInfo={contactInfo} />
    </main>
  );
}

export async function generateMetadata({
  params,
}: DeveloperDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const developerQuery = {
    populate: {
      Logo: {
        fields: ["url"],
      },
    },
  };

  const developerResp = await APIService.findDevelopers({
    filters: filterNonNull({
      slug: filterNonNull({
        $eq: slug,
      }),
    }),
    ...developerQuery,
  });

  const developer = developerResp.data[0]?.attributes;

  return {
    title: developer?.Name || `${slug.toUpperCase()} | Savante Realty`,
    description: developer?.Name
      ? `${developer.Name} is one of the leading developers in Dubai's real estate market. Discover projects, properties, and opportunities with ${developer.Name}.`
      : "",
  };
}
