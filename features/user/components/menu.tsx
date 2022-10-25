import React from 'react'

import { Avatar, Button } from '@components'
import { useSession, signOut } from 'next-auth/react'

export function UserMenu() {
  const { data, status } = useSession()
  const loading = status !== 'loading'

  const items = [
    {
      id: 'D8UXJI',
      name: 'Settings',
      items: [
        {
          id: 'WS9DX3',
          label: 'Account Settings'
        },
        { id: 'AX3BRW', label: 'Profile Settings' }
      ]
    }
  ]

  return (
    <>
      <Button onClick={() => signOut()}>Sign Out</Button>
      {loading && <Avatar src={data.user.image} size="sm" />}
    </>
  )
}
