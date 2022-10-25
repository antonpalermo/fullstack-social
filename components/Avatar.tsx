import React from 'react'
import Image from 'next/image'

export type AvatarProps = {
  src: string
  size: 'sm' | 'md' | 'lx'
}

export function Avatar({ src, size }: AvatarProps) {
  const resolveSize = (size: 'sm' | 'md' | 'lx'): string => {
    switch (size) {
      case 'lx':
        return 'min-w-[93px] min-h-[93px]'
      case 'md':
        return 'min-w-[58px] min-h-[58px]'
      case 'sm':
        return 'min-w-[36px] min-h-[36px]'
    }
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden ${resolveSize(size)}`}
    >
      <Image src={src} layout="fill" alt="User's avatar" />
    </div>
  )
}
