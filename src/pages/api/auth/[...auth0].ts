import { handleAuth, handleCallback, getSession } from '@auth0/nextjs-auth0';
import { restClient } from '~/utils/rest-client';

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res);
      const session = getSession(req, res);

      if (!session) return;
      const { user, accessToken } = session;
      if (!user || !accessToken) return;

      restClient.apiPost('/users', {
        user: {
          name: user.name,
          email: user.email,
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
});
