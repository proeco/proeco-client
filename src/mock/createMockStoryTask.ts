import { StoryTask } from '~/domains';

/**
 * mockしたstoryTaskを生成するための関数
 * @param mock storyTaskオブジェクトの一部
 * @returns 生成したStoryTask
 */
export const createMockStoryTask = (mock: Partial<StoryTask>): StoryTask => {
  return new StoryTask({
    _id: mock._id || 'mockId',
    title: mock.title || 'mockTitle',
    storyId: mock.storyId || 'mockStoryId',
    createdUserId: mock.createdUserId || 'mockCreatedUserId',
    startedAt: mock.startedAt || new Date(),
    completedAt: mock.completedAt || new Date(),
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
