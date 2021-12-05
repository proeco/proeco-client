import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

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
export const useTeams = ({ page = 1, limit = 10 }: { page: number; limit?: 10 }): SWRResponse<PaginationResult<Team>, Error> => {
  return useImmutableSWR(`/teams?page=${page}&limit=${limit}`, (endpoint: string) =>
    restClient.apiGet<PaginationResult<Team>>(endpoint).then((result) => result.data),
  );
};
