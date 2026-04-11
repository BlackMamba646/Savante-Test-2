import { APIService } from "@/services/api.service";
import { ProjectSearchParams } from "@/types/params";
import { filterNonNull, getProjectSortOrder } from "@/utils/utils";
import type { Metadata } from "next";
import { Contact } from "@/components/common/sections/Contact";
import { AreasSlider } from "@/components/common/navigation/AreasSlider";
import { areaListingQuery, areaQuery } from "@/utils/query-request.util";
import { AreaModel } from "@/interfaces/areas-response.interface";
import { ProjectModelWithDeveloperName } from "@/interfaces/project-response.interface";
import { ProjectListing } from "@/components/project-listing/sections/ProjectListing";
import { Filters } from "@/components/project-listing/Filters";

export const metadata: Metadata = {
  title: `Latest Projects Development in Dubai | Savante Realty`,
  description:
    "Discover premium properties for sale in Dubai with Savante Realty. From furnished apartments to luxury villas - find your perfect home today.",
};

interface OffPlanPageProps {
  searchParams: Promise<ProjectSearchParams>;
}

export default async function OffPlanPage({ searchParams }: OffPlanPageProps) {
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

  const filters: Record<string, any> = {};

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
    filters.Bedrooms = { $eq: Number(beds) };
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
      pageSize: Number(limit) || 6,
    },
    sort: getProjectSortOrder(sort) || "createdAt:desc",
  });

  const developers = await APIService.findDevelopers({
    fields: ["Name", "slug"],
    sort: "createdAt:asc",
    pagination: {
      page: 1,
      pageSize: 1000,
    },
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

  return (
    <main className='bg-surface-background'>
      <div>
        <Filters developers={developers.data} areas={areasUnique} />
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
