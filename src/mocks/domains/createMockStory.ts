import { Story } from '~/domains';

/**
 * mockしたstoryを生成するための関数
 * @param mock storyオブジェクトの一部
 * @returns 生成したStory
 */
export const createMockStory = (mock: Partial<Story> = {}): Story => {
  return new Story({
    _id: mock._id || 'mockId',
    title: mock.title || 'mockTitle',
    emojiId: mock.emojiId || 'mockEmojiId',
    teamId: mock.teamId || 'team1',
    isPrivate: mock.isPrivate || false,
    createdUserId: mock.createdUserId || 'mockCreatedUserId',
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
