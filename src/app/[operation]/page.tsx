import { Contact } from "@/components/common/sections/Contact";
import { AreasSlider } from "@/components/common/navigation/AreasSlider";
import { Filters } from "@/components/property-listing/Filters";
import { PropertyListing } from "@/components/property-listing/sections/PropertyListing";
import { OPERATION_TYPES } from "@/config/constant.config";
import { AreaModel, PropertyModel } from "@/interfaces";
import { APIService } from "@/services/api.service";
import { PropertySearchParams } from "@/types/params";
import { areaListingQuery } from "@/utils/query-request.util";
import { filterNonNull, getProjectSortOrder } from "@/utils/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface OperationPageProps {
  params: Promise<{
    operation: string;
  }>;
  searchParams: Promise<PropertySearchParams>;
}

function isValidOperation(
  operation: string
): operation is OPERATION_TYPES.FOR_SALE | OPERATION_TYPES.FOR_RENT {
  return (
    operation === OPERATION_TYPES.FOR_SALE ||
    operation === OPERATION_TYPES.FOR_RENT
  );
}

export function generateStaticParams() {
  return [{ operation: "for-sale" }, { operation: "for-rent" }];
}

export async function generateMetadata({
  params,
}: OperationPageProps): Promise<Metadata> {
  const { operation } = await params;

  if (!isValidOperation(operation)) {
    return {
      title: "Not Found | Schimdt & Partner",
    };
  }

  const titles = {
    [OPERATION_TYPES.FOR_SALE]: "Properties for Sale in Dubai",
    [OPERATION_TYPES.FOR_RENT]: "Properties for Rent in Dubai",
  };

  const descriptions = {
    [OPERATION_TYPES.FOR_SALE]:
      "Discover premium properties for sale in Dubai with Schimdt & Partner. From furnished apartments to luxury villas - find your perfect home today.",
    [OPERATION_TYPES.FOR_RENT]:
      "Find your ideal rental property in Dubai with Schimdt & Partner. Browse apartments, villas, and more available for rent in prime locations.",
  };

  return {
    title: `${titles[operation]} | Schimdt & Partner`,
    description: descriptions[operation],
  };
}

export default async function OperationPage({
  params,
  searchParams,
}: OperationPageProps) {
  const { operation } = await params;

  if (!isValidOperation(operation)) {
    return notFound();
  }

  const paramsQuery = await searchParams;

  const {
    q,
    page,
    limit,
    sort,
    status,
    property_type,
    beds,
    baths,
    price_min,
    price_max,
    area,
    size_min,
    size_max,
    garage,
    developer,
  } = paramsQuery;

  const filters: Record<string, any> = {
    Operation: { $eq: operation === "for-sale" ? "Sale" : "Rent" },
  };

  // Búsqueda por nombre/título y dirección
  if (q) {
    filters.$or = [{ Title: { $contains: q } }, { Address: { $contains: q } }];
  }

  // Filtro por desarrollador
  if (developer) {
    filters.developer_ID = { slug: { $eq: developer } };
  }

  // Status del proyecto
  if (status) {
    filters.Status = { $contains: status };
  }

  // Tipo de proyecto/propiedad
  if (property_type) {
    filters.Property_type = { $contains: property_type };
  }

  // Habitaciones (beds)
  if (beds) {
    filters.Bedrooms = { $gte: Number(beds) };
  }

  // Baños (baths)
  if (baths) {
    filters.Bathrooms = { $gte: Number(baths) };
  }

  // Rango de precios
  if (price_min || price_max) {
    filters.Price = {
      ...(price_min && { $gte: Number(price_min) }),
      ...(price_max && { $lte: Number(price_max) }),
    };
  }

  // Rango de tamaño
  if (size_min || size_max) {
    filters.Total_area = {
      ...(size_min && { $gte: Number(size_min) }),
      ...(size_max && { $lte: Number(size_max) }),
    };
  }

  // Número de garajes
  if (garage) {
    filters.Garage = { $eq: Number(garage) };
  }

  // Filtro por área
  if (area) {
    filters.area_ID = { slug: { $eq: area } };
  }

  const allProperties = await APIService.findProperties({
    populate: {
      area_ID: { fields: ["id"] },
    },
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  });

  const projects = await APIService.findProperties({
    filters: filterNonNull(filters),
    populate: {
      Main_image: { fields: ["url"] },
      Images: { fields: ["url"] },
      developer_ID: { fields: ["Name", "slug"] },
      area_ID: { fields: ["Area_name", "slug"] },
    },
    pagination: {
      page: Number(page) || 1,
      pageSize: Number(limit) || 12,
    },
    sort: getProjectSortOrder(sort) || "createdAt:desc",
  });

  const contactInfo = await APIService.findContactInfo();

  // aqui extramos los ids de las areas de los proyectos para
  // luego hacer la consulta de las areas por id y evitar hacer una
  // consulta por cada proyecto
  const uniqueAreaIds = Array.from(
    new Set(
      allProperties.data
        .map((property: PropertyModel) => property.attributes.area_ID?.data?.id)
        .filter((id): id is number => id !== null && id !== undefined)
    )
  );

  const areasByProjects = await APIService.findAreas({
    filters: filterNonNull({
      id: { $in: uniqueAreaIds },
    }),
    ...areaListingQuery,
    sort: "createdAt:desc",
  });

  // removemos duplicados y ordenamos por id
  const areasUnique = (areasByProjects.data || []).sort(
    (a: AreaModel, b: AreaModel) => b.id - a.id
  );

  return (
    <main className='bg-white relative'>
      <div>
        <Filters
          areas={areasUnique}
        />
        <AreasSlider
          className='hidden laptop:flex spacing-padding-x gap-4
          max-w-[1440px] mx-auto flex-row'
          areas={areasUnique}
          selectedArea={area}
        />
        <PropertyListing
          properties={projects.data}
          pagination={projects.pagination}
          areaName={area}
        />
      </div>
      <Contact contactInfo={contactInfo} />
    </main>
  );
}
