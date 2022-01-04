import { getSession } from 'next-auth/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: any, res: any) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      accessToken: session.accessToken,
    });
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    });
  }
};
