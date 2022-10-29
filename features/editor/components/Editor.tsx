import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import { Content, JSONContent, useEditor, EditorContent } from '@tiptap/react'
import { Button, Card } from '@components'

export type EditorProps = {
  submit: (content: JSONContent) => void
  content?: Content
}

export function Editor({ submit, content }: EditorProps) {
  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's on your bright mind?"
      })
    ],
    content
  })

  return (
    <Card>
      {editor && <EditorContent editor={editor} />}
      <Button onClick={() => submit(editor.getJSON())}>Post</Button>
    </Card>
  )
}
