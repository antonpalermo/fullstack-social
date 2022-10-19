import React, { ReactElement } from 'react'
import { AppProps } from '@lib'

export default function App({ Component, pageProps }: AppProps) {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)
  return getPageLayout(<Component {...pageProps} />)
}
