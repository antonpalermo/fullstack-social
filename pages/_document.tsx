import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

export type MainDocumentProps = {}

export default function MainDocument({}: MainDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
