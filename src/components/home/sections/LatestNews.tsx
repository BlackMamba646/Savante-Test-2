import { LinkButton } from "@/components/common/button/LinkButton";
import { BlogCard } from "@/components/common/card/BlogCard";
import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ROUTING } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { blogPosts } from "@/data/blog-posts";
import { BlogModel } from "@/interfaces";
import { formatDateWithMonthStatic } from "@/utils/format-date";

interface LatestNewsProps {
  title?: string;
  cta?: string;
  blogs: BlogModel[];
}

export const LatestNews = ({ title, cta, blogs }: LatestNewsProps) => {
  return (
    <section className='relative bg-surface-background overflow-hidden'>
      <div className='max-w-[1440px] mx-auto spacing-padding-x spacing-padding-y flex flex-col gap-5'>
        <div className='w-full flex flex-row justify-between items-center'>
          <h2 className='text-secondary leading-[120%] font-medium tracking-[-1.38px]'>
            {title}
          </h2>
          <AnimationReveal
            x={0}
            y={0}
            delay={1}
            duration={0.5}
            opacity={1}
            whileInView={true}
            type='div'
            className='hidden tablet:block'
          >
            <LinkButton
              text='Explore All'
              href={ROUTING.BLOGS}
              customClassName='btn-primary-fill-variant w-full tablet:w-max rounded-full overflow-hidden justify-center py-3 px-6'
              textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              animateIcon={true}
              iconAnimation='rotate'
              iconRotation={45}
            />
          </AnimationReveal>
        </div>
        <ul
          className='grid grid-rows-[auto] tablet:grid-rows-1 grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4
          [&>*:nth-child(n+3)]:hidden laptop:[&>*:nth-child(n+3)]:flex'
          role='list'
        >
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              index={index}
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
            />
          ))}
        </ul>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.7}
          duration={0.5}
          opacity={1}
          whileInView={true}
          type='div'
          className='blog tablet:hidden w-full mt-2'
        >
          <LinkButton
            text='Explore All'
            href={ROUTING.FOR_SALE}
            customClassName='btn-primary-fill-variant w-full tablet:w-max rounded-full overflow-hidden justify-center py-3 px-6'
            textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={false}
            iconAnimation='rotate'
            iconRotation={45}
          />
        </AnimationReveal>
      </div>
    </section>
  );
};
