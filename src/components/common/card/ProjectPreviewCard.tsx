import { AnimationReveal } from "@/components/ui/animation-reveal";
import { ENVIRONMENT } from "@/config/env.config";
import { ProjectItem } from "@/data/projects";
import { shimmer, toBase64 } from "@/utils/image-loader";
import Image from "next/image";

export const ProjectPreviewCard = ({
  id,
  index,
  title,
  developerLogo,
  mainImage,
  selectedIndex,
  onSelect,
  totalProjects,
}: Partial<ProjectItem> & {
  id: number;
  index: number;
  onSelect: () => void;
  selectedIndex: number;
  totalProjects?: number;
}) => {
  return (
    <AnimationReveal
      y={0}
      delay={index * 0.1}
      duration={0.5}
      opacity={1}
      whileInView={false}
      type='li'
      className='mobile:last:flex last:hidden overflow-hidden w-full 
      laptop:[&:not(:last-child)>button]:inner-border-no-left!'
    >
      <button
        className={`relative select-none flex project-slide-item flex-col min-w-auto laptop:min-w-[180px] w-full max-w-full laptop:max-w-[180px] pt-[40px] pr-[20px] pb-[12px] pl-[20px]
            gap-2.5 items-end cursor-pointer ${
              index === selectedIndex ? "project-slide-item-selected" : ""
            }`}
        onClick={onSelect}
      >
        <Image
          src={ENVIRONMENT.API_URL + mainImage}
          alt={title || "Project"}
          width={500}
          height={286}
          className='absolute object-cover -z-10 inset-0 w-full h-full'
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1014, 580)
          )}`}
        />

        <div
          className={`absolute inset-0 -z-5 transition-opacity duration-500 ${
            index === selectedIndex ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: `linear-gradient(0deg, var(--color-stops-gray-50, rgba(0, 2, 10, 0.50)) 0%, var(--color-stops-gray-50, rgba(0, 2, 10, 0.50)) 100%)`,
          }}
        ></div>

        <figure
          className={`relative h-[28px] hidden tablet:block transition-opacity duration-300 ${
            index === selectedIndex ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={developerLogo || ""}
            alt={title || ""}
            width={84}
            height={28}
            className='object-cover size-full'
          />
        </figure>
        <p className='text-primary-foreground text-[10px] leading-[180%] font-[400] tracking-[0.6px]'>
          {index + 1}/{totalProjects}
        </p>
      </button>
    </AnimationReveal>
  );
};
