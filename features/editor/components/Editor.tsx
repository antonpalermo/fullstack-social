import React from 'react'
import StarterKit from '@tiptap/starter-kit'

import { Content, JSONContent, useEditor, EditorContent } from '@tiptap/react'
import { Button, Card, Avatar } from '@components'
import { useSession } from 'next-auth/react'

export type EditorProps = {
  submit: (content: JSONContent) => void
  content?: Content
}

export function Editor({ submit, content }: EditorProps) {
  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit],
    content
  })

  return (
    <Card>
      {editor && <EditorContent editor={editor} />}
      <Button onClick={() => submit(editor.getJSON())}>Post</Button>
    </Card>
  )
}
