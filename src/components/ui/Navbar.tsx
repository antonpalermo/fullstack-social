import { useSession, signOut } from 'next-auth/react'

import Image from 'next/image'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSelect } from '@ui/Menu'

export type NavbarProps = {}

export default function Navbar({}: NavbarProps) {
  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  return (
    <nav data-testid="nav" className="inline-flex items-center space-x-2">
      <Menu>
        <MenuButton className='rounded-full'>
          {loading && (
            <Image
              src={data.user.image}
              width={36}
              height={36}
              alt="user's avatar"
            />
          )}
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
