"use client";
import { MemberCard } from "@/components/common/card/MemberCard";
import { Pagination } from "@/components/common/navigation/Pagination";
import { ROUTING } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import { AgentModel } from "@/interfaces";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";

interface AgentListingProps {
  agents?: AgentModel[];
  pagination?: PaginationType;
}

export const AgentListing = ({ agents, pagination }: AgentListingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination?.pageCount || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${location.pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className='bg-surface-background'>
      <div
        className='relative mx-auto bg-surface-background spacing-padding-x py-5 spacing-gap max-w-[1440px] flex flex-col'
      >
        <div
          className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 grid-row-[auto] gap-x-4 gap-y-[24px]
          animate-fade-in-up delay-100 animate-distance-sm duration-500'
        >
          {agents?.map((agent, index) => (
            <MemberCard
              key={`agent-${index}`}
              id={agent.id}
              name={agent.attributes.Name}
              role={agent.attributes.Role}
              languages={agent.attributes.Language}
              image={
                ENVIRONMENT.API_URL + agent.attributes.Image.data.attributes.url
              }
              slug={`${ROUTING.OUR_TEAM}/${agent.attributes.slug}`}
              hasLanguages={true}
            />
          ))}
        </div>
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
