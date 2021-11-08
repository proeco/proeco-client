import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req: NextApiRequest, res: NextApiResponse): void | Promise<void> =>
  NextAuth(req, res, {
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
    ],

    database: process.env.MONGO_URI || 'mongodb://localhost:27017/webev',

    session: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      updateAge: 24 * 60 * 60 * 1000,
    },
  });
