import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { convertWatchFromServer, Watch } from '~/domains';

/**
 * watchを取得するSWR
 * @returns data watch
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useWatch = ({ userId, storyId }: { userId: string; storyId: string }): SWRResponse<Watch | null, Error> => {
  return useSWR('/watches', (endpoint: string) =>
    restClient
      .apiGet<Watch | null>(endpoint, { userId, storyId })
      .then((result) => (result.data ? convertWatchFromServer(result.data) : null)),
  );
};
