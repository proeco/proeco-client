/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockStory } from '../domains';

const db = [createMockStory()];

export const getStories = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(db[0]));
};

export const postStories = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};

export const deleteStories = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};
