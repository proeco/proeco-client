import { User } from '~/domains';

/**
 * mockしたuserを生成するための関数
 * @param mock userオブジェクトの一部
 * @returns 生成したUser
 */
export const createMockUser = (mock: Partial<User> = {}): User => {
  return new User({
    _id: mock._id || 'user1',
    name: mock.name || 'mockName',
    description: mock.description || 'mockDescription',
    email: mock.email || 'mockEmail',
    image: mock.image || 'mockImage',
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
