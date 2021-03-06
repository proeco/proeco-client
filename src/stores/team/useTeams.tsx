import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { convertTeamFromServer, Team } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数チームを取得するSWR
 * @returns data チームリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeams = ({ page = 1, limit = 10 }: { page: number; limit?: 10 }): SWRResponse<PaginationResult<Team>, Error> => {
  return useSWR(`/teams?page=${page}&limit=${limit}`, (endpoint: string) =>
    restClient.apiGet<PaginationResult<Team>>(endpoint).then((result) => {
      return {
        ...result.data,
        docs: result.data.docs.map((doc) => {
          return convertTeamFromServer(doc);
        }),
      };
    }),
  );
};
