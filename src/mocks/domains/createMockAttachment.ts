import { Attachment } from '~/domains';

/**
 * mockしたAttachmentを生成するための関数
 * @param mock Attachmentオブジェクトの一部
 * @returns 生成したAttachment
 */
export const createMockAttachment = (mock: Partial<Attachment> = {}): Attachment => {
  return new Attachment({
    _id: mock._id || 'attachment1',
    name: mock.name || 'name',
    size: mock.size || 100,
    filePath: mock.filePath || 'filePath',
    createdUserId: mock.createdUserId || 'user1',
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
