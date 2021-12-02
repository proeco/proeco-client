import { Reaction } from '~/domains';

/**
 * mockしたreactionを生成するための関数
 * @param mock reactionオブジェクトの一部
 * @returns 生成したreaction
 */
export const createMockReaction = (mock: Partial<Reaction> = {}): Reaction => {
  return new Reaction({
    _id: mock._id || 'reaction1',
    createdUserId: mock.createdUserId || 'user1',
    targetId: mock.targetId || 'targetId',
    emojiId: mock.emojiId || 'mockEmojiId',
    comment: mock.comment || 'mockComment',
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
