/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockStoryPost } from '../domains';

const db = [createMockStoryPost()];

export const getStoryPosts = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(db[0]));
};

export const postStoryPost = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};

export const deleteStoryPost = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};
