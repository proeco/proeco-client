import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Attachment, convertAttachmentFromServer } from '~/domains';

/**
 * Attachmentを取得するSWR
 * @params attachmentId 取得対象のファイルID
 * @returns data Attachment
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useAttachment = (attachmentId?: Attachment['_id']): SWRResponse<Attachment, Error> => {
  const key = attachmentId ? `/attachments/${attachmentId}` : null;

  return useImmutableSWR(key, (endpoint: string) =>
    restClient.apiGet<Attachment>(endpoint).then((result) => convertAttachmentFromServer(result.data)),
  );
};
