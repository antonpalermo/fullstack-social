import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import { Content, EditorContent, EditorEvents, useEditor } from '@tiptap/react'

export type TiptapProps = {
  onUpdate: (props: EditorEvents['update']) => void
  editable: boolean
  content?: Content
}

export function Tiptap({ editable, content, onUpdate }: TiptapProps) {
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
    editable,
    content,
    onUpdate: props => onUpdate(props),
    editorProps: {
      attributes: {
        class: 'prose prose-base focus:outline-none'
      }
    }
  })

  React.useEffect(() => {
    editor?.setEditable(editable)
  }, [editor, editable])

  return <EditorContent editor={editor} />
}
