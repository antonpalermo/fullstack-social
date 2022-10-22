import React, { ReactElement } from 'react'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import '@styles'
import { AppProps } from '@lib'

export default function App({
  Component,
  pageProps: { session, ...props }
}: AppProps<{ session?: Session }>) {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <SessionProvider session={session}>
      {getPageLayout(<Component {...props} />)}
    </SessionProvider>
  )
}
