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
        return 'w-[93px] w-[93px]'
      case 'md':
        return 'w-[58px] h-[58px]'
      case 'sm':
        return 'w-[36px] h-[36px]'
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
