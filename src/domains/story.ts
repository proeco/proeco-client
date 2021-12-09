import { Reaction } from './reaction';

export class Story {
  _id: string;
  title: string;
  emojiId: string;
  teamId: string;
  isPrivate: boolean;
  isCompleted: boolean;
  createdUserId: string;
  createdAt: Date;
  updatedAt: Date;
  reactions?: Reaction[];

  constructor(init: Story) {
    this._id = init._id;
    this.title = init.title;
    this.emojiId = init.emojiId;
    this.teamId = init.teamId;
    this.isPrivate = init.isPrivate;
    this.isCompleted = init.isCompleted;
    this.createdUserId = init.createdUserId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
