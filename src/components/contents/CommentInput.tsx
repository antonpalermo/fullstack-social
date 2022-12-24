import { EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Button from '@ui/Button'

export default function CommentInput() {
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
    <div className="flex w-full items-center">
      {editor && <EditorContent className="w-full" editor={editor} />}
      <Button>Comment</Button>
    </div>
  )
}
