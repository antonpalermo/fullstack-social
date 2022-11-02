import React from 'react'

import { useSession } from 'next-auth/react'
import { Content, EditorEvents } from '@tiptap/react'

import { Avatar, Button } from '@components'
import { Tiptap } from '@components/editor'

export type EditorProps = {}

export function Editor({}: EditorProps) {
  const [content, setContent] = React.useState<Content>({})

  const { data, status } = useSession()
  const loading = data && status !== 'loading'

  async function hanleSubmit() {
    const response = await fetch('/api/post/create', {
      method: 'POST',
      body: JSON.stringify(content)
    })
    console.log(await response.json())
  }

  function handleUpdate(props: EditorEvents['update']) {
    setContent(props.editor.getJSON())
  }

  return (
    <div className="bg-white shadow p-4 leading-[0]">
      <div className="w-full mb-3 inline-flex items-start space-x-3">
        <div>{loading && <Avatar src={data.user.image} size="sm" />}</div>
        <div className=" bg-gray-100 px-4 py-1 rounded-lg w-full overflow-hidden">
          <Tiptap editable={true} onUpdate={handleUpdate} />
        </div>
      </div>
      <div className="w-full inline-flex items-center justify-between">
        <span>Sample</span>
        <Button onClick={hanleSubmit}>Post</Button>
      </div>
    </div>
  )
}
