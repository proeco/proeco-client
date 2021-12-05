import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数チームを取得するSWR
 * @returns data チームリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeams = ({
  teamId,
  page = 1,
  limit = 10,
}: {
  teamId?: string;
  page: number;
  limit?: 10;
}): SWRResponse<PaginationResult<Story>, Error> => {
  const key = teamId ? `/teams&page=${page}&limit=${limit}` : null;
  return useSWRImmutable(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data));
};
