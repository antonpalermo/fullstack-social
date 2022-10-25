import React from 'react'
import { UserMenu } from '@feat/user'

export type NavbarProps = {}

export function Navbar({}: NavbarProps) {
  return (
    <nav data-testid="nav" className="inline-flex items-center space-x-2">
      <UserMenu />
    </nav>
  )
}
