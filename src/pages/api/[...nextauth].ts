import { setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { clientPromise } from '~/libs/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),

    callbacks: {
      async jwt({ token, account }) {
        if (account?.access_token) {
          setCookie({ res }, 'next-auth-access-token', account.access_token as string, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
        }
        return token;
      },
    },

    session: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      updateAge: 24 * 60 * 60 * 1000,
    },
  });
