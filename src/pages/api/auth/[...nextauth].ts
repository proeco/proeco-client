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
    adapter: MongoDBAdapter({
      db: (await clientPromise).db('proeco'),
    }),

    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        console.log(18, token, user, account, profile, isNewUser);

        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
        return token;
      },
    },

    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      updateAge: 24 * 60 * 60 * 1000,
    },
  });
