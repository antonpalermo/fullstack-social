import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import { EditorContent, EditorEvents, useEditor } from '@tiptap/react'

export type TiptapProps = {
  onUpdate?: (props: EditorEvents['update']) => void
  editable?: boolean
  content?: any
}

export function Tiptap({ editable, content, onUpdate }: TiptapProps) {
  const editor = useEditor(
    {
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
      onUpdate,
      editorProps: {
        attributes: {
          class: 'prose prose-base focus:outline-none'
        }
      }
    },
    [content]
  )

  React.useEffect(() => {
    editor?.setEditable(editable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable])

  return <EditorContent editor={editor} />
}
