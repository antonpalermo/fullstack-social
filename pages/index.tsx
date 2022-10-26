import React, { ReactElement } from 'react'
import { Welcome, Layout } from '@components'
import { Editor } from '@feat/editor'
import { JSONContent } from '@tiptap/react'
import { fetcher } from '@lib'

export type HomeProps = {}

export default function Home({}: HomeProps) {
  async function onSubmit(content: JSONContent) {
    const { data } = await fetcher('/api/post/create', {
      method: 'POST',
      body: JSON.stringify(content)
    })
  }

  return (
    <div className="sm:container">
      <Editor submit={onSubmit} />
    </div>
  )
}

Home.pageLayout = (page: ReactElement) => <Layout title="_stack">{page}</Layout>
