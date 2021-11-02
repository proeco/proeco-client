import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Team } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数チームを取得するSWR
 * @returns data チームリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeams = ({ userId }: { userId?: string; page: number; limit: 10 }): SWRResponse<PaginationResult<Team>, Error> => {
  const key = userId ? `/teams?userId=${userId}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
