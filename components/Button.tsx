import React, { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} px-4 py-2 bg-blue-500 text-white text-sm font-medium tracking-wider rounded-md shadow`}
    />
  )
}
