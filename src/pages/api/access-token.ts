import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res);
  return res.json({ accessToken });
};
