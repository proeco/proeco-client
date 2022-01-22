type NotificationType = 'FETCH_REACTION' | 'SYSTEM_NOTIFICATION';

export class Notification {
  _id: string;
  type: NotificationType;
  createdUserId?: string;
  targetUserId: string;
  message: string;
  url?: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(init: Notification) {
    this._id = init._id;
    this.type = init.type;
    this.createdUserId = init.createdUserId;
    this.targetUserId = init.targetUserId;
    this.message = init.message;
    this.url = init.url;
    this.isChecked = init.isChecked;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
