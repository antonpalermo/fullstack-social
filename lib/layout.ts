import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import { AppProps as NextAppProps } from 'next/app'

export type NextPageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  pageLayout?: (page: ReactElement) => ReactNode
}

export type AppProps<P = {}> = NextAppProps<P> & {
  Component: NextPageLayout<P>
}
