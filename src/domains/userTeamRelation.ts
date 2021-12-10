export class UserTeamRelation {
  _id: string;
  userId: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, userId, teamId, createdAt, updatedAt }: UserTeamRelation) {
    this._id = _id;
    this.userId = userId;
    this.teamId = teamId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * サーバーから返ってくる日付データをDate型に変換する
 * @param userTeamRelation
 * @returns {UserTeamRelation}
 */
export const convertUserTeamRelationFromServer = (userTeamRelation: UserTeamRelation) => {
  return new UserTeamRelation({
    ...userTeamRelation,
    createdAt: new Date(userTeamRelation.createdAt),
    updatedAt: new Date(userTeamRelation.updatedAt),
  });
};
