import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@utils/prisma'

type IncomingAPIRequest = Omit<NextApiRequest, 'method'> & {
  method: 'GET'
}

async function handler(req: IncomingAPIRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany({
    include: {
      user: { select: { name: true, image: true } },
      comments: {
        select: { body: true, owner: { select: { name: true, image: true } } }
      }
    }
  })
  if (req.method === 'GET') {
    return res.status(200).json(posts)
  }
}

export default handler
