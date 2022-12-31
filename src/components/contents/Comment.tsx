import { EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

type CommentProps = {
  content: string
}

export default function Comment({ content }: CommentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: {
          HTMLAttributes: {
            class: 'text-sm font-medium'
          }
        }
      })
    ],
    editable: false,
    content: JSON.parse(content),
    editorProps: {
      attributes: {
        class: 'prose prose-base focus:outline-none'
      }
    }
  })

  return <EditorContent editor={editor} />
}
