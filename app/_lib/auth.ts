import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import { db } from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user = { ...session.user, id: user.id }
  //     return session
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
}
