import { Prisma } from '@prisma/client'

import { Tiptap } from '@components/editor'
import { Avatar } from '@components'
import { mutate } from 'swr'
import { useSession } from 'next-auth/react'

import Card from '@ui/Card'

export type PostProps = {
  post: Prisma.PostsGetPayload<{
    include: { users: { select: { name: true; image: true } } }
  }>
}

export function Post({ post }: PostProps) {
  const { data, status } = useSession()
  const loading = status !== 'loading'
  const owned = loading && post.userId === data.user.id

  async function deletePost() {
    const response = await fetch(`/api/post/delete?id=${post.id}`)
    console.log(await response.json())
    mutate('/api/post')
  }

  return (
    <Card>
      <div className="inline-flex items-center justify-start space-x-3">
        <Avatar src={post.users.image} size="sm" />
        <h3>{post.users.name}</h3>
      </div>
      <div className="my-3">
        <Tiptap editable={false} content={JSON.parse(post.data)} />
      </div>
      {owned && <button onClick={deletePost}>Delete</button>}
    </Card>
  )
}
