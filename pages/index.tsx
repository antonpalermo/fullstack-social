import React from 'react'
import useSWR from 'swr'

import { fetcher } from '@lib'
import { Layout } from '@components'
import { Editor } from '@components/editor'
import { Post } from '@components/post'

import { Prisma } from '@prisma/client'
import { GetServerSideProps } from 'next'

type Post = Prisma.PostGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export type HomeProps = {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  const { data, mutate } = useSWR<Post[]>('/api/post', fetcher, {
    fallbackData: posts
  })

  return (
    <div className="sm:container">
      <div className="mb-3">
        <Editor />
      </div>
      <div className="space-y-3">
        {data.map(post => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await fetcher(`${process.env.NEXTAUTH_URL}/api/post`)

  return {
    props: { posts }
  }
}

Home.pageLayout = (page: React.ReactElement) => (
  <Layout title="_stack">{page}</Layout>
)
