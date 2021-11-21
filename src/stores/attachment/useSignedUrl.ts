import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Attachment } from '~/domains';

/**
 * signedUrlを取得するSWR
 * @params fileId 取得対象のファイルID
 * @returns data signedUrl
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useSignedUrl = (fileId?: Attachment['_id']): SWRResponse<string, Error> => {
  const key = fileId ? `/files/${fileId}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
