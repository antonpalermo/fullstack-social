import React, { ReactNode } from 'react'

import Brand from '@ui/Brand'
import Navbar from '@ui/Navbar'

export type HeaderProps = {}

const HContainer = ({ children }: { children: ReactNode }) => (
  <div className="w-full py-5 inline-flex items-center justify-between">
    {children}
  </div>
)

export default function Header({}: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="container">
        <HContainer>
          <Brand />
          <Navbar />
        </HContainer>
      </div>
    </header>
  )
}
