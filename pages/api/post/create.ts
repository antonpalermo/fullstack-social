import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@prisma'
import { Prisma, Post } from '@prisma/client'

import { options } from '../auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import Joi from 'joi'
import { JSONContent } from '@tiptap/react'

type _Post = Prisma.PostGetPayload<{ select: { data: true } }>

type IncomingAPIRequest = Omit<NextApiRequest, 'method' | 'body'> & {
  method: 'POST'
  body: _Post
}

type Result = {
  data?: Post | null
  error?: { message: string } | null
}

const schema = Joi.object<_Post>({
  data: Joi.object<JSONContent>().required()
})

async function handler(req: IncomingAPIRequest, res: NextApiResponse<Result>) {
  const body = req.body
  const method = req.method
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return res.status(401).json({
      error: {
        message:
          'Unauthorized: Please login before you can access this resource'
      }
    })
  }

  const {
    value: { data },
    error
  } = schema.validate(body)

  if (method === 'POST') {
    if (error) {
      return res.status(400).json({ error: { message: error.message } })
    }

    const post = await prisma.post.create({
      data: {
        data,
        user: { connect: { email: session.user.email } }
      }
    })

    return res.status(201).json({ data: post })
  }

  return res.status(405).json({
    error: {
      message: 'Bad Request: Invalid request method'
    }
  })
}

export default handler
