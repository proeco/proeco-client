export class Reaction {
  _id: string;
  createdUserId: string;
  targetId: string;
  emojiId?: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Reaction) {
    this._id = init._id;
    this.createdUserId = init.createdUserId;
    this.targetId = init.targetId;
    this.emojiId = init.emojiId;
    this.comment = init.comment;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}

export const convertReactionFromServer = (reaction: Reaction) => {
  return new Reaction({ ...reaction, createdAt: new Date(reaction.createdAt), updatedAt: new Date(reaction.updatedAt) });
};
