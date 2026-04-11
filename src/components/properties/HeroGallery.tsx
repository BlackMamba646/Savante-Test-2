import Image from "next/image";
import { ENVIRONMENT } from "@/config/env.config";
import { YoutubeVideo as FeaturedYoutubeVideo } from "@/components/shared/components/YoutubeVideo";
import { extractVideoId } from "@/utils/utils";
import { ArrowUpRight } from "../shared/icons/arrow-up-right";
import { CornersOut } from "../shared/icons/corners-out";
import { shimmer, toBase64 } from "@/lib/image-placeholders";

interface HeroGalleryProps {
  youtubeUrl: string;
  setShowVideo: (show: boolean) => void;
  showVideo: boolean;
  main_image: string;
  title: string;
  isMobile: boolean;
  images: string[];
  setIsGalleryOpen: (open: boolean) => void;
  description: string;
}

export const HeroGallery = (props: HeroGalleryProps) => {
  const {
    youtubeUrl,
    setShowVideo,
    showVideo,
    main_image,
    title,
    isMobile,
    images,
    setIsGalleryOpen,
    description,
  } = props;
  return (
    <div className='flex flex-col laptop:flex-row gap-2.5'>
      <div
        className={`flex-none laptop:flex-1 relative ${
          youtubeUrl
            ? "aspect-video"
            : "w-full h-[220px] tablet:h-[380px] laptop:h-[450px]"
        } rounded-2xl laptop:rounded-3xl overflow-hidden animate-fade-in delay-100 duration-300`}
        aria-label={`Watch ${title || ""} in YouTube`}
      >
        {youtubeUrl ? (
          <FeaturedYoutubeVideo
            videoId={extractVideoId(youtubeUrl)}
            title={title}
            description={description + "YouTube video by " + title}
            className='w-full h-full object-cover'
            rel='preload'
          />
        ) : (
          <Image
            src={main_image}
            alt={title}
            width={1000}
            height={500}
            className='w-full h-full object-cover'
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(710, 360)
            )}`}
          />
        )}
      </div>

      <ul
        className='flex-1 max-w-full laptop:max-w-[400px] flex flex-row laptop:flex-col 
        gap-2.5 min-h-[80px] tablet:min-h-[150px] laptop:min-h-auto 
        animate-fade-in duration-300 delay-200'
      >
        {images.slice(0, 3).map((image, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <li
              className={`flex-1 relative w-full rounded-2xl overflow-hidden first:hidden 
              tablet:first:block laptop:first:hidden nth-[2]:hidden tablet:nth-[2]:block 
              }
              ${isLast ? "cursor-pointer" : ""}`}
              key={image}
              onClick={isLast ? () => setIsGalleryOpen(true) : undefined}
            >
              <Image
                src={ENVIRONMENT.API_URL + image}
                alt={title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='w-full h-full object-cover'
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(710, 360)
                )}`}
              />
              {isLast && (
                <div
                  className='absolute inset-0 w-full h-full flex flex-row justify-center items-center 
                  dark group'
                  style={{
                    background:
                      "linear-gradient(0deg, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 0%, var(--color-stops-gray-80, rgba(0, 0, 0, 0.80)) 100%)",
                  }}
                >
                  <div className='relative flex flex-row tablet:flex-col laptop:flex-row gap-3 laptop:gap-2.5 z-50 items-center'>
                    <figure
                      className='relative p-1 tablet:p-2 text-[#5D5D5D] bg-white [&>svg]:group-hover:scale-110 
                    [&>svg]:transition-all [&>svg]:duration-300'
                    >
                      <CornersOut size={20} />
                    </figure>
                    <p className='text-secondary leading-[95%] heading-secondary'>
                      See all photos
                    </p>
                    <figure
                      className='relative text-terciary-foreground group-hover:rotate-45 
                    transition-all duration-300 hidden laptop:block'
                    >
                      <ArrowUpRight size={20} />
                    </figure>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
