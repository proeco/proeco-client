import { Team } from '~/domains';

/**
 * mockしたteamを生成するための関数
 * @param mock teamオブジェクトの一部
 * @returns 生成したteam
 */
export const createMockTeam = (mock: Partial<Team> = {}): Team => {
  return new Team({
    _id: mock._id || 'team1',
    productId: mock.productId || 'product1',
    url: mock.url || 'https://github.com/proeco',
    name: mock.name || 'name',
    description: mock.description || 'description',
    homeContent: mock.homeContent || '## Product',
    adminUserId: mock.adminUserId || 'adminUser1',
    iconImageId: mock.iconImageId || 'iconImage1',
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
