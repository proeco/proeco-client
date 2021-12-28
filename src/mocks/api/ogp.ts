/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ogp } from '~/interfaces/ogp';

const db = [
  {
    url: 'https://www.proeco.app/',
    title: 'mockTitle',
    image: 'https://www.proeco.app//images/twitter-ogp.png',
    description: 'mockDescription',
    siteName: 'mockSiteName',
  } as Ogp,
];

export const getOgp = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json({ ogp: db[0] }));
};
