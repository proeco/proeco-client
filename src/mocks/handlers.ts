import { rest } from 'msw';
import { getAttachmentById } from './api/attachment';
import { getCurrentUser } from './api/user';
import { getStoryPosts, postStoryPost, deleteStoryPost } from './api/storyPost';

const generateRoute = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL_FROM_CLIENT}/api/v1${path}`;
};

export const handlers = [
  rest.get(generateRoute('/users/me'), getCurrentUser),
  rest.get(generateRoute('/attachments/:id/signedUrl'), getAttachmentById),
  rest.get(generateRoute('/story-posts'), getStoryPosts),
  rest.post(generateRoute('/story-posts'), postStoryPost),
  rest.delete(generateRoute('/story-posts/:id'), deleteStoryPost),
];
