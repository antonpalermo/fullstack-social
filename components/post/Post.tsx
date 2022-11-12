import { Prisma } from '@prisma/client'

import { Tiptap } from '@components/editor'
import { Avatar, Card } from '@components'
import { mutate } from 'swr'

export type PostProps = {
  post: Prisma.PostsGetPayload<{
    include: { users: { select: { name: true; image: true } } }
  }>
}

export function Post({ post }: PostProps) {
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
      <Tiptap editable={false} content={JSON.parse(post.data)} />
      <button onClick={deletePost}>Delete</button>
    </Card>
  )
}
