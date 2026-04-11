import { SearchAgents } from "../SearchAgents";

export const HeroOurTeam = () => {
  return (
    <section className='relative light'>
      <div
        className='relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center items-center h-full 
        pt-[112px] pb-[40px] tablet:pb-[40px] spacing-padding-x gap-[24px]'
      >
        <div className='flex flex-col gap-2.5 pt-12 tablet:pt-10 items-start tablet:items-center w-full tablet:w-auto'>
          <div className='w-[48px] h-[1px] bg-accent-solid animate-fade-in delay-100'></div>
          <div className='flex flex-col gap-1 animate-fade-in-up delay-300
            animate-distance-xs duration-300'>
            <h2 className='text-primary-foreground tracking-[-1.8px] text-start tablet:text-center'>
              The Savante Realty Team
            </h2>
          </div>
        </div>
        <SearchAgents />
      </div>
    </section>
  );
};
