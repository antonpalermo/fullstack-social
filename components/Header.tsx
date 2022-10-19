import React, { ReactNode } from 'react'

import Link from 'next/link'
import { Navbar } from '@components'

export type HeaderProps = {}

export function Header({}: HeaderProps) {
  const HomeLink = () => (
    <Link href={{ pathname: '/' }} passHref>
      <a className="font-semibold hover:text-blue-500">Fullstack Social</a>
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
