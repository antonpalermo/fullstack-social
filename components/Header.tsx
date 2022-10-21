import React, { ReactNode } from 'react'

import Link from 'next/link'
import { Navbar, Brand } from '@components'

export type HeaderProps = {}

export function Header({}: HeaderProps) {
  const HContainer = ({ children }: { children: ReactNode }) => (
    <div className="w-full py-5 inline-flex items-center justify-between">
      {children}
    </div>
  )

  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container">
        <HContainer>
          <Brand />
          <Navbar />
        </HContainer>
      </div>
    </header>
  )
}
