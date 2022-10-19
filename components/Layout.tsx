import React, { HTMLAttributes } from 'react'

import Head from 'next/head'
import { Header } from '@components'

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export function Layout({ title, ...props }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div data-testid="layout" className="container my-5" {...props} />
    </>
  )
}
