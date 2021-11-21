import { StoryPost } from '~/domains';

/**
 * mockしたstoryTaskを生成するための関数
 * @param mock storyTaskオブジェクトの一部
 * @returns 生成したStoryPost
 */
export const createMockStoryPost = (mock: Partial<StoryPost> = {}): StoryPost => {
  return new StoryPost({
    _id: mock._id || 'storyTask1',
    title: mock.title || 'mockTitle',
    storyId: mock.storyId || 'story1',
    createdUserId: mock.createdUserId || 'user1',
    startedAt: mock.startedAt || new Date(),
    completedAt: mock.completedAt || new Date(),
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
