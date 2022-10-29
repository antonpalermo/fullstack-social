import React, { ReactElement } from 'react'

import useSWR from 'swr'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import { GetServerSideProps } from 'next'

import { fetcher } from '@lib'

import { Card, Layout } from '@components'
import { Editor } from '@feat/editor'
import { Post } from '@prisma/client'
import StarterKit from '@tiptap/starter-kit'

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
    fallbackData: posts,
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
      <div className="mb-3">
        <Editor submit={onSubmit} />
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

Home.pageLayout = (page: ReactElement) => <Layout title="_stack">{page}</Layout>
