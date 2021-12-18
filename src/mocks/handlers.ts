import { rest } from 'msw';
import { getAttachmentById, postAttachment } from './api/attachment';
import { getCurrentUser } from './api/user';
import { getStories, postStories } from './api/stories';
import { getStoryPosts, postStoryPost, deleteStoryPost } from './api/storyPost';
import { getReaction, postReaction, putReaction, deleteReaction } from './api/reaction';
import { getTeam } from './api/team';

const generateRoute = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL_FROM_CLIENT}/api/v1${path}`;
};

export const handlers = [
  rest.get(generateRoute('/users/me'), getCurrentUser),

  rest.get(generateRoute('/attachments/:id/signedUrl'), getAttachmentById),
  rest.post(generateRoute('/attachments'), postAttachment),

  rest.get(generateRoute('/stories'), getStories),
  rest.post(generateRoute('/stories'), postStories),

  rest.get(generateRoute('/story-posts'), getStoryPosts),
  rest.post(generateRoute('/story-posts'), postStoryPost),
  rest.delete(generateRoute('/story-posts/:id'), deleteStoryPost),

  rest.get(generateRoute('/reactions'), getReaction),
  rest.post(generateRoute('/reactions'), postReaction),
  rest.put(generateRoute('/reactions'), putReaction),
  rest.delete(generateRoute('/reactions'), deleteReaction),

  rest.get(generateRoute('/teams/:id'), getTeam),
];
