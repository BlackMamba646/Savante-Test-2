import React from 'react'
import { LogoMobile } from '../icons/logo/logo-mobile'
import Link from 'next/link'
import { ROUTING } from '@/config/constant.config'
import { LogoTablet } from '../icons/logo/logo-tablet'
import { LogoDesktop } from '../icons/logo/logo-desktop'

interface LogoResizeProps {
  logoIsDark: boolean
}

export const LogoResize = ({ logoIsDark }: LogoResizeProps) => {
  return (
    <>
      <Link
        href={`${ROUTING.HOME}`}
        className='hidden tablet:hidden laptop:block relative'
      >
        <LogoDesktop isDark={logoIsDark} />
      </Link>
      <Link
        href={`${ROUTING.HOME}`}
        className='hidden tablet:block laptop:hidden'
      >
        <LogoTablet isDark={logoIsDark} />
      </Link>
      <Link
        href={`${ROUTING.HOME}`}
        className='block tablet:hidden laptop:hidden'
      >
        <LogoMobile isDark={logoIsDark} />
      </Link>
    </>
  )
}
