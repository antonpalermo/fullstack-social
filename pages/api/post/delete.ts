import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@prisma'

type IncomingAPIRequest = Omit<NextApiRequest, 'query'> & {
  query: {
    id: string
  }
}

async function handler(req: IncomingAPIRequest, res: NextApiResponse) {
  const { id } = req.query

  const data = await prisma.post.delete({ where: { id } })

  // TODO: only delete your own post.
  return res.status(200).json(data)
}

export default handler
