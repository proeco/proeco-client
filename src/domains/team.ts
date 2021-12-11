export class Team {
  _id: string;
  productId: string;
  url: string;
  name: string;
  description: string;
  adminUserId: string;
  iconImageId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Team) {
    this._id = init._id;
    this.productId = init.productId;
    this.url = init.url;
    this.name = init.name;
    this.description = init.description;
    this.adminUserId = init.adminUserId;
    this.iconImageId = init.iconImageId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}

/**
 * サーバーから返ってくる日付データをDate型に変換する
 * @param team
 * @returns {Team}
 */
export const convertTeamFromServer = (team: Team) => {
  return new Team({ ...team, createdAt: new Date(team.createdAt), updatedAt: new Date(team.updatedAt) });
};
