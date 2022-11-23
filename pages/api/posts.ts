import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

import { options } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

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

const handler = async (req: IncomingAPIRequest, res: NextApiResponse) => {
  const body = req.body
  const session = await unstable_getServerSession(req, res, options)
  // check if there's a session present.
  if (!session) {
    return res.status(401).json({
      message: 'Not authorized: please sign in before accessing this request'
    })
  }
  // schema validation.
  const { value, error } = schema.validate(body)
  // if error is present then return error.
  if (error) {
    return res
      .status(405)
      .json({ message: 'The submited request contains invalid data.' })
  }

  switch (req.method) {
    case 'POST':
      return res.status(201).json(await createPost(value, session.user.email))
  }
}

/**
 * create new post.
 * @param data to be inserted to the database.
 * @returns newly created post data.
 */
async function createPost({ data }: { data: string }, email: string) {
  try {
    return await prisma.posts.create({
      data: { data, users: { connect: { email } } },
      include: { users: true }
    })
  } catch (error) {
    console.log(error)
    return { message: 'Unable to insert post data.' }
  }
}

export default handler
