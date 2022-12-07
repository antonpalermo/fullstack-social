import { ReactNode, Fragment, ButtonHTMLAttributes } from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'

interface MenuProps {
  children: ReactNode
}

export function Menu({ children }: MenuProps) {
  return (
    <HeadlessMenu as="div" className="relative">
      {children}
    </HeadlessMenu>
  )
}

export function MenuItem({ children }: MenuProps) {
  return (
    <HeadlessMenu.Item>
      {({ active }) => <MenuSelect active={active}>{children}</MenuSelect>}
    </HeadlessMenu.Item>
  )
}

export function MenuItems({ children }: MenuProps) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <HeadlessMenu.Items className="bg-white w-56 absolute right-0 origin-top-right shadow-md rounded-md ">
        <div className="px-1 py-1">{children}</div>
      </HeadlessMenu.Items>
    </Transition>
  )
}

const menuSelectStyles = cva(
  'w-full text-sm text-left font-medium px-3 py-1 text-blue-500 hover:text-white',
  {
    variants: {
      active: {
        true: 'bg-blue-500 rounded-md hover:text-white'
      }
    }
  }
)

export interface MenuSelectProps
  extends VariantProps<typeof menuSelectStyles>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuSelect = ({
  active,
  className,
  ...props
}: MenuSelectProps) => (
  <button className={menuSelectStyles({ active, className })} {...props} />
)

export interface MenuButtonProps extends MenuSelectProps {}

export function MenuButton({ ...props }: MenuButtonProps) {
  return <HeadlessMenu.Button {...props} />
}
