import React, { ButtonHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {}

const buttonStyles = cva('font-medium rounded-md tracking-wider', {
  variants: {
    variant: {
      primary: 'text-white bg-blue-500 hover:bg-blue-600'
    },
    size: {
      base: 'px-4 py-2 text-sm'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'base'
  }
})

export interface Props
  extends VariantProps<typeof buttonStyles>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ variant, size, className, ...props }: Props) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props} />
  )
}
