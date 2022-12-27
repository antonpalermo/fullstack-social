import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@utils/prisma'
import { unstable_getServerSession } from 'next-auth'
import { options } from '@pages/api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, options)
  const { id } = req.query
  const body = req.body

  try {
    const comment = await prisma.comment.create({
      include: { owner: { select: { name: true, image: true } } },
      data: {
        body: JSON.stringify(body),
        post: { connect: { id: id as string } },
        owner: { connect: { email: session.user.email } }
      }
    })
    console.log(comment)
    return res.status(200).json({ message: 'ok' })
  } catch (error) {
    return res.status(500).json({ error: 'error comment' })
  }
}
