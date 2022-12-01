import React from 'react'

import { useSession } from 'next-auth/react'
import { Content } from '@tiptap/react'

import Avatar from '@ui/Avatar'
import Tiptap from '@ui/Tiptap'
import Button from '@ui/Button'

export type EditorProps = {
  submit: (content: Content) => void
}

export default function Editor({ submit }: EditorProps) {
  const [content, setContent] = React.useState<Content>({})

  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  return (
    <div className="bg-white shadow p-4 leading-[0]">
      <div className="w-full mb-3 inline-flex items-start space-x-3">
        <div>{loading && <Avatar src={data.user.image} size="sm" />}</div>
        <div className=" bg-gray-100 px-4 py-1 rounded-lg w-full overflow-hidden">
          <Tiptap
            editable={true}
            onUpdate={({ editor }) => setContent(editor.getJSON())}
          />
        </div>
      </div>
      <div className="w-full inline-flex items-center justify-end space-x-3">
        <Button onClick={() => submit(content)}>Post</Button>
      </div>
    </div>
  )
}
