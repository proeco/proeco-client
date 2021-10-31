import { UserTeamRelation } from '~/domains';

/**
 * mockしたUserTeamRelationを生成するための関数
 * @param mock オブジェクトの一部
 * @returns オブジェクト
 */
export const createMockUserTeamRelation = (mock: Partial<UserTeamRelation> = {}): UserTeamRelation => {
  return new UserTeamRelation({
    _id: mock._id || 'userTeamRelation1',
    userId: mock.userId || 'user1',
    teamId: mock.teamId || 'team1',
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
