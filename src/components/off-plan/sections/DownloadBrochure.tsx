import { BrochureForm } from "@/components/off-plan/BrochureForm";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { shimmer, toBase64 } from "@/lib/image-placeholders";
import Image from "next/image";

interface DownloadBrochureProps {
  projectId?: string;
  brochureUrl?: string;
}

export const DownloadBrochure = ({
  projectId,
  brochureUrl,
}: DownloadBrochureProps) => {
  return (
    <section id="brochure" className="relative overflow-hidden pt-16">
      <div className="overflow-hidden flex flex-col laptop:flex-row gap-[34px]">
        <div className="flex laptop:hidden flex-col items-start tablet:items-center gap-2">
          <div className="w-[26px] h-[1px] bg-accent-foreground"></div>
          <AnimationReveal
            x={-10}
            y={0}
            delay={0.2}
            duration={0.3}
            type="h4"
            opacity={1}
            className="text-primary-foreground font-medium leading-[120%]"
          >
            Download brochure
          </AnimationReveal>
        </div>
        <AnimationReveal
          x={0}
          y={0}
          delay={0.2}
          duration={0.3}
          opacity={1}
          className="flex-1 flex relative h-full max-h-[240px] tablet:max-h-[300px] max-w-[600px] mx-auto 
          laptop:max-w-full rounded-xl overflow-hidden"
        >
          <Image
            src="/images/off-plan/brochure-image.webp"
            alt="Brochure Image"
            width={580}
            height={300}
            className="object-cover w-full max-h-full"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1014, 580)
            )}`}
          />
        </AnimationReveal>
        <BrochureForm projectId={projectId} brochureUrl={brochureUrl} />
      </div>
    </section>
  );
};
