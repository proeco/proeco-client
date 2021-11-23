import { rest } from 'msw';
import { getAttachmentById } from './api/attachment';
import { getCurrentUser } from './api/user';

export const handlers = [
  rest.get('http://localhost:8000/api/v1/users/me', getCurrentUser),
  rest.get('http://localhost:8000/api/v1/attachments/:id', getAttachmentById),
];
