import { ROUTING } from "@/config/constant.config";
import { ServiceModel } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ServicesContainerProps {
  className?: string;
  services?: ServiceModel[];
}

export const ServicesContainer = ({
  className,
  services,
}: ServicesContainerProps) => {
  const tabletColumnsConfig = { servicesPerColumn: 3, maxColumns: 4 };
  const laptopColumnsConfig = { servicesPerColumn: 2, maxColumns: 5 };

  const createColumns = (config: typeof tabletColumnsConfig) => {
    const cols: ServiceModel[][] = [];
    const maxServices = config.maxColumns * config.servicesPerColumn;
    const limitedServices = services?.slice(0, maxServices);

    limitedServices?.forEach((service, index) => {
      if (index % config.servicesPerColumn === 0) {
        cols.push([]);
      }
      cols[cols.length - 1].push(service);
    });

    return cols;
  };

  const tabletColumns = createColumns(tabletColumnsConfig);
  const laptopColumns = createColumns(laptopColumnsConfig);

  return (
    <article className={cn("hidden tablet:block relative w-full", className)}>
      <div
        className='hidden laptop:block absolute top-0 left-0 inset-0'
        style={{
          background:
            "linear-gradient(180deg, rgba(26, 26, 26, 0.34) 0%, rgba(26, 26, 26, 0.00) 100%)",
        }}
      ></div>
      <div className='relative flex flex-col py-10 max-w-[1440px] mx-auto px-10 laptop:spacing-padding-x gap-5 z-10'>
        <span className='text-[12px] text-terciary-foreground uppercase leading-[180%] tracking-[0.96px] font-medium'>
          Services
        </span>

        {/* Grid para tablet: 4 columnas con 3 servicios cada una */}
        <div className='grid grid-cols-2 tablet:grid-cols-3 laptop:hidden gap-5'>
          {tabletColumns.map((column, columnIndex) => (
            <ul key={columnIndex} className='flex flex-col gap-3'>
              {column.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`${ROUTING.SERVICES}/${service.attributes?.slug}`}
                    title={service.attributes?.Title || "Service"}
                    aria-label={`Redirect to ${
                      service.attributes?.Title || "Service"
                    }`}
                    className='text-[14px] text-secondary/60 font-light font-montserrat
                      leading-[180%] hover:underline transition-all duration-200'
                  >
                    {service.attributes?.Title || "Service"}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Grid para laptop: 5 columnas con 2 servicios cada una */}
        <div className='hidden laptop:grid laptop:grid-cols-5 gap-4'>
          {laptopColumns.map((column, columnIndex) => (
            <ul key={columnIndex} className='flex flex-col gap-3 max-w-[280px]'>
              {column.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`${ROUTING.SERVICES}/${service.attributes?.slug}`}
                    title={service.attributes?.Title || "Service"}
                    aria-label={`Redirect to ${
                      service.attributes?.Title || "Service"
                    }`}
                    className='text-[14px] text-secondary/60 font-light font-montserrat
                      leading-[180%] hover:underline transition-all duration-200'
                  >
                    {service.attributes?.Title || "Service"}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </article>
  );
};
