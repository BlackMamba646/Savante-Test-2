"use client";

import { useState } from "react";
import { PropertyMortgageModal } from "@/components/common/modal/PropertyMortgageModal";
import { AdditionalInformation } from "../Aditionalinformation";
import { ContactModel } from "@/interfaces/contact-info.interface";
import { PropertyModal } from "@/components/common/modal/PropertyModal";

interface PropertyDetailClientProps {
  title: string;
  description: string;
  address: string;
  operationType: string;
  operation: string;
  features: string[];
  amenities: string[];
  thumbnail: string;
  slug: string;
  propertyId?: number | string;
  contactInfo: ContactModel;
}

export const PropertyInformation = ({
  title,
  description,
  address,
  features,
  amenities,
  thumbnail,
  operationType,
  operation,
  slug,
  propertyId,
  contactInfo,
}: PropertyDetailClientProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AdditionalInformation
        title={title}
        operation={operation}
        operationType={operationType}
        thumbnail={thumbnail}
        description={description}
        address={address}
        features={features}
        amenities={amenities}
        slug={slug}
        onPress={() => setIsOpen(true)}
        contactInfo={contactInfo}
      />
      <PropertyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        propertyName={title}
        message={`Property Information Request for ${title} property`}
      />
    </>
  );
};
