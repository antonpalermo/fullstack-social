import Image from 'next/image'
import { useState } from 'react'

import Tiptap from '@ui/Tiptap'
import { Card } from '@ui/Card'

import { Content } from '@tiptap/react'
import { useSession } from 'next-auth/react'
import Button from '@ui/Button'

export interface EditorProps {
  onSubmit: (content: Content) => void
}

export default function Editor({ onSubmit }: EditorProps) {
  const { data, status } = useSession()
  const loading = data && status !== 'loading'
  const [content, setContent] = useState<Content>({})

  return (
    <Card>
      <Card.Header>
        {loading && (
          <>
            <div className="relative w-9 h-9 rounded-full overflow-hidden">
              <Image src={data.user.image} alt="user avatar" fill />
            </div>
            <h1 className="font-semibold text-slate-800">{data.user.name}</h1>
          </>
        )}
      </Card.Header>
      <Card.Content>
        <Tiptap
          editable={true}
          onUpdate={({ editor }) => setContent(editor.getJSON())}
        />
      </Card.Content>
      <Card.Footer>
        <div className="w-full inline-flex items-center justify-end">
          <Button onClick={() => onSubmit(content)}>Post</Button>
        </div>
      </Card.Footer>
    </Card>
  )
}
