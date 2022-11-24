import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

import { options } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

type IncomingRequestBody = {
  data: string
}

type IncomingAPIRequest = Omit<NextApiRequest, 'method' | 'body'> & {
  body: IncomingRequestBody
  query: { id: string }
  method: 'POST' | 'PATCH'
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
  const query = req.query
  const session = await unstable_getServerSession(req, res, options)
  // check if there's a session present.
  if (!session) {
    return res.status(401).json({
      message: 'Not authorized: please sign in before accessing this request'
    })
  }
  // schema validation.
  const { value, error } = schema.validate({ data: JSON.stringify(body.data) })
  // if error is present then return error.
  if (error) {
    return res
      .status(405)
      .json({ message: 'The submited request contains invalid data.' })
  }
  // if request is post then create new post.
  if (req.method === 'POST') {
    const { data, error } = await createPost(value, session.user.email)
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(201).json(data)
  }
  // if request is patch then update selected post.
  if (req.method === 'PATCH') {
    const { data, error } = await updatePost(query.id, value)
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).json(data)
  }

  return res
    .status(405)
    .json({ message: 'Invalid request: requested method not allowed.' })
}

/**
 * create new post.
 * @param data to be inserted to the database.
 * @returns newly created post data.
 */
async function createPost(
  { data }: IncomingRequestBody,
  email: string
): Promise<{ data?: any | null; error?: { message: string } | null }> {
  try {
    const post = await prisma.posts.create({
      data: { data, users: { connect: { email } } },
      include: { users: true }
    })
    return { data: post }
  } catch (error) {
    console.log(error)
    return { error: { message: 'Unable to insert post data.' } }
  }
}

/**
 * update selected post.
 * @param id of post to update.
 * @param data data to replace to be replaced.
 * @returns updated post data.
 */
async function updatePost(
  id: string,
  data: IncomingRequestBody
): Promise<{ data?: any | null; error?: { message: string } | null }> {
  try {
    const post = await prisma.posts.update({ where: { id }, data })
    return { data: post }
  } catch (error) {
    console.log(error)
    return { error: { message: 'Unable to update post data.' } }
  }
}

export default handler
