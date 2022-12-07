import { useSession, signOut } from 'next-auth/react'

import Avatar from '@ui/Avatar'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSelect } from '@ui/Menu'

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
            <MenuSelect onClick={() => signOut()}>Sign Out</MenuSelect>
          </MenuItem>
        </MenuItems>
      </Menu>
    </nav>
  )
}
