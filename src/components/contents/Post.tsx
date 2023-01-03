import Image from 'next/image'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import { Card } from '@ui/Card'
import { Prisma } from '@prisma/client'
import { Content, EditorContent, JSONContent, useEditor } from '@tiptap/react'

import Comment from '@contents/Comment'
import CommentInput from '@contents/CommentInput'
import { useSWRConfig } from 'swr'

type PostProps = {
  post: Prisma.PostGetPayload<{
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
}

export default function Post({ post }: PostProps) {
  const { mutate } = useSWRConfig()

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

  async function comment(content: Content) {
    await fetch(`/api/post/${post.id}/comments`, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    mutate('/api/post')
  }

  return (
    <Card>
      <Card.Header>
        <>
          <div className="relative w-9 h-9 rounded-full overflow-hidden">
            <Image src={post.user.image} alt="user avatar" fill sizes="36px" />
          </div>
          <h1 className="font-semibold text-slate-800">{post.user.name}</h1>
        </>
      </Card.Header>
      <Card.Content>{editor && <EditorContent editor={editor} />}</Card.Content>
      <Card.Footer>
        <div className="space-y-2">
          {post.comments.map(comment => (
            <div
              key={comment.id}
              className="w-full inline-flex items-center space-x-3"
            >
              <div className="relative block w-9 h-9 rounded-full overflow-hidden">
                <Image src={comment.owner.image} alt="user avatar" fill />
              </div>
              <Comment content={comment.body} />
            </div>
          ))}
        </div>
        <CommentInput comment={content => comment(content)} />
      </Card.Footer>
    </Card>
  )
}
