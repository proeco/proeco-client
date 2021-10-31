export class Story {
  _id: string;
  title: string;
  emojiId: string;
  description: string;
  teamId: string;
  isPrivate: boolean;
  createdUserId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(init: Story) {
    this._id = init._id;
    this.title = init.title;
    this.emojiId = init.emojiId;
    this.description = init.description;
    this.teamId = init.teamId;
    this.isPrivate = init.isPrivate;
    this.createdUserId = init.createdUserId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
