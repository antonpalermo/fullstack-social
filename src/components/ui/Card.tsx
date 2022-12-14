import { cva, VariantProps } from 'class-variance-authority'
import React, { HTMLAttributes } from 'react'

const cardStyles = cva('bg-white rounded-md shadow', { variants: {} })

export interface CardProps
  extends VariantProps<typeof cardStyles>,
    HTMLAttributes<HTMLDivElement> {}

export function CardRoot({ className, ...props }: CardProps) {
  return <div className={cardStyles()} {...props} />
}

const headerStyles = cva(
  'px-10 py-2 border-b border-opacity-50 border-slate-300',
  {
    variants: {}
  }
)

export interface HeaderProps
  extends VariantProps<typeof headerStyles>,
    HTMLAttributes<HTMLDivElement> {}

function Header({ ...props }: HeaderProps) {
  return <div className={headerStyles()} {...props} />
}

const contentStyles = cva('px-10', { variants: {} })

export interface ContentProps
  extends VariantProps<typeof contentStyles>,
    HTMLAttributes<HTMLDivElement> {}

function Content({ ...props }: ContentProps) {
  return <div className={contentStyles()} {...props} />
}

const footerStyles = cva(
  'px-10 py-2 border-t border-opacity-50 border-slate-300',
  {
    variants: {}
  }
)

export interface FooterProps
  extends VariantProps<typeof footerStyles>,
    HTMLAttributes<HTMLDivElement> {}

function Footer({ ...props }: FooterProps) {
  return <div className={footerStyles()} {...props} />
}

export const Card = Object.assign(CardRoot, { Header, Content, Footer })
