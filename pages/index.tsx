import React, { ReactElement } from 'react'
import { Welcome, Layout } from '@components'

export type HomeProps = {}

export default function Home({}: HomeProps) {
  return (
    <div className="sm:container">
      <Welcome name="Anton" />
    </div>
  )
}

Home.pageLayout = (page: ReactElement) => <Layout title="_stack">{page}</Layout>
