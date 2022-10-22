import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: 'jwt'
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ]
  })

export default handler
