import React from 'react'
import useSWR from 'swr'

import { Prisma } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { Content } from '@tiptap/react'

import Post from '@ui/Post'
import Layout from '@ui/Layout'
import Editor from '@ui/Editor'
import fetcher from '@utils/fetcher'
import { Card } from '@ui/Card'
import Tiptap from '@ui/Tiptap'

type Post = Prisma.PostsGetPayload<{
  include: { users: { select: { name: true; image: true } } }
}>

export type HomeProps = {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  const { data, mutate } = useSWR<Post[]>('/api/post', fetcher, {
    fallbackData: posts
  })

  async function submit(content: Content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: content })
    })

    const post = await response.json()
    mutate(data, post)
  }

  return (
    <div className="sm:container">
      <Card>
        <Card.Header>
          <h1>Sample Header</h1>
        </Card.Header>
        <Card.Content>
          <h2>Card Contents</h2>
        </Card.Content>
        <Card.Footer>
          <h2>Footer Content</h2>
        </Card.Footer>
      </Card>
      <div className="space-y-3">
        {data &&
          data.map(post => (
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
