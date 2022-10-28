import React, { HTMLAttributes } from 'react'

export type CardProps = HTMLAttributes<HTMLDivElement> & {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`${className} bg-white border border-gray-200 rounded p-3 shadow`}
      {...props}
    />
  )
}
