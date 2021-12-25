import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { convertStoryFromServer, Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStories = ({
  teamId,
  page,
  limit,
  isCompleted,
}: {
  teamId?: string;
  page: number;
  limit: number;
  isCompleted?: boolean;
}): SWRResponse<PaginationResult<Story>, Error> => {
  const key = `/stories?page=${page}&limit=${limit}${teamId ? '&teamId=' + teamId : ''}${
    isCompleted != null ? '&isCompleted=' + isCompleted : ''
  }`;
  return useSWR(
    key,
    (endpoint: string) =>
      restClient.apiGet<PaginationResult<Story>>(endpoint).then((result) => {
        return {
          ...result.data,
          docs: result.data.docs.map((doc) => {
            return convertStoryFromServer(doc);
          }),
        };
      }),
    { revalidateOnReconnect: true },
  );
};
