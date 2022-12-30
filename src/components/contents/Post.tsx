import Image from 'next/image'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import Button from '@ui/Button'

import { Card } from '@ui/Card'
import { Prisma } from '@prisma/client'
import { Content, EditorContent, JSONContent, useEditor } from '@tiptap/react'

import Comment from '@contents/Comment'
import CommentInput from '@contents/CommentInput'

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
    const request = await fetch(`/api/post/${post.id}/comments`, {
      method: 'POST',
      body: JSON.stringify(content)
    })
    const comment = await request.json()
    console.log(comment)
  }

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
        {post.comments &&
          post.comments.map(comment => (
            <div
              key={comment.id}
              className="inline-flex items-center space-x-2"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src={comment.owner.image} alt="user avatar" fill />
              </div>
              <Comment content={JSON.parse(comment.body)} />
            </div>
          ))}
        <CommentInput comment={content => comment(content)} />
      </Card.Footer>
    </Card>
  )
}
