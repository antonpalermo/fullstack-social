import React from 'react'
import { Button } from '@components'

export type NavbarProps = {}

export function Navbar({}: NavbarProps) {
  return (
    <nav data-testid="nav">
      <Button>Sign In</Button>
    </nav>
  )
}
