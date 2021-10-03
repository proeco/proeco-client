type TaskStatus = 'open' | 'inprogress' | 'paused' | 'completed';

export class StoryTask {
  _id: string;
  title: string;
  status: TaskStatus;
  storyId: string;
  createdUserId: string;
  startedAt: Date;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: StoryTask) {
    this._id = init._id;
    this.title = init.title;
    this.status = init.status;
    this.storyId = init.storyId;
    this.createdUserId = init.createdUserId;
    this.startedAt = init.startedAt;
    this.completedAt = init.completedAt;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
