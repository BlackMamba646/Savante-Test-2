"use client";
import { AREAS } from "@/data/areas-size";
import { AreaModel } from "@/interfaces";
import { useRouter } from "@bprogress/next/app";
import { useSearchParams } from "next/navigation";

interface AreasSliderProps {
  selectedArea?: string;
  className?: string;
  areas?: AreaModel[];
}

export const AreasSlider = ({
  selectedArea,
  className,
  areas,
}: AreasSliderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectArea = (areaId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchParams.get("area") === areaId) {
      params.delete("area");
    } else {
      params.set("area", areaId);
    }

    params.set("page", "1");
    params.delete("q");
    router.push(`${location.pathname}?${params.toString()}`);
  };

  const isSelected = (areaId: string) => {
    const urlArea = searchParams.get("area");
    return selectedArea === areaId || urlArea === areaId;
  };

  return (
    <div className={`${className}`}>
      <div className="flex flex-row gap-2.5 flex-wrap">
        {areas
          ? areas.map((area, index) => (
              <button
                key={area.id}
                className={`animate-fadeInUp-hidden duration-normal delay-${
                  index * 100
                }`}
                onClick={() => selectArea(area.attributes.slug)}
              >
                <div
                  className={`cursor-pointer py-2.5 px-4 border-[1px] rounded-lg overflow-hidden
                  transition-all duration-200
                  } ${
                    isSelected(area.attributes.slug)
                      ? "bg-surface-container-background border-primary-stroke text-white"
                      : "bg-transparent border-secondary-stroke/80 hover:bg-surface-container-background/50 hover:border-secondary-stroke"
                  }`}
                >
                  <span
                    className={`text-[14px] leading-[180%] line-clamp-1 ${
                      isSelected(area.attributes.slug)
                        ? "text-terciary-foreground font-medium"
                        : "text-terciary-foreground"
                    }`}
                  >
                    {area.attributes.Area_name}
                  </span>
                </div>
              </button>
            ))
          : AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => selectArea(area.id)}
                className={`cursor-pointer py-2.5 px-4 border-[1px] rounded-lg overflow-hidden transition-all duration-200 ${
                  isSelected(area.id)
                    ? "bg-surface-container-background border-primary-stroke/20 text-white"
                    : "bg-transparent border-secondary-stroke/80 hover:bg-surface-container-background/50 hover:border-secondary-stroke"
                }`}
              >
                <span
                  className={`text-[14px] leading-[180%] whitespace-nowrap ${
                    isSelected(area.id)
                      ? "text-terciary-foreground font-medium"
                      : "text-terciary-foreground"
                  }`}
                >
                  {area.name}
                </span>
              </button>
            ))}
      </div>
    </div>
  );
};
