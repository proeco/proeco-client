import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { URLS } from '~/constants';
import { restClient } from '~/utils/rest-client';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        await restClient.apiPost('/users', {
          user: {
            name: token.name,
            email: token.email,
            accessToken: token.accessToken,
          },
          secret: process.env.AUTH_SECRET,
        });
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.SESSION_COOKIE_SECRET,

  pages: {
    newUser: URLS.DASHBOARD_SETTINGS,
  },

  jwt: {
    secret: process.env.SESSION_COOKIE_SECRET,
  },
});
