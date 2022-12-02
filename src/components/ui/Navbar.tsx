import { useSession, signOut } from 'next-auth/react'

import Avatar from '@ui/Avatar'
import Button from '@ui/Button'

export type NavbarProps = {}

export default function Navbar({}: NavbarProps) {
  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  return (
    <nav data-testid="nav" className="inline-flex items-center space-x-2">
      <Button onClick={() => signOut()}>Sign Out</Button>
      {loading && <Avatar src={data.user.image} size="sm" />}
    </nav>
  )
}
