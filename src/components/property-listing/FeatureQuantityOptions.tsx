import React from "react";

interface FeatureQuantityOptionsProps {
  icon: React.ReactNode;
  label: string;
  options: (string | number)[];
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export const FeatureQuantityOptions = ({
  icon,
  label,
  options,
  value,
  onChange,
}: FeatureQuantityOptionsProps) => {
  return (
    <div className='flex flex-col gap-2.5 flex-1'>
      <div className='flex flex-row gap-2.5 items-center'>
        <figure className='text-accent'>{icon}</figure>
        <p className='w-full leading-[180%] text-[15px] text-secondary-foreground'>
          {label}
        </p>
      </div>
      <div className='flex flex-row gap-1'>
        {options.map((option) => {
          // Si el valor es undefined/null y la opción es "Any", marcarlo como seleccionado
          const isSelected =
            value === option || (value === undefined && option === "Any");

          return (
            <button
              key={option}
              onClick={() => onChange?.(option)}
              className={`cursor-pointer outline-1 outline-secondary-stroke px-4 py-2.5 rounded-md text-[14px] leading-[180%] 
                transition-colors duration-150 ${
                  isSelected
                    ? "outline-primary-stroke! bg-surface-container-background text-accent"
                    : "border-secondary-stroke bg-transparent text-terciary-foreground hover:bg-surface-container-background"
                }`}
            >
              {option === 5 && typeof option === "number" ? "+5" : option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
