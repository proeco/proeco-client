import { Notification } from '~/domains';

/**
 * mockしたnotificationを生成するための関数
 * @param mock オブジェクトの一部
 * @returns 生成したデータ
 */
export const createMockNotification = (mock: Partial<Notification> = {}): Notification => {
  return new Notification({
    _id: mock._id || 'reaction1',
    type: mock.type || 'SYSTEM_NOTIFICATION',
    createdUserId: mock.createdUserId || 'user1',
    targetUserId: mock.targetUserId || 'targetId',
    message: mock.message || 'message',
    url: mock.url || 'url',
    isChecked: mock.isChecked ?? false,
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
