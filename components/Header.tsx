import React, { ReactNode } from 'react'

import Link from 'next/link'
import { Navbar } from '@components'

export type HeaderProps = {}

export function Header({}: HeaderProps) {
  const HomeLink = () => (
    <Link href={{ pathname: '/' }} passHref>
      <a className="space-x-1 font-semibold tracking-wide bg-black text-white px-4 py-2 rounded-md text-sm select-none">
        _stack
      </a>
    </Link>
  )

  const HContainer = ({ children }: { children: ReactNode }) => (
    <div className="w-full py-5 inline-flex items-center justify-between">
      {children}
    </div>
  )

  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container">
        <HContainer>
          <HomeLink />
          <Navbar />
        </HContainer>
      </div>
    </header>
  )
}
