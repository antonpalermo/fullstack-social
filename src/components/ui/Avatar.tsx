import React, { ImgHTMLAttributes } from 'react'

import Image from 'next/image'
import { cva, VariantProps } from 'class-variance-authority'

const avatarStyles = cva('relative overflow-hidden', {
  variants: {
    size: {
      sm: 'w-[36px] h-[36px]',
      md: 'w-[58px] h-[58px]',
      lg: 'w-[93px] h-[93px]'
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      full: 'rounded-full'
    }
  },
  defaultVariants: {
    size: 'sm',
    rounded: 'full'
  }
})

export interface Props
  extends VariantProps<typeof avatarStyles>,
    ImgHTMLAttributes<HTMLImageElement> {}

export default function Avatar({
  src,
  size,
  rounded,
  className,
  ...props
}: Props) {
  return (
    <div className={avatarStyles({ className, size, rounded })} {...props}>
      <Image src={src} layout="fill" alt="user's avatar" />
    </div>
  )
}
