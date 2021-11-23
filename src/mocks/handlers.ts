import { rest } from 'msw';
import { getAttachmentById } from './api/attachment';
import { getCurrentUser } from './api/user';

export const handlers = [rest.get('/api/v1/users/me', getCurrentUser), rest.get('/api/v1/attachments/:id', getAttachmentById)];
