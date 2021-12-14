/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockTeam } from '../domains';

const db = [createMockTeam()];

export const getTeam = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(db[0]));
};
