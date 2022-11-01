import { useSession } from 'next-auth/react'
import React from 'react'
import { Avatar } from './Avatar'

export type NavbarProps = {}

export function Navbar({}: NavbarProps) {
  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  return (
    <nav data-testid="nav" className="inline-flex items-center space-x-2">
      {loading && <Avatar src={data.user.image} size="sm" />}
    </nav>
  )
}
