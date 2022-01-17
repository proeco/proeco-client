export class Story {
  _id: string;
  title: string;
  description?: string;
  emojiId: string;
  teamId: string;
  isPrivate: boolean;
  isCompleted: boolean;
  createdUserId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(init: Story) {
    this._id = init._id;
    this.title = init.title;
    this.description = init.description;
    this.emojiId = init.emojiId;
    this.teamId = init.teamId;
    this.isPrivate = init.isPrivate;
    this.isCompleted = init.isCompleted;
    this.createdUserId = init.createdUserId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}

/**
 * サーバーから返ってくる日付データをDate型に変換する
 * @param story
 * @returns {Story}
 */
export const convertStoryFromServer = (story: Story) => {
  return new Story({ ...story, createdAt: new Date(story.createdAt), updatedAt: new Date(story.updatedAt) });
};
