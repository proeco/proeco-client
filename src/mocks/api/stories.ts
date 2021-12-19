/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockStory } from '../domains';

const db = [createMockStory({ isCompleted: true }), createMockStory({ isCompleted: false })];

export const getStories = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json({ docs: db }));
};

export const postStories = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};

export const deleteStories = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200));
};
