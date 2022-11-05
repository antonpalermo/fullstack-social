import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { prisma } from '@prisma'
import { options } from '../auth/[...nextauth]'

type IncomingAPIRequest = Omit<NextApiRequest, 'method'> & {
  method: 'POST' | 'PATCH'
}

async function handler(req: IncomingAPIRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, options)

  switch (req.method) {
    case 'POST':
      const post = await prisma.post.create({
        data: {
          data: req.body,
          user: { connect: { email: session.user.email } }
        }
      })
      return res.status(201).json(post)
  }
}

export default handler
