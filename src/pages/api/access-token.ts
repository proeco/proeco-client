import { getSession } from 'next-auth/react';
import { restClient } from '~/utils/rest-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: any, res: any) => {
  const session = await getSession({ req });

  if (session && session.user) {
    await restClient.apiPost('/users', {
      user: {
        name: session.user.name,
        email: session.user.email,
        accessToken: session.accessToken,
      },
    });
    res.send({
      accessToken: session.accessToken,
    });
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    });
  }
};
