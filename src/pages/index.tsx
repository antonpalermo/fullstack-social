import React from 'react'
import useSWR from 'swr'

import { Prisma } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { Content } from '@tiptap/react'

import Layout from '@ui/Layout'

import Post from '@contents/Post'
import Editor from '@contents/Editor'

import fetcher from '@utils/fetcher'

type Post = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        name: true
        image: true
      }
    }
    comments: {
      select: {
        id: true
        body: true
        owner: {
          select: {
            id: true
            name: true
            image: true
          }
        }
      }
    }
  }
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
      <Editor onSubmit={submit} />
      <div className="mt-10 space-y-3">
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
