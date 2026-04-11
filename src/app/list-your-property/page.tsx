import { OurServices } from '@/components/common/sections/OurServices';
import { Reviews } from '@/components/common/sections/Reviews';
import { WhyChooseUs } from '@/components/common/sections/WhyChooseUs'
import { HeroListYourProperty } from '@/components/list-your-property/sections/HeroListYourProperty'
import { APIService } from '@/services/api.service';
import { listYourPropertyQuery, reviewListingQuery, serviceListingQuery } from '@/utils/query-request.util';
import React from 'react'

export default async function ListYourPropertyPage() {

  const page = await APIService.findListYourPropertyPage(listYourPropertyQuery);

  const services = await APIService.findServices({
    ...serviceListingQuery,
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });

  const reviews = await APIService.findTestimonies({
    ...reviewListingQuery,
    pagination: { pageSize: 20 },
    sort: ["createdAt:desc"],
  });
  
  return (
    <main className="bg-white relative">
      <HeroListYourProperty />
      <WhyChooseUs page={page?.Why_us} theme="dark" />
      <Reviews reviews={reviews} />
      <OurServices services={services} />
    </main>
  )
}
