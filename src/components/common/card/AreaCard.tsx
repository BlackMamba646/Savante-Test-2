import { ArrowUpRight } from "@/components/shared/icons/arrow-up-right";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/common/button/IconButton";
import { ROUTING } from "@/config/constant.config";
import { formatFeatures } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TextButton } from "../button/TextButton";
import { shimmer, toBase64 } from "@/utils/image-loader";


interface AreaCardProps {
  title: string;
  image: string;
  price: string;
  slug: string;
}

export const AreaCard = (props: AreaCardProps) => {
  const { title, image, price, slug } = props;

  return (
    <Link href={slug} className="relative cursor-pointer group" aria-label="View area details">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[24px] font-didot text-primary-foreground leading-[120%] line-clamp-1">
            {title}
          </h2>
          <p className="text-[14px] text-terciary-foreground line-clamp-1 leading-[180%]">
            Price from
            <span className="text-accent-foreground font-bold ml-2 text-[16px] uppercase leading-[20px]">
              {price &&
              Number(price) !== 0 &&
              price !== "" &&
              price !== null ? (
                `${formatFeatures.formatCurrency(Number(price))} AED`
              ) : (
                <span className="normal-case">No available</span>
              )}
            </span>{" "}
          </p>
        </div>
        <figure className="relative overflow-hidden">
          <Image
            src={image}
            alt="Property image"
            height={200}
            width={430}
            className="object-cover h-[200px] w-full"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1014, 580)
            )}`}
          />
          <div
            className="absolute bottom-4 right-4 cursor-pointer"
          >
            <IconButton
              big={true}
              icon={ArrowUpRight}
              iconSize={10}
              customClassName="btn-icon-dark-variant px-5"
              animateIcon={true}
              iconAnimation={"scale"}
              onClick={() => {}}
            />
          </div>
        </figure>
        <div className="w-max">
          <TextButton
            text={"All Properties"}
            textClassName="leading-[95%]"
            state={"default"}
            customClassName="btn-secondary-variant"
            showRightIcon={true}
            rightIcon={ArrowUpRight}
            animateIcon={true}
            iconAnimation={"rotate"}
            onClick={() => {}}
          />
        </div>
      </div>
    </Link>
  );
};
