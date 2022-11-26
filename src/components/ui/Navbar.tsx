import { useSession, signOut } from 'next-auth/react'

import Avatar from '@ui/Avatar'

export type NavbarProps = {}

export default function Navbar({}: NavbarProps) {
  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  return (
    <nav data-testid="nav" className="inline-flex items-center space-x-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded text-sm font-medium"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      {loading && <Avatar src={data.user.image} size="sm" />}
    </nav>
  )
}
