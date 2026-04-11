import { Buildings } from "@/components/shared/icons/buildings";
import { MapPinArea } from "@/components/shared/icons/map-pin-area";
import { FloorPlan } from "@/interfaces";

interface SummaryProps {
  title?: string;
  address?: string;
  floorPlans?: FloorPlan[];
  downPayment?: number;
  handover?: string;
  constructionPercentage?: number;
  onHandoverPercentage?: number;
  developerName?: string;
}

export const Summary = ({
  title,
  address,
  floorPlans,
  downPayment,
  handover,
  constructionPercentage,
  onHandoverPercentage,
  developerName,
}: SummaryProps) => {
  return (
    <section className='relative overflow-hidden'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <p
            className='text-primary-foreground quote-text leading-[140%] 
          font-semibold tracking-[-0.4px]'
          >
            {title} Summary
          </p>
          <div className='flex fle-row gap-2.5 items-center'>
            <div className='hidden laptop:flex flex-row gap-1.5 items-center'>
              <figure className='text-terciary-foreground'>
                <Buildings size={16} />
              </figure>
              <p className='text-terciary-foreground text-[14px] font-medium leading-[160%] line-clamp-1'>
                By
                <span className='text-accent-foreground font-medium pl-1'>
                  {developerName}
                </span>
              </p>
            </div>
            <div className='hidden laptop:block h-[18px] w-[1px] bg-primary-stroke'></div>
            <div className='flex flex-row gap-1.5 items-center'>
              <figure className='text-terciary-foreground'>
                <MapPinArea size={16} />
              </figure>
              <p className='text-terciary-foreground text-[14px] font-medium leading-[160%] line-clamp-1'>
                {address}
              </p>
            </div>
          </div>
        </div>
        <div className='w-full overflow-x-auto rounded-xl laptop:rounded-t-3xl overflow-hidden'>
          <table className='w-full border-collapse table-fixed'>
            <tbody>
              {floorPlans && floorPlans.length > 0 ? (
                <>
                  {floorPlans.map((plan, index) => (
                    <tr
                      key={plan.id || index}
                      className='border-[0px] tablet:border-[1px] border-secondary-stroke tablet:not-even:bg-surface-container-background
                      tablet:table-row flex flex-col mb-4 laptop:mb-0'
                    >
                      <td className='p-0 tablet:p-1 text-primary-foreground body-large font-medium block tablet:table-cell'>
                        <span
                          className='text-primary-foreground text-[15px] leading-[180%] font-medium 
                          py-0 px-0 tablet:py-1 tablet:px-2'
                        >
                          {plan.Type || "N/A"}
                        </span>
                      </td>
                      <td className='p-0 tablet:p-1 block tablet:table-cell'>
                        <div
                          className='flex flex-row gap-1 items-center justify-between py-0 px-0 tablet:py-1 tablet:px-2 
                        border-l-0 tablet:border-l border-primary-stroke'
                        >
                          <span
                            className='text-terciary-foreground font-montserrat text-[12px] 
                          leading-[180%]'
                          >
                            Size
                          </span>
                          <span className='text-accent-foreground text-[12px] leading-[180%] font-medium'>
                            {plan.Size ? `${plan.Size}` : "N/A"}{" "}
                            <span className='text-terciary-foreground font-montserrat'>
                              sq. ft.
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className='p-0 tablet:p-1 block tablet:table-cell'>
                        <div
                          className='flex flex-row gap-1 items-center justify-between py-0 px-0 tablet:py-1 tablet:px-2 
                        border-l-0 tablet:border-l border-primary-stroke'
                        >
                          <span
                            className='text-terciary-foreground font-montserrat text-[12px] 
                          leading-[180%]'
                          >
                            Starting Price
                          </span>
                          <span className='text-accent-foreground text-[12px] leading-[180%] font-medium'>
                            {plan.Starting_price || "N/A"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className='bg-surface-background dark laptop:hidden'>
                    <td className='p-1 block tablet:table-cell'>
                      <div className='flex flex-row gap-1 items-center justify-between py-0 tablet:py-1 px-2'>
                        <span
                          className='text-primary-foreground text-[12px] leading-[180%] 
                        font-medium font-montserrat'
                        >
                          Down Payment
                        </span>
                        <span
                          className='text-primary-foreground big-lowercase tablet:text-[12px] leading-[180%] font-medium 
                          tracking-[-0.24px] uppercase'
                        >
                          {downPayment ? `${downPayment}%` : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className='p-1 block tablet:table-cell'>
                      <div className='flex flex-row gap-1 items-center justify-between py-0 tablet:py-1 px-2'>
                        <span className='text-primary-foreground text-[12px] leading-[180%] font-medium font-montserrat'>
                          Payment Plan
                        </span>
                        <span
                          className='text-primary-foreground big-lowercase tablet:text-[12px] leading-[180%] font-medium 
                        tracking-[-0.24px] uppercase'
                        >
                          {downPayment &&
                          constructionPercentage &&
                          onHandoverPercentage
                            ? `${
                                downPayment + constructionPercentage
                              }/${onHandoverPercentage}`
                            : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className='p-1 block tablet:table-cell'>
                      <div className='flex flex-row gap-1 items-center justify-between py-0 tablet:py-1 px-2'>
                        <span className='text-primary-foreground text-[12px] leading-[180%] font-medium font-montserrat'>
                          Handover
                        </span>
                        <span
                          className='text-primary-foreground big-lowercase tablet:text-[12px] leading-[180%] font-medium 
                        tracking-[-0.24px] uppercase'
                        >
                          {handover ? `${handover}` : "N/A"}
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className='py-8 px-4 text-center text-secondary-foreground'
                  >
                    No floor plans available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <ul
            className='bg-surface-container-background dark hidden py-2.5 px-5 laptop:flex 
          flex-row rounded-b-3xl justify-center gap-[34px]'
          >
            <li className='flex flex-row gap-2 items-center'>
              <p className='text-terciary-foreground text-[12px] leading-[200%] translate-y-[1px]'>
                Down Payment
              </p>
              <span className='text-accent-foreground text-[18px] leading-[160%] font-medium'>
                {downPayment ? `${downPayment}%` : "N/A"}
              </span>
            </li>
            <li className='flex flex-row gap-2 items-center'>
              <p className='text-terciary-foreground text-[12px] leading-[200%] translate-y-[1px]'>
                Payment Plan
              </p>
              <span className='text-accent-foreground text-[18px] leading-[160%] font-medium'>
                {downPayment && constructionPercentage && onHandoverPercentage
                  ? `${
                      downPayment + constructionPercentage
                    }/${onHandoverPercentage}`
                  : "N/A"}
              </span>
            </li>
            <li className='flex flex-row gap-2 items-center'>
              <p className='text-terciary-foreground text-[12px] leading-[200%] translate-y-[1px]'>
                Handover
              </p>
              <span className='text-accent-foreground text-[18px] leading-[160%] font-medium'>
                {handover ? `${handover}` : "N/A"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
