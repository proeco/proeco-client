import { rest } from 'msw';
import { createMockUser } from './domains';

export const handlers = [
  rest.get('/api/v1/users/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createMockUser()));
  }),
];
