import '@styles/global.css'
import React, { ReactElement } from 'react'

import { SessionProvider } from 'next-auth/react'
import { PageProps } from '@utils/layout'
import { Session } from 'next-auth'

export default function App({
  Component,
  pageProps
}: PageProps<{ session: Session }>) {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <SessionProvider session={pageProps.session}>
      {getPageLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}
