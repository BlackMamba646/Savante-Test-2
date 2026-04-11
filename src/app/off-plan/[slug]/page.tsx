import { LatestProjects } from "@/components/common/sections/LatestProjects";
import { WhyChooseUs } from "@/components/common/sections/WhyChooseUs";
import { FixedCard } from "@/components/off-plan/FixedCard";
import { OffPlanNavbar } from "@/components/off-plan/OffPlanNavbar";
import { Amenities } from "@/components/common/sections/Amenities";
import { ContactQR } from "@/components/off-plan/sections/ContactQR";
import { DownloadBrochure } from "@/components/off-plan/sections/DownloadBrochure";
import { FloorPlans } from "@/components/off-plan/sections/FloorPlans";
import { Gallery } from "@/components/off-plan/sections/Gallery";
import { GetStarted } from "@/components/off-plan/sections/GetStarted";
import { HeroOffPlanDetail } from "@/components/off-plan/sections/HeroOffPlanDetail";
import { Location } from "@/components/off-plan/sections/Location";
import { Overview } from "@/components/off-plan/sections/Overview";
import { PaymentPlan } from "@/components/off-plan/sections/PaymentPlan";
import { Summary } from "@/components/off-plan/sections/Summary";
import { WhyDubai } from "@/components/off-plan/sections/WhyDubai";
import { ROUTING } from "@/config/constant.config";
import { APIService } from "@/services/api.service";
import {
  aboutUsWhyUsQuery,
  homeWhyUsQuery,
  latestProjectListingQuery,
  projectQuery,
} from "@/utils/query-request.util";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { redirect } from "next/navigation";
import { AgentContactQR } from "@/components/off-plan/sections/AgentContactQR";

interface OffPlanPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OffPlanPage({ params }: OffPlanPageProps) {
  const { slug } = await params;

  const project = await APIService.findProjects({
    filters: {
      slug: { $eq: slug },
    },
    ...projectQuery,
  });

  const area = await APIService.findAreas({
    filters: {
      slug: {
        $eq: project.data.at(0)?.attributes?.area_ID?.data?.attributes?.slug,
      },
    },
  });

  // Obtener todos los proyectos excepto el actual
  const otherProjects = await APIService.findProjects({
    filters: {
      id: {
        $ne: project.data.at(0)?.id,
      },
    },
    ...latestProjectListingQuery,
    pagination: {
      pageSize: 5,
    },
    sort: ["createdAt:desc"],
  });

  if (!project.data?.length || !project.data.at(0)?.id) {
    return redirect(ROUTING.NOT_FOUND);
  }

  const data = project.data.at(0)?.attributes;

  const contactInfo = await APIService.findContactInfo();

  const homeWhyUs = await APIService.findHomePage(homeWhyUsQuery);

  /* console.log(contactInfo); */

  return (
    <main className="bg-white scroll-smooth">
      <OffPlanNavbar
        projectLogo={data?.developer_ID?.data?.attributes?.Logo?.data?.attributes?.url}
        contactInfo={contactInfo}
        projectName={data?.Title}
        projectId={project.data.at(0)?.id || 0}
      />
      <HeroOffPlanDetail
        title={data?.Title}
        big_title={data?.Big_title}
        hero_paragraph={data?.Hero_paragraph}
        starting_price={data?.Starting_price}
        project_type={data?.Project_type}
        handover={data?.Handover}
        area_name={area.data.at(0)?.attributes?.Area_name}
        area_slug={area.data.at(0)?.attributes?.slug}
        image={data?.Main_image?.data?.attributes?.url}
        projectId={project.data.at(0)?.id?.toString()}
        subtitle={data?.Subtitle_1}
        developerName={data?.developer_ID?.data?.attributes?.Name || "N/A"}
      />
      <div
        className="relative flex flex-row mx-auto max-w-[1440px] spacing-padding-x spacing-padding-y
        gap-[26px]"
      >
        <div className="flex flex-col flex-1">
          <Summary
            title={data?.Title || ""}
            address={data?.Address || ""}
            floorPlans={data?.Floor_plans || []}
            downPayment={data?.Payment_plans?.Down_payment_percentage}
            handover={data?.Handover}
            constructionPercentage={
              data?.Payment_plans?.During_construction_percentage
            }
            onHandoverPercentage={data?.Payment_plans?.On_handover_percentage}
            developerName={data?.developer_ID?.data?.attributes?.Name || "N/A"}
          />
          <Overview
            title={data?.Title}
            firstSubtitle={data?.Subtitle_1}
            firstDescription={data?.Description_1}
            contentImage={data?.Content_image?.data?.attributes?.url || ""}
            secondSubtitle={data?.Subtitle_2}
            secondDescription={data?.Description_2}
            youtubeUrl={data?.YoutubeURL}
          />
          <Amenities items={data?.Amenities} title="Amenities" className="pt-16" />
          <PaymentPlan paymentPlan={data?.Payment_plans} projectName={data?.Title} />
          <Gallery
            mainImage={data?.Main_image?.data?.attributes?.url || ""}
            images={
              data?.Images?.data?.map(
                (image: any) => image.attributes.url
              ) || []
            }
            developerLogo={data?.developer_ID?.data?.attributes?.Logo?.data?.attributes?.url || ""}
          />
          {data?.Floor_plans && data.Floor_plans.length > 0 && (
            <FloorPlans
              floor_plans={data?.Floor_plans}
              subtitle={area.data.at(0)?.attributes?.Area_name}
              projectName={data?.Title}
            />
          )}
          <Location
            location={data?.Address}
            description={data?.Location_paragraph}
            nearbyPlaces={data?.Nearby_places}
          />
          {data?.Brochure?.data?.attributes?.url && (
            <DownloadBrochure
              projectId={project.data.at(0)?.id?.toString()}
              brochureUrl={data?.Brochure?.data?.attributes?.url}
            />
          )}
        </div>
        <FixedCard
          title={data?.Title || ""}
          address={data?.Address || ""}
          thumbnail={data?.Main_image?.data?.attributes?.url || ""}
          contactInfo={contactInfo}
          projectId={project.data.at(0)?.id || 0}
        />
      </div>
      <GetStarted />
      <WhyChooseUs page={homeWhyUs?.Why_us} />
      <WhyDubai />
      {/* <AgentContactQR
        agentImage={'/images/agent-example.png'}
        projectId={project.data.at(0)?.id?.toString() || ""}
        mainImage={data?.Main_image?.data?.attributes?.url || ""}
        location={data?.Address || ""}
        projectNumber={data?.Project_number?.Project_number || ""}
        qr={data?.Project_number?.QR?.data?.attributes?.url || ""}
      /> */}
      <ContactQR
        projectId={project.data.at(0)?.id?.toString() || ""}
        mainImage={data?.Main_image?.data?.attributes?.url || ""}
        location={data?.Address || ""}
        projectNumber={data?.Project_number?.Project_number || ""}
        qr={data?.Project_number?.QR?.data?.attributes?.url || ""}
      />
      {otherProjects.data?.length > 0 && (
        <LatestProjects
          title="Top New Projects Opportunities"
          kicker="Explore"
          cta="View All Projects"
          projects={otherProjects.data}
        />
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: OffPlanPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await APIService.findProjects({
    filters: {
      slug: { $eq: slug },
    },
    fields: ["Meta_title", "Meta_description", "Title"],
  });

  const data = project.data.at(0)?.attributes;

  return {
    title: data?.Meta_title || `Off-Plan Property - ${slug}`,
    description:
      data?.Meta_description ||
      "View details for this off-plan property for sale",
  };
}