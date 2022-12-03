import { useSession, signOut } from 'next-auth/react'

import Avatar from '@ui/Avatar'
import Button from '@ui/Button'
import { Menu, MenuButton, MenuItem, MenuItems } from '@ui/Menu'

export type NavbarProps = {}

export default function Navbar({}: NavbarProps) {
  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  return (
    <nav data-testid="nav" className="inline-flex items-center space-x-2">
      <Menu>
        <MenuButton>
          {loading && <Avatar src={data.user.image} size="sm" />}
        </MenuButton>
        <MenuItems>
          <MenuItem>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </nav>
  )
}
