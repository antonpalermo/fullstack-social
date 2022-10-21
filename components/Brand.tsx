import Link from 'next/link'
import React from 'react'

export type BrandProps = {}

export function Brand({}: BrandProps) {
  return (
    <Link href={{ pathname: '/' }} passHref>
      <a className="text-sm font-semibold select-none px-4 py-2 bg-black text-white rounded-md tracking-wider">
        _stack
      </a>
    </Link>
  )
}
