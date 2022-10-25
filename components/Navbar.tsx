import React from 'react'

import { Avatar } from '@components'
import { useSession } from 'next-auth/react'

export type NavbarProps = {}

export function Navbar({}: NavbarProps) {
  const { data, status } = useSession()

  return (
    <nav data-testid="nav">
      {status !== 'loading' && <Avatar src={data.user.image} size="sm" />}
    </nav>
  )
}
