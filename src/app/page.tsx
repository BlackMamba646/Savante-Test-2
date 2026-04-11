import { FeaturedProperties } from "@/components/common/sections/FeaturedProperties";
import { Features } from "@/components/common/sections/Features";
import { LatestProjects } from "@/components/common/sections/LatestProjects";
import { OurServices } from "@/components/common/sections/OurServices";
import { Reviews } from "@/components/common/sections/Reviews";
import { AboutStoryAndPurpose } from "@/components/home/sections/AboutStoryAndPurpose";
import { DevelopersLogos } from "@/components/home/sections/DevelopersLogo";
import { ExploreAreas } from "@/components/home/sections/ExploreAreas";
import { HeroHome } from "@/components/home/sections/HeroHome";
import { InstagramInfoWrapper } from "@/components/home/sections/InstagramInfoWrapper";
import { InvestmentCalculator } from "@/components/home/sections/InvestmentCalculator";
import { WhyChooseUs } from "@/components/common/sections/WhyChooseUs";
import { APIService } from "@/services/api.service";
import {
  areaQuery,
  blogListingQuery,
  homeQuery,
  latestProjectListingQuery,
  propertyListingQuery,
  reviewListingQuery,
  serviceListingQuery,
} from "@/utils/query-request.util";
import { filterNonNull } from "@/utils/utils";
import { LatestNews } from "@/components/home/sections/LatestNews";
import { Podcasts } from "@/components/home/sections/Podcasts";
import { Contact } from "@/components/common/sections/Contact";
import { ENVIRONMENT } from "@/config/env.config";
import { youtubeService } from "@/services/youtube.service";

export default async function HomePage() {
  const page = await APIService.findHomePage(homeQuery);

  const areas = await APIService.findAreas({
    filters: filterNonNull({
      Featured: filterNonNull({
        $eq: false,
      }),
    }),
    ...areaQuery,
    pagination: {
      pageSize: 6,
    },
    sort: "createdAt:asc",
  });

  const properties = await APIService.findProperties({
    ...propertyListingQuery,
    pagination: {
      pageSize: 6,
    },
    sort: ["createdAt:desc"],
  });

  const blogs = await APIService.findBlogs({
    ...blogListingQuery,
    pagination: {
      pageSize: 4,
    },
    sort: ["createdAt:desc"],
  });

  const latestProjects = await APIService.findProjects({
    ...latestProjectListingQuery,
    pagination: {
      page: 1,
      pageSize: 6,
    },
    sort: ["createdAt:desc"],
  });

  const services = await APIService.findServices({
    ...serviceListingQuery,
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });

  const reviews = await APIService.findTestimonies({
    ...reviewListingQuery,
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });

  const contactInfo = await APIService.findContactInfo();

  // Fetch YouTube videos for Podcasts section
  let youtubeVideos: Awaited<
    ReturnType<typeof youtubeService.getChannelVideos>
  > = [];
  try {
    youtubeVideos = await youtubeService.getChannelVideos(
      ENVIRONMENT.YOUTUBE_MAX_VIDEOS
    );
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
  }

  /* console.log(page); */

  return (
    <main className='bg-white relative'>
      <HeroHome />
      <FeaturedProperties properties={properties.data} showAnimation={false} />
      <Features />
      <WhyChooseUs page={page?.Why_us} theme='light' />
      <ExploreAreas areas={areas.data} />
      <LatestProjects projects={latestProjects.data} />
      <InvestmentCalculator />
      <DevelopersLogos />
      <OurServices services={services} />
      {page?.Instagram_section?.Show && <InstagramInfoWrapper />}
      <AboutStoryAndPurpose />
      <Reviews reviews={reviews} />
      <Podcasts videos={youtubeVideos} />
      <LatestNews
        blogs={blogs.data}
        title={page?.Blog?.Title}
        cta={page?.Blog?.CTA}
      />
      <Contact contactInfo={contactInfo} />
    </main>
  );
}
