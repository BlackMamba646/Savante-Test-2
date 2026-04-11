import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { Close } from "../shared/icons/close";
import { FadersHorizontal } from "../shared/icons/faders-horizontal";
import { DropdownMinimal } from "../common/input/DropdownMinimal";
import {
  COMPLETION_STATUS_OPTIONS,
  DEVELOPERS_BY_AREA_OPTIONS,
  SORT_DEVELOPER_OPTIONS,
} from "@/config/constant.config";
import { useRouter } from "@bprogress/next";
import { useSearchParams } from "next/navigation";
import { DevelopersFilters } from "@/types/filters";
import { TextButton } from "../common/button/TextButton";

interface FilterDevelopersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDevelopersModal = ({
  isOpen,
  onClose,
}: FilterDevelopersModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<DevelopersFilters>({
    sort: searchParams.get("sort") || undefined,
    developersByArea: searchParams.get("developers-by-area") || undefined,
    completionStatus: searchParams.get("completion-status") || undefined,
  });

  const handleChangeSortBy = (value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      sort: String(value),
    }));
  };

  const handleChangeDevelopersByArea = (value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      developersByArea: String(value),
    }));
  };

  const handleChangeCompletionStatus = (value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      completionStatus: String(value),
    }));
  };

  const handleUpdateSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.developersByArea) params.set("developers-by-area", filters.developersByArea);
    if (filters.completionStatus) params.set("completion-status", filters.completionStatus);

    router.push(`/developers?${params.toString()}`);
    onClose();
  };

  /* console.log(filters); */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-9999 py-16 tablet:py-20 px-5 tablet:px-10 laptop:px-16 light"
          style={{
            background:
              "var(--color-gray-color-stops-60, rgba(12, 12, 12, 0.60))",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col pb-[34px] pt-[34px] tablet:pt-10 tablet:pb-10 spacing-padding-x max-h-full overflow-y-auto
            tablet:px-10 bg-white w-full max-w-[900px] gap-[26px] tablet:gap-10 laptop:gap-16 rounded-2xl"
          >
            <div className="flex flex-row justify-between w-full items-center">
              <h4 className="leading-[140%] tracking-[-0.72px] text-primary-foreground">
                More Filters
              </h4>
              <button
                onClick={onClose}
                className="cursor-pointer bg-[#F6F6F6] backdrop-blur-sm self-start
                            rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <figure className="fill-accent-foreground">
                  <Close size={16} />
                </figure>
              </button>
            </div>
            <form className="flex flex-col gap-6 w-full">
              <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-5">
                <div className="flex flex-col gap-1 flex-none tablet:flex-1">
                  <label
                    htmlFor="sort-by"
                    className="text-secondary-foreground text-[15px]"
                  >
                    Sort by
                  </label>
                  <DropdownMinimal
                    key={`sort-by-${searchParams.get("sort") || "default"}`}
                    placeholder={
                      SORT_DEVELOPER_OPTIONS.find(
                        (option) => option.value === searchParams.get("sort")
                      )?.text ?? "Sort by"
                    }
                    items={SORT_DEVELOPER_OPTIONS}
                    defaultSelectedKey={searchParams.get("sort-by") || ""}
                    onSelectionChange={handleChangeSortBy}
                    className="*:text-terciary-foreground px-1! border-b-[1px] border-[#0C0C0C33] rounded-none! h-[44px]!"
                    spanWidth="w-full"
                    iconSize={10}
                    width="w-full"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-none tablet:flex-1">
                  <label
                    htmlFor="sort-by"
                    className="text-secondary-foreground text-[15px]"
                  >
                    Area
                  </label>
                  <DropdownMinimal
                    key={`developers-by-area-${
                      searchParams.get("developers-by-area") || "default"
                    }`}
                    placeholder={
                      DEVELOPERS_BY_AREA_OPTIONS.find(
                        (option) =>
                          option.value ===
                          searchParams.get("developers-by-area")
                      )?.text ?? "Select areas"
                    }
                    items={DEVELOPERS_BY_AREA_OPTIONS}
                    defaultSelectedKey={
                      searchParams.get("developers-by-area") || ""
                    }
                    onSelectionChange={handleChangeDevelopersByArea}
                    className="*:text-terciary-foreground px-1! border-b-[1px] border-[#0C0C0C33] rounded-none! h-[44px]!"
                    spanWidth="w-full"
                    iconSize={10}
                    width="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1 flex-none tablet:flex-1">
                  <label
                    htmlFor="sort-by"
                    className="text-secondary-foreground text-[15px]"
                  >
                    Completion Status
                  </label>
                  <DropdownMinimal
                    key={`completion-status-${
                      searchParams.get("completion-status") || "default"
                    }`}
                    placeholder={
                      COMPLETION_STATUS_OPTIONS.find(
                        (option) =>
                          option.value === searchParams.get("completion-status")
                      )?.text ?? "Ready to Move"
                    }
                    items={COMPLETION_STATUS_OPTIONS}
                    defaultSelectedKey={
                      searchParams.get("completion-status") || ""
                    }
                    onSelectionChange={handleChangeCompletionStatus}
                    className="*:text-terciary-foreground px-1! border-b-[1px] border-[#0C0C0C33] rounded-none! h-[44px]!"
                    spanWidth="w-full"
                    iconSize={10}
                    width="w-full"
                  />
                </div>
              </div>
            </form>
            <TextButton
              type="submit"
              text={"Update Search"}
              state={"default"}
              customClassName="btn-primary-fill-variant self-end justify-center rounded-full
              laptop:justify-auto w-full laptop:w-auto py-3! px-6!"
              textClassName="uppercase font-plus leading-[140%] text-[12px] tracking-[0.96px]"
              showLeftIcon={true}
              leftIcon={FadersHorizontal}
              animateIcon={false}
              iconSize={18}
              onClick={handleUpdateSearch}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};