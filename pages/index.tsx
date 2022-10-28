import React, { ReactElement } from 'react'

import useSWR from 'swr'
import { JSONContent } from '@tiptap/react'
import { GetServerSideProps } from 'next'

import { fetcher } from '@lib'

import { Layout } from '@components'
import { Editor } from '@feat/editor'
import { Post } from '@prisma/client'

export type HomeProps = {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  const { data, mutate } = useSWR<Post[]>('/api/post', fetcher, {
    fallbackData: posts
  })

  async function onSubmit(content: JSONContent) {
    const post = await fetcher('/api/post/create', {
      method: 'POST',
      body: JSON.stringify(content)
    })
    mutate(data, post)
  }

  return (
    <div className="sm:container">
      <Editor submit={onSubmit} />
      {data && data.map(post => <div key={post.id}>{post.id}</div>)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await fetcher(`${process.env.NEXTAUTH_URL}/api/post`)

  return {
    props: { posts }
  }
}

Home.pageLayout = (page: ReactElement) => <Layout title="_stack">{page}</Layout>
