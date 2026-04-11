export const InstagramInfoSkeleton = () => {
  return (
    <section
      className='bg-surface-container-background laptop:bg-transparent relative flex flex-col laptop:flex-row 
    justify-center spacing-padding-x tablet:px-0 spacing-padding-y laptop:py-5 spacing-gap laptop:gap-0'
    >
      <article
        className='flex flex-row laptop:flex-col justify-center self-center laptop:self-stretch 
        gap-4 tablet:spacing-gap laptop:gap-2.5 p-0 laptop:p-10 max-w-[624px] laptop:max-w-[500px] w-full 
        laptop:bg-surface-container-background bg-transparent'
      >
        <div className='flex laptop:flex-row gap-5'>
          {/* Profile picture skeleton */}
          <div className='w-[100px] h-[100px] rounded-full bg-gray-200 animate-pulse' />
          <div className='self-end hidden laptop:flex flex-col pb-5 gap-2'>
            <div className='h-5 w-32 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
        <div className='flex-1 laptop:flex-none flex flex-col items-start gap-2 tablet:gap-3 self-center tablet:self-start'>
          <div className='flex laptop:hidden flex-col-reverse gap-2'>
            <div className='h-5 w-32 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
          </div>
          <ul className='flex flex-wrap tablet:flex-nowrap flex-row pt-0 laptop:pt-2 px-0 laptop:px-2 pb-2 
          laptop:pb-[40px] gap-4 tablet:gap-[26px]'>
            {/* Stats skeleton */}
            {[1, 2, 3].map((i) => (
              <li key={i} className='flex flex-col gap-1'>
                <div className='h-4 w-12 bg-gray-200 rounded animate-pulse' />
                <div className='h-3 w-16 bg-gray-200 rounded animate-pulse' />
              </li>
            ))}
          </ul>
          {/* Button skeleton */}
          <div className='h-12 w-32 bg-gray-200 rounded-full animate-pulse hidden tablet:block' />
        </div>
      </article>
      
      {/* Posts Grid skeleton */}
      <ul className='grid grid-cols-2 w-full tablet:w-auto tablet:grid-cols-4 self-center laptop:self-auto 
      grid-rows-2 gap-2'>
        {Array.from({ length: 8 }).map((_, index) => (
          <li 
            key={index} 
            className={`relative w-full tablet:w-[150px] h-[228px] bg-gray-200 rounded-lg animate-pulse ${
              index >= 4 ? 'hidden tablet:block' : ''
            }`}
          />
        ))}
      </ul>
      
      {/* Mobile button skeleton */}
      <div className='h-12 w-full bg-gray-200 rounded-full animate-pulse flex tablet:hidden' />
    </section>
  );
};