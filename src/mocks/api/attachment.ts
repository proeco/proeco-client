/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockAttachment } from '../domains';

const db = [
  // user1 のアイコン
  createMockAttachment({
    _id: 'attachment1',
    filePath: 'https://itizawa-tech.growi.cloud/attachment/619cf4648062e8c5ac7e684f',
  }),
];

export const getAttachmentById = (req: any, res: any, ctx: any) => {
  const id = req.params.id;
  const attachment = db.find((v) => v._id === id);

  return res(ctx.status(200), ctx.json({ signedUrl: attachment?.filePath }));
};

export const postAttachment = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};
