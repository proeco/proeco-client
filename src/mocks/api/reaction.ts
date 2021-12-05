/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockReaction } from '../domains';

const db = [createMockReaction()];

export const getReaction = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(db[0]));
};

export const postReaction = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};

export const putReaction = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};

export const deleteReaction = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};
