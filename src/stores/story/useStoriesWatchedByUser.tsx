import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { convertStoryFromServer, Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * userがwatchしている複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoriesWatchedByUser = ({ userId }: { userId?: string }): SWRResponse<Story[], Error> => {
  const key = userId ? `/stories/watched-by-user?userId=${userId}` : null;
  return useSWR(
    key,
    (endpoint: string) =>
      restClient.apiGet<PaginationResult<Story>>(endpoint).then((result) => result.data.docs.map((v) => convertStoryFromServer(v))),
    { revalidateOnReconnect: true },
  );
};
