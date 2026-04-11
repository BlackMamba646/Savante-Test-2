import { MapPinArea } from "@/components/shared/icons/map-pin-area";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { NearbyPlaces } from "@/interfaces";

interface LocationProps {
  location?: string;
  description?: string;
  nearbyPlaces?: NearbyPlaces;
}

export const Location = ({
  location,
  description,
  nearbyPlaces,
}: LocationProps) => {
  /* console.log(nearbyPlaces); */

  return (
    <section id="location" className="relative pt-16">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[24px]">
          <div className="w-[26px] h-[1px] bg-accent-foreground"></div>
          <div className="flex flex-col gap-0">
            <AnimationReveal
              x={-10}
              y={0}
              delay={0.2}
              duration={0.3}
              opacity={1}
              type="h3"
              className="text-primary-foreground tracking-[-1.6px] leading-[140%] line-clamp-2
                font-medium"
            >
              Location Map & Overview of Downtown Dubai
            </AnimationReveal>
            <AnimationReveal
              x={-10}
              y={0}
              delay={0.4}
              duration={0.3}
              opacity={1}
              className="flex flex-row gap-1.5 items-center"
            >
              <figure className="text-terciary-foreground translate-y-[1px]">
                <MapPinArea size={18} />
              </figure>
              <p
                className="text-accent-solid font-montserrat 
                leading-[180%] line-clamp-1 text-[15px]"
              >
                {location}
              </p>
            </AnimationReveal>
          </div>
        </div>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.5}
          duration={0.5}
          opacity={1}
          type="iframe"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            location || ""
          )}&output=embed`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[220px] tablet:h-[300px] border-none"
        />
        {nearbyPlaces && (
          <div className="flex flex-col gap-2.5">
            <p
              className="text-primary-foreground text-[12px] leading-[180%] uppercase 
            tracking-[0.96px] font-medium"
            >
              Nearby Places
            </p>
            <ul className="flex flex-row gap-5 flex-wrap">
              {nearbyPlaces?.Place.map((place, index) => (
                <AnimationReveal
                  x={0}
                  y={0}
                  delay={0.2 + index * 0.1}
                  duration={0.5}
                  opacity={1}
                  type="li"
                  className="flex flex-col gap-1"
                  key={place.id}
                >
                  <span className="text-accent-solid text-[14px] leading-[120%] font-medium">
                    {place.Place_name}
                  </span>
                  <p className="text-terciary-foreground text-[12.5px] leading-[200%]">
                    {place.Place_distance}
                  </p>
                </AnimationReveal>
              ))}
            </ul>
          </div>
        )}
        <AnimationReveal
          x={0}
          y={0}
          delay={0.5}
          duration={0.5}
          opacity={1}
          type="p"
          className="text-secondary leading-[180%] text-[14px] tablet:text-[15px]"
        >
          {description}
        </AnimationReveal>
      </div>
    </section>
  );
};
