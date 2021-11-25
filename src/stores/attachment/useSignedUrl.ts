import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Attachment } from '~/domains';

/**
 * signedUrlを取得するSWR
 * @params attachmentId 取得対象のファイルID
 * @returns data attachmentUrl
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useSignedUrl = (attachmentId?: Attachment['_id']): SWRResponse<string, Error> => {
  const key = attachmentId ? `/attachments/${attachmentId}/signedUrl` : null;

  return useSWRImmutable(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data.signedUrl));
};
