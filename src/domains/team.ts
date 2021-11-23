export class Team {
  _id: string;
  name: string;
  description: string;
  adminUserId: string;
  iconImageId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Team) {
    this._id = init._id;
    this.name = init.name;
    this.description = init.description;
    this.adminUserId = init.adminUserId;
    this.iconImageId = init.iconImageId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
