import { AdditionalInformation } from "@/components/blogs/sections/AditionalInformation";
import { HeroBlogDetail } from "@/components/blogs/sections/HeroBlogDetail";
import { Contact } from "@/components/common/sections/Contact";
import { LatestProjects } from "@/components/common/sections/LatestProjects";
import { LatestNews } from "@/components/home/sections/LatestNews";
import MarkdownToJsx from "@/components/ui/markdown-to-jsx";
import { ROUTING } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { APIService } from "@/services/api.service";
import {
  blogListingQuery,
  latestProjectListingQuery,
} from "@/utils/query-request.util";
import { redirect } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const blogs = await APIService.findBlogs({
    filters: { slug: { $ne: slug } },
    ...blogListingQuery,
    sort: ["createdAt:desc"],
    pagination: { pageSize: 4 },
  });

  const { data } = await APIService.findBlogs({
    filters: { slug: { $eq: slug } },
    populate: "*",
  });

  if (!data || !data[0].id) {
    return redirect(ROUTING.NOT_FOUND);
  }

  const contactInfo = await APIService.findContactInfo();

  const blog = data.at(0)?.attributes;

  const latestProjects = await APIService.findProjects({
    ...latestProjectListingQuery,
    pagination: {
      page: 1,
      pageSize: 5,
    },
    sort: ["createdAt:desc"],
  });

  return (
    <main className='bg-surface-background'>
      <HeroBlogDetail
        title={blog?.Title}
        description={blog?.Blog_brief || ""}
        date_published={blog?.Date_published}
        image={
          blog?.Main_image?.data?.attributes?.url
            ? ENVIRONMENT.API_URL + blog?.Main_image?.data?.attributes?.url
            : "/images/home/video-thumbnail.webp"
        }
      />
      <AdditionalInformation
        content={<MarkdownToJsx content={blog?.Content} />}
      />
      {latestProjects.data.length > 0 && (
        <LatestProjects
          projects={latestProjects.data}
          title={"Latest Projects"}
          cta={"Explore All"}
        />
      )}
      {blogs.data.length > 0 && (
        <LatestNews
          blogs={blogs.data}
          title={"More Blogs & Posts"}
          cta={"Explore All"}
        />
      )}
      <Contact contactInfo={contactInfo} />
    </main>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const project = await APIService.findBlogs({
    filters: {
      slug: { $eq: slug },
    },
    fields: ["Meta_title", "Meta_description", "Title"],
  });

  const data = project.data.at(0)?.attributes;

  return {
    title: data?.Meta_title || `Blog Post - ${slug}`,
    description: data?.Meta_description || `View details for blog post ${slug}`,
  };
}
