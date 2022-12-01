import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@utils/prisma'

type IncomingAPIRequest = Omit<NextApiRequest, 'query' | 'method' | 'body'> & {
  method: 'PATCH'
  query: { id: string }
  body: { data: string }
}

async function handler(req: IncomingAPIRequest, res: NextApiResponse) {
  const { id } = req.query
  const { data } = req.body

  if (!id) {
    return res.status(405).end()
  }

  if (req.method !== 'PATCH') {
    return res.status(405).end()
  }

  try {
    const post = await prisma.posts.update({ where: { id }, data: { data } })
    return res.status(200).json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

export default handler
