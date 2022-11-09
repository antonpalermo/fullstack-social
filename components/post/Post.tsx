import { Prisma } from '@prisma/client'

import { Tiptap } from '@components/editor'
import { Avatar, Card } from '@components'

export type PostProps = {
  post: Prisma.PostGetPayload<{
    include: { user: { select: { name: true; image: true } } }
  }>
}

export function Post({ post }: PostProps) {
  return (
    <Card>
      <div className="inline-flex items-center justify-start space-x-3">
        <Avatar src={post.user.image} size="sm" />
        <h3>{post.user.name}</h3>
      </div>
      <Tiptap editable={false} content={JSON.parse(post.data)} />
    </Card>
  )
}
