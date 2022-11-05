import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

import { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const options: NextAuthOptions = {
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
}

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default handler
