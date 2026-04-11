"use client";
import { BlogCard } from "@/components/common/card/BlogCard";
import { Pagination } from "@/components/common/navigation/Pagination";
import { ENVIRONMENT } from "@/config/env.config";
import { BlogModel } from "@/interfaces/blog-response.interface";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import {
  formatDateWithMonthStatic,
} from "@/utils/format-date";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";

interface BlogListingProps {
  blogs: BlogModel[];
  pagination: PaginationType;
}

export const BlogListing = ({ blogs, pagination }: BlogListingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination?.pageCount || 1;

  const handleChangeSortBy = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", String(value));
    router.push(`${location.pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${location.pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className='bg-surface-background relative'>
      <div
        className='relative mx-auto bg-surface-background spacing-padding-x spacing-padding-y 
        laptop:py-[20px] spacing-gap max-w-[1440px] flex flex-col'
      >
        <h2
          className='text-primary-foreground text-start font-plus
          quote-text tracking-[-0.4px] font-semibold'
        >
          Latest Blogs & Posts
        </h2>
        <ul
          className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 grid-row-[auto] gap-x-4 gap-y-10
          animate-fade-in-up delay-100 animate-distance-sm duration-500'
        >
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.attributes.Title}
              date={formatDateWithMonthStatic(
                String(blog.attributes.Date_published) || ""
              )}
              slug={blog.attributes.slug}
              image={
                blog.attributes.Main_image?.data?.attributes?.url
                  ? ENVIRONMENT.API_URL + blog.attributes.Main_image.data.attributes.url
                  : "/images/home/video-thumbnail.webp"
              }
              disableAnimation={true}
            />
          ))}
        </ul>
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
