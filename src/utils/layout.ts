import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  pageLayout?: (page: ReactElement) => ReactNode
}

export type PageProps<P = {}> = AppProps<P> & {
  Component: PageLayout<P>
}
