import React from 'react'
import useSWR from 'swr'
import StarterKit from '@tiptap/starter-kit'

import {
  EditorContent,
  EditorEvents,
  JSONContent,
  useEditor
} from '@tiptap/react'
import { fetcher } from '@lib'
import { Card, Layout } from '@components'
import { Editor, Tiptap } from '@components/editor'

import { Post } from '@prisma/client'
import { GetServerSideProps } from 'next'

export type HomeProps = {
  posts: Post[]
}

function Post({ content }: { content: JSONContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content
  })

  return <Card>{editor && <EditorContent editor={editor} />}</Card>
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
            <Post content={JSON.parse(post.data)} />
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
