import Joi from 'joi'

import { options } from '../auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@utils/prisma'
import { Prisma, Posts } from '@prisma/client'

type IncomingAPIRequest = Omit<NextApiRequest, 'method' | 'body'> & {
  method: 'POST'
  body: { data: string }
}

const schema = Joi.object({
  data: Joi.string().required().max(200).messages({
    'string.base': 'data should be type string',
    'string.empty': 'Post should contain at least 3 or more characters',
    'any.required': 'Post should contain at least 3 or more characters'
  })
})

async function handler(req: IncomingAPIRequest, res: NextApiResponse) {
  const { data } = req.body
  const method = req.method
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return res.status(401).end()
  }

  if (method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const {
      value: { data: validatedData },
      error
    } = schema.validate({ data: JSON.stringify(data) })

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const post = await prisma.posts.create({
      data: {
        data: validatedData,
        users: { connect: { email: session.user.email } }
      },
      include: { users: true }
    })

    return res.status(201).json(post)
  } catch (error) {
    return res.status(500).end()
  }
}

export default handler
