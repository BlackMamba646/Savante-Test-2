"use client";
import { ArrowUpRight } from "../../shared/icons/arrow-up-right";
import { CaretArrow } from "@/components/shared/icons/caret-arrow";
import { PropertyCard } from "@/components/common/card/PropertyCard";
import { PropertyModel } from "@/interfaces/property-response.interface";
import { ROUTING } from "@/config/constant.config";
import { LinkButton } from "../button/LinkButton";
import { useEmblaCarouselHook } from "@/hooks/use-embla-carousel";
import { ENVIRONMENT } from "@/config/env.config";
import { AnimationReveal } from "@/components/ui/animation-reveal";

interface FeaturedPropertiesProps {
  title?: string;
  properties: PropertyModel[];
  showAnimation?: boolean;
}

export const FeaturedProperties = ({
  title = "Featured Properties",
  properties,
  showAnimation = true,
}: FeaturedPropertiesProps) => {
  const { emblaRef, scrollPrev, scrollNext, currentSlide, totalSlides } =
    useEmblaCarouselHook({
      align: "start",
      loop: true,
    });

  const progressPercentage = (currentSlide / totalSlides) * 100;

  return (
    <section className='relative bg-surface-background overflow-hidden flex flex-col'>
      <div className='spacing-padding-y flex flex-col spacing-gap'>
        <div className='max-w-[1440px] mx-auto spacing-padding-x w-full'>
          <h2 className='text-primary-foreground tracking-[-1.38px]'>
            {title}
          </h2>
        </div>

        {/* Carousel: Breakout hacia la derecha */}
        <AnimationReveal
          x={0}
          y={5}
          delay={0.4}
          duration={0.3}
          opacity={1}
          type='div'
          className='relative laptop:max-w-[100vw] max-w-[1440px] mx-0 pl-[20px] tablet:pl-[36px] laptop:px-0'
          animate={showAnimation}
        >
          <div className='overflow-hidden carousel-padding-left' ref={emblaRef}>
            <div className='flex -ml-4'>
              {properties.map((property) => (
                <div
                  key={property.id}
                  className='shrink-0 w-[326px] tablet:w-[376px] pr-0 pl-4'
                >
                  <PropertyCard
                    title={property.attributes.Title}
                    address={property.attributes.Address}
                    baths={property.attributes.Bathrooms}
                    beds={property.attributes.Bedrooms}
                    images={property.attributes?.Images?.data?.map(
                      (el) => ENVIRONMENT.API_URL + el.attributes?.url
                    )}
                    price={property.attributes.Price}
                    squareFeet={property.attributes.Total_area}
                    currency='AED'
                    operation={property.attributes.Operation}
                    slug={property.attributes.slug}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimationReveal>

        <footer
          className='max-w-[1440px] mx-auto spacing-padding-x flex flex-col pr-4 tablet:pr-0 tablet:flex-row 
          justify-between w-full items-start tablet:items-center gap-[40px] laptop:gap-0'
        >
          <div
            className={`flex-1 laptop:flex-none flex flex-row-reverse tablet:flex-row font-sans items-center gap-4 
              laptop:gap-7 w-full laptop:w-max`}
          >
            <div className='flex flex-row gap-3 items-center'>
              <button
                onClick={scrollPrev}
                className='cursor-pointer block tablet:hidden text-accent-foreground'
              >
                <CaretArrow size={10} direction='left' />
              </button>
              <span className='text-[12px] text-secondary-foreground font-semibold leading-[180%] whitespace-nowrap'>
                {currentSlide} / {totalSlides}
              </span>
              <button
                onClick={scrollNext}
                className='cursor-pointer block tablet:hidden text-accent-foreground'
              >
                <CaretArrow size={10} direction='right' />
              </button>
            </div>
            <div className='flex-1 flex flex-row gap-4 items-center laptop:flex-row-reverse w-full laptop:w-auto'>
              <div
                className='hidden tablet:flex order-2 laptop:order-3 flex-row laptop:flex-row gap-2 
                items-center cursor-pointer select-none'
                onClick={scrollPrev}
              >
                <figure className='text-accent-solid rotate-0'>
                  <CaretArrow size={10} direction='left' />
                </figure>
                <span className='heading-secondary leading-[95%] text-text-secondary-button'>
                  Prev
                </span>
              </div>

              <div className='flex-1 laptop:flex-none order-1 laptop:order-2 w-full tablet:w-full laptop:w-[320px] h-1 bg-gray-200 overflow-hidden'>
                <div
                  className='h-full bg-accent-solid transition-all duration-300 ease-out'
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div
                className='hidden tablet:flex order-3 laptop:order-1 flex-row-reverse laptop:flex-row-reverse gap-2 
                items-center cursor-pointer select-none'
                onClick={scrollNext}
              >
                <figure className='text-accent-solid'>
                  <CaretArrow size={10} direction='right' />
                </figure>
                <span className='heading-secondary leading-[95%] text-text-secondary-button'>
                  Next
                </span>
              </div>
            </div>
          </div>
          <AnimationReveal
            x={0}
            y={0}
            delay={0.7}
            duration={0.5}
            opacity={1}
            type='div'
            className='flex-none laptop:flex-1 flex justify-end pr-5 tablet:pr-9 
            laptop:pr-10 w-full tablet:w-auto'>
            <LinkButton
              text='Explore All'
              href={ROUTING.FOR_SALE}
              customClassName='btn-primary-outline-alpha-variant w-full tablet:w-max rounded-full overflow-hidden justify-center py-3 px-6'
              textClassName='uppercase leading-[140%] text-[12px] tracking-[0.96px] whitespace-nowrap'
              showRightIcon={true}
              rightIcon={ArrowUpRight}
              animateIcon={false}
              iconClassName='text-background-primary-button'
            />
          </AnimationReveal>
        </footer>
      </div>
    </section>
  );
};
