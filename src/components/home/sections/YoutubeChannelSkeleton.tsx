export const YoutubeChannelSkeleton = () => {
  return (
    <section className='relative overflow-hidden bg-surface-container-background'>
      <div
        className='relative max-w-[1440px] mx-auto spacing-padding-y spacing-padding-x laptop:px-[64px] 
        flex flex-col gap-10'
      >
        {/* Featured video skeleton */}
        <div
          className='relative self-center aspect-video outline-[2px] tablet:outline-[4px] 
          laptop:outline-[6px] outline-surface-background 
          rounded-xl tablet:rounded-2xl laptop:rounded-3xl overflow-hidden video-card-border w-full max-w-[1104px]
          bg-gray-200 animate-pulse'
        />
        
        {/* Header and button skeleton */}
        <div className='flex flex-col gap-[26px] items-center'>
          <div className='flex flex-col gap-1 items-center'>
            <div className='h-4 w-48 bg-gray-200 rounded animate-pulse' />
            <div className='h-8 w-96 bg-gray-200 rounded animate-pulse mt-2' />
          </div>
          <div className='h-12 w-48 bg-gray-200 rounded-full animate-pulse' />
        </div>

        {/* Video cards skeleton */}
        <ul className='flex flex-row gap-3 w-full overflow-hidden'>
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className='flex-1 rounded-xl tablet:rounded-2xl laptop:rounded-3xl border-[0px]
              tablet:border-[4px] laptop:border-[6px] border-surface-background
              overflow-hidden shadow-xl aspect-video bg-gray-200 animate-pulse'
            />
          ))}
        </ul>
      </div>
    </section>
  );
};