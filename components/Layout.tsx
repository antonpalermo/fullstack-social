import React, { HTMLAttributes } from 'react'
import Head from 'next/head'

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export function Layout({ title, ...props }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div data-testid="layout" {...props} />
    </>
  )
}
