export class Watch {
  _id: string;
  createdUserId: string;
  targetStoryId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Watch) {
    this._id = init._id;
    this.createdUserId = init.createdUserId;
    this.targetStoryId = init.targetStoryId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}

/**
 * サーバーから返ってくる日付データをDate型に変換する
 * @param watch
 * @returns {Watch}
 */
export const convertWatchFromServer = (watch: Watch) => {
  return new Watch({
    ...watch,
    createdAt: new Date(watch.createdAt),
    updatedAt: new Date(watch.updatedAt),
  });
};
