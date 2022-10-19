import React, { ReactElement } from 'react'
import { Welcome, Layout } from '@components'

export type HomeProps = {}

export default function Home({}: HomeProps) {
  return <Welcome name="Anton" />
}

Home.pageLayout = (page: ReactElement) => (
  <Layout title="Fullstack Social">{page}</Layout>
)
