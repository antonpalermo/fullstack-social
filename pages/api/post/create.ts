import { JSONContent } from '@tiptap/react'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@prisma'

type IncomingAPIRequest = Omit<NextApiRequest, 'method'> & {
  method: 'POST' | 'PATCH'
}

async function handler(req: IncomingAPIRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const post = await prisma.post.create({ data: { data: req.body } })
      return res.status(201).json(post)
  }
}

export default handler
