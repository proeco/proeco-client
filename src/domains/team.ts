export class Team {
  _id: string;
  name: string;
  description: string;
  adminUserId: string;
  iconImage?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Team) {
    this._id = init._id;
    this.name = init.name;
    this.description = init.description;
    this.adminUserId = init.adminUserId;
    this.iconImage = init.iconImage;
    this.slug = init.slug;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
