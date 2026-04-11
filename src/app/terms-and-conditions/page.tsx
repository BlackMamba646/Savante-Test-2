import type { Metadata } from "next";
import { APIService } from "@/services/api.service";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ROUTING } from "@/config/constant.config";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Terms and Conditions | Savante Realty",
  description: "Terms and Conditions for Savante Realty website",
};

export default async function TermsAndConditionsPage() {
  try {
    const page = await APIService.findTermsAndConditions();

    if (!page || !page.Content || !page.Content.length) {
      notFound();
    }

    return (
      <main className='relative bg-white'>
        <section className='flex gap-5 max-w-[1440px] mx-auto flex-col spacing-padding-x'>
          <div className='container mx-auto'>
            <div
              className='prose prose-base flex w-full flex-col gap-5
          laptop:prose-lg prose-headings:text-brand-dark overflow-hidden py-10 
          animate-fade-in-up animate-distance-xs delay-100 duration-300
          '
            >
              <h1 className='text-left'>{page.Title}</h1>
              <BlocksRenderer content={page.Content} />
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading terms and conditions:", error);
    redirect(ROUTING.NOT_FOUND);
  }
}
