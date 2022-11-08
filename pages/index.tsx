import React from 'react'
import useSWR from 'swr'
import StarterKit from '@tiptap/starter-kit'

import { EditorContent, useEditor } from '@tiptap/react'
import { fetcher } from '@lib'
import { Avatar, Card, Layout } from '@components'
import { Editor } from '@components/editor'

import { Prisma } from '@prisma/client'
import { GetServerSideProps } from 'next'

type Post = Prisma.PostGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export type HomeProps = {
  posts: Post[]
}

type PostProps = {
  post: Prisma.PostGetPayload<{
    include: { user: { select: { name: true; image: true } } }
  }>
}

function Post({ post }: PostProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: JSON.parse(post.data)
  })

  return (
    <Card>
      <div className="inline-flex items-center justify-start space-x-3">
        <Avatar src={post.user.image} size="sm" />
        <h3>{post.user.name}</h3>
      </div>
      {editor && <EditorContent editor={editor} />}
    </Card>
  )
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
