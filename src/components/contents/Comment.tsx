import { Content, EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

export default function Comment(content: Content) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content
  })

  return <EditorContent editor={editor} />
}
