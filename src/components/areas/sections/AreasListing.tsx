"use client";
import { Pagination as PaginationType } from "@/interfaces/common.interface";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";
import { AreaModel } from "@/interfaces/areas-response.interface";
import { AreaBackgroundCard } from "../../common/card/AreaBackgroundCard";
import { Pagination } from "@/components/common/navigation/Pagination";

interface AreasListingProps {
  areas: AreaModel[];
  pagination: PaginationType;
}

export const AreasListing = ({ areas, pagination }: AreasListingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination?.pageCount || 1;

  const handleChangeSortBy = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", String(value));
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <section className='bg-surface-background'>
      <div className='bg-surface-background spacing-padding-x py-[20px] spacing-gap max-w-[1440px] mx-auto flex flex-col'>
        <ul
          className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 grid-row-[auto] gap-x-4 gap-y-5
          animate-fade-in-up delay-100 animate-distance-sm duration-500'
        >
          {areas.map((area, index) => (
            <AreaBackgroundCard
              key={area.id}
              title={area.attributes.Area_name}
              image={area.attributes.Image.data.attributes.url}
              slug={area.attributes.slug}
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
