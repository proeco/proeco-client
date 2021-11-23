import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Attachment } from '~/domains';

/**
 * signedUrlを複数取得するSWR
 * @params fileIds 取得対象のファイルID
 * @returns data signedUrls
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useSignedUrls = (fileIds?: Array<Attachment['_id']>): SWRResponse<string[], Error> => {
  return useSWR(
    fileIds || null,
    (fileIds: string[]) => {
      return Promise.all(
        fileIds.map(async (fileId) => {
          const result = await restClient.apiGet(`/files/${fileId}`);
          return result.data;
        }),
      );
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
