export class StoryPost {
  _id: string;
  content: string;
  storyId: string;
  createdUserId: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(init: StoryPost) {
    this._id = init._id;
    this.content = init.content;
    this.storyId = init.storyId;
    this.createdUserId = init.createdUserId;
    this.startedAt = init.startedAt;
    this.completedAt = init.completedAt;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}

export type UpdatableKey = 'content';

/**
 * サーバーから返ってくる日付データをDate型に変換する
 * @param storyPost
 * @returns {StoryPost}
 */
export const convertStoryPostFromServer = (storyPost: StoryPost) => {
  return new StoryPost({ ...storyPost, createdAt: new Date(storyPost.createdAt), updatedAt: new Date(storyPost.updatedAt) });
};
