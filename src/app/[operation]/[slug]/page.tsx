import { FeaturedProperties } from "@/components/common/sections/FeaturedProperties";
import { HeroPropertyDetail } from "@/components/properties/sections/HeroPropertyDetail";
import { MortgageCalculator } from "@/components/properties/sections/MortgageCalculator";
import { PropertyInformation } from "@/components/properties/sections/PropertyInformation";
import { OPERATION, OPERATION_TYPES } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { APIService } from "@/services/api.service";
import { filterNonNull } from "@/utils/utils";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { userAgent } from "next/server";
import React from "react";

interface PropertyDetailPageProps {
  params: Promise<{
    operation: string;
    slug: string;
  }>;
}

function isValidOperation(
  operation: string
): operation is OPERATION_TYPES.FOR_SALE | OPERATION_TYPES.FOR_RENT {
  return (
    operation === OPERATION_TYPES.FOR_SALE ||
    operation === OPERATION_TYPES.FOR_RENT
  );
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { operation, slug } = await params;

  if (!isValidOperation(operation)) {
    return {
      title: "Not Found | Savante Realty",
    };
  }

  try {
    const operationType =
      operation === OPERATION_TYPES.FOR_SALE ? OPERATION.SALE : OPERATION.RENT;

    const property = await APIService.findProperties({
      filters: filterNonNull({
        slug: { $eq: slug },
        Operation: { $eq: operationType },
      }),
      populate: {
        Main_image: { fields: ["url"] },
        area_ID: { fields: ["Area_name"] },
      },
    });

    if (!property.data.length) {
      return {
        title: "Property Not Found | Savante Realty",
      };
    }

    const propertyData = property.data[0].attributes;
    const propertyTitle = propertyData?.Title || slug;
    const areaName = propertyData?.area_ID?.data?.attributes?.Area_name || "";
    const operationText =
      operation === OPERATION_TYPES.FOR_SALE ? "for Sale" : "for Rent";

    return {
      title: `${propertyTitle} ${operationText}${areaName ? ` in ${areaName}` : ""
        } | Savante Realty`,
      description: `${propertyTitle} ${operationText} in Dubai. ${propertyData?.Description ||
        "Premium property with Savante Realty Real Estate."
        }`,
      openGraph: {
        title: propertyTitle,
        description: propertyData?.Description || "",
        images: propertyData?.Main_image?.data?.attributes?.url
          ? [ENVIRONMENT.API_URL + propertyData.Main_image.data.attributes.url]
          : [],
      },
    };
  } catch (error) {
    return {
      title: `${slug} | Savante Realty`,
      description: "Property details in Dubai with Savante Realty",
    };
  }
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const ua = userAgent({ headers: await headers() });

  const isMobile =
    ua.isBot || ua.device.type === "mobile" || ua.device.type === "tablet";

  const { operation, slug } = await params;

  if (!isValidOperation(operation)) {
    return notFound();
  }

  const operationType =
    operation === OPERATION_TYPES.FOR_SALE ? OPERATION.SALE : OPERATION.RENT;

  const propertyQuery = {
    populate: {
      Main_image: { fields: ["url"] },
      Images: { fields: ["url"] },
      developer_ID: {
        fields: ["Name", "slug"],
        populate: {
          Logo: { fields: ["url"] },
        },
      },
      area_ID: {
        fields: ["Area_name", "slug"],
      },
      agent_ID: {
        fields: ["Name", "slug", "Email", "Phone"],
        populate: {
          Image: { fields: ["url"] },
        },
      },
    },
  };

  const property = await APIService.findProperties({
    filters: filterNonNull({
      slug: { $eq: slug },
      Operation: { $eq: operationType },
    }),
    ...propertyQuery,
  });

  if (!property.data.length || !property.data[0].id) {
    return notFound();
  }

  const propertyId = property.data[0].id;
  const propertyData = property.data[0].attributes;
  const areaSlug = propertyData?.area_ID?.data?.attributes?.slug;

  const similarProperties = areaSlug
    ? await APIService.findProperties({
      filters: filterNonNull({
        area_ID: { slug: { $eq: areaSlug } },
        Operation: { $eq: operationType },
        slug: { $ne: slug },
      }),
      populate: {
        Main_image: { fields: ["url"] },
        Images: { fields: ["url"] },
        area_ID: { fields: ["Area_name", "slug"] },
      },
      pagination: {
        pageSize: 6,
      },
      sort: "createdAt:desc",
    })
    : { data: [], pagination: { total: 0 } };


  const contactInfo = await APIService.findContactInfo();
  /* console.log(propertyData); */

  return (
    <main className='relative bg-white'>
      <HeroPropertyDetail
        title={propertyData?.Title || ""}
        property_type={propertyData?.Property_type || ""}
        operation={propertyData?.Operation || ""}
        price={propertyData?.Price || ""}
        address={propertyData?.Address || ""}
        baths={propertyData?.Bathrooms || 0}
        beds={propertyData?.Bedrooms || 0}
        total_area={propertyData?.Total_area || ""}
        main_image={
          ENVIRONMENT.API_URL +
          propertyData?.Main_image?.data?.attributes?.url || ""
        }
        images={
          propertyData?.Images?.data?.map((image) => image.attributes.url) || []
        }
        youtubeUrl={propertyData?.YoutubeURL || ""}
        isMobile={isMobile}
        description={propertyData?.Description || ""}
      />
      <PropertyInformation
        title={propertyData?.Title || ""}
        operation={propertyData?.Operation || ""}
        operationType={operation}
        thumbnail={
          ENVIRONMENT.API_URL +
          propertyData?.Images?.data?.at(-1)?.attributes?.url || ""
        }
        description={propertyData?.Description || ""}
        address={propertyData?.Address || ""}
        features={propertyData?.Features || []}
        amenities={propertyData?.Amenities || []}
        slug={slug}
        propertyId={propertyId}
        contactInfo={contactInfo}
      />
      {operation === OPERATION_TYPES.FOR_SALE && (
        <MortgageCalculator
          title='Mortgage Calculator'
          initialAmount={Number(propertyData?.Price || 0)}
          currencyCode='AED'
          propertyName={propertyData?.Title || ""}
          propertyId={propertyId}
        />
      )}
      {similarProperties.data.length > 0 && (
        <FeaturedProperties
          title='Similar Properties'
          properties={similarProperties.data}
        />
      )}
    </main>
  );
}
