import { Prisma } from '@prisma/client'

import { mutate } from 'swr'
import { useSession } from 'next-auth/react'

import Tiptap from '@ui/Tiptap'
import Button from '@ui/Button'

export type PostProps = {
  post: Prisma.PostGetPayload<{
    include: { user: { select: { name: true; image: true } } }
  }>
}

export default function Post({ post }: PostProps) {
  const { data, status } = useSession()
  const loading = status !== 'loading'
  const owned = loading && post.userId === data.user.id

  async function deletePost() {
    const response = await fetch(`/api/post/delete?id=${post.id}`)
    console.log(await response.json())
    mutate('/api/post')
  }

  return (
    <>
      <div className="inline-flex items-center justify-start space-x-3">
        <h3>{post.user.name}</h3>
      </div>
      <div className="my-3">
        <Tiptap editable={false} content={JSON.parse(post.data)} />
      </div>
      {owned && <Button onClick={deletePost}>Delete</Button>}
    </>
  )
}
