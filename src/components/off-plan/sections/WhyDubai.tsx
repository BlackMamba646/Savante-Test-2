import { WhyDubaiCard } from "@/components/common/card/WhyDubaiCard";
import { AnimationReveal } from "@/components/ui/animation-reveal";
import { whyDubaiData } from "@/data/why-dubai";
import Image from "next/image";

export const WhyDubai = () => {
  return (
    <section className='relative'>
      <div className='max-w-[1440px] mx-auto spacing-padding-x spacing-padding-y flex flex-col gap-8 items-center'>
        <AnimationReveal
          x={0}
          y={5}
          delay={0.2}
          duration={0.3}
          opacity={1}
          whileInView={true}
          type='h2'
          className='text-primary-foreground leading-[120%] tracking-[-1.8px] font-medium'
        >
          Why Dubai
        </AnimationReveal>
        <ul
          className='relative max-w-full tablet:max-w-[548px] laptop:max-w-[1215px] mx-auto flex flex-col space-y-0 laptop:-space-y-[13px] 
        w-full z-10 gap-3 laptop:gap-0'
        >
          {whyDubaiData.map((item, index) => {
            const even = index % 2 === 0;
            return (
              <WhyDubaiCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                direction={!even ? "left" : "right"}
                index={index}
              />
            );
          })}
          <AnimationReveal
            x={0}
            y={10}
            delay={1.4}
            duration={0.5}
            opacity={1}
            whileInView={true}
            type='figure'
            className='hidden laptop:block absolute left-1/2 -translate-x-1/2 z-[-1]'
          >
            <Image
              src='/images/off-plan/burj-khalifa.webp'
              alt='Burj Khalifa Tower'
              width={257}
              height={600}
              className='object-cover'
            />
          </AnimationReveal>
        </ul>
      </div>
    </section>
  );
};
