import { HeroLeadMagnet } from '@/components/lead-magnet/sections/HeroLeadMagnet'
import { WhyThisGuide } from '@/components/lead-magnet/sections/WhyThisGuide'
import React from 'react'

export default function LeadMagnetPage() {
  return (
    <main className='relative bg-white'>
      <HeroLeadMagnet />
      <WhyThisGuide />
    </main>
  )
}
