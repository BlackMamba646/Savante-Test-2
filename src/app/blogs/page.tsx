import { BlogListing } from "@/components/blogs/sections/BlogListing";
import { HeroBlogs } from "@/components/blogs/sections/HeroBlogs";
import { OurServices } from "@/components/common/sections/OurServices";
import { APIService } from "@/services/api.service";
import { BlogListingSearchParams } from "@/types";
import { serviceListingQuery } from "@/utils/query-request.util";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savante Realty Blog | Dubai Real Estate Insights & New Projects",
  description:
    "Explore the Savante Realty blog for Dubai real estate insights, new project updates, market trends and expert perspectives from a leading property developer.",
};

interface BlogsProps {
  searchParams: Promise<BlogListingSearchParams>;
}

export default async function BlogsPage({ searchParams }: BlogsProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const services = await APIService.findServices(serviceListingQuery);

  const blogs = await APIService.findBlogs({
    fields: ["Title", "slug", "Date_published", "createdAt"],
    populate: {
      Main_image: {
        fields: ["url"],
      },
    },
    sort: ["createdAt:desc"],
    pagination: {
      page,
      pageSize: 12,
    },
  });

  const contactInfo = await APIService.findContactInfo();

  return (
    <main className='relative bg-white'>
      <HeroBlogs data="Our Blog" contactInfo={contactInfo} />
      <BlogListing blogs={blogs.data} pagination={blogs.pagination} />
      <OurServices services={services} />
    </main>
  );
}