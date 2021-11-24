/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockUser } from '../domains';

const db = [createMockUser()];

export const getCurrentUser = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(db[0]));
};
