import Image from 'next/image'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import Button from '@ui/Button'

import { Card } from '@ui/Card'
import { Prisma } from '@prisma/client'
import { EditorContent, useEditor } from '@tiptap/react'

type PostProps = {
  post: Prisma.PostGetPayload<{
    include: { user: { select: { name: true; image: true } } }
  }>
}

export default function Post({ post }: PostProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Any cool ideas?'
      }),
      CharacterCount.configure({
        limit: 200
      })
    ],
    editable: false,
    content: JSON.parse(post.body),
    editorProps: {
      attributes: {
        class: 'prose prose-base focus:outline-none px-10 py-5'
      }
    }
  })

  return (
    <Card>
      <Card.Header>
        <>
          <div className="relative w-9 h-9 rounded-full overflow-hidden">
            <Image src={post.user.image} alt="user avatar" fill />
          </div>
          <h1 className="font-semibold text-slate-800">{post.user.name}</h1>
        </>
      </Card.Header>
      <Card.Content>{editor && <EditorContent editor={editor} />}</Card.Content>
      <Card.Footer>
        <div className="w-full inline-flex items-center justify-end">
          <Button>Comment</Button>
        </div>
      </Card.Footer>
    </Card>
  )
}
