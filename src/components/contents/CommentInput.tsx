import { Content, EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Button from '@ui/Button'

export type CommentInputProps = {
  comment: (content: Content) => void
}

export default function CommentInput({ comment }: CommentInputProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a comment...'
      }),
      CharacterCount.configure({
        limit: 200
      })
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-base focus:outline-none w-full'
      }
    },
    editable: true
  })

  return (
    <div className="flex w-full items-center bg-slate-100 p-1 rounded-md pl-2 mt-2">
      {editor && <EditorContent className="w-full" editor={editor} />}
      <Button onClick={() => comment(editor.getJSON())}>Comment</Button>
    </div>
  )
}
