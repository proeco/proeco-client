import { rest } from 'msw';

export const handlers = [
  // Handles a GET /user request
  rest.get('/api/v1/users/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    );
  }),
];
