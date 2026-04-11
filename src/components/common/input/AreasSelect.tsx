"use client";
import { AREAS } from "@/data/areas-size";
import { AreaModel } from "@/interfaces";
import React from "react";

interface AreasSliderProps {
  selectedArea?: string;
  className?: string;
  areas?: AreaModel[];
  onChange?: (areaId: string) => void;
}

export const AreasSelect = ({
  selectedArea,
  className,
  areas,
  onChange,
}: AreasSliderProps) => {
  const selectArea = (areaId: string) => {
    // Si el área ya está seleccionada, deseleccionarla enviando string vacío
    if (selectedArea === areaId) {
      onChange?.("");
    } else {
      onChange?.(areaId);
    }
  };

  const isSelected = (areaId: string) => {
    return selectedArea === areaId;
  };

  return (
    <div className={`${className}`}>
      <div className='flex flex-row gap-2.5 flex-wrap'>
        {areas
          ? areas.map((area) => (
              <button
                key={area.id}
                onClick={() => selectArea(area.attributes.slug)}
                className={`cursor-pointer py-2.5 px-4 border-[1px] rounded-lg overflow-hidden transition-all duration-200 ${
                  isSelected(area.attributes.slug)
                    ? "bg-surface-container-background border-primary-stroke text-white"
                    : "bg-transparent border-secondary-stroke hover:bg-surface-container-background hover:border-secondary-stroke"
                }`}
              >
                <span
                  className={`text-[14px] leading-[180%] whitespace-nowrap ${
                    isSelected(area.attributes.slug)
                      ? "text-terciary-foreground"
                      : "text-terciary-foreground"
                  }`}
                >
                  {area.attributes.Area_name}
                </span>
              </button>
            ))
          : AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => selectArea(area.id)}
                className={`cursor-pointer py-2.5 px-4 border-[1px] rounded-lg overflow-hidden transition-all duration-200 ${
                  isSelected(area.id)
                    ? "bg-surface-container-background border-primary-stroke text-white"
                    : "bg-transparent border-secondary-stroke/80 hover:bg-surface-container-background/50 hover:border-secondary-stroke"
                }`}
              >
                <span
                  className={`text-[14px] leading-[180%] whitespace-nowrap ${
                    isSelected(area.id)
                      ? "text-terciary-foreground"
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
