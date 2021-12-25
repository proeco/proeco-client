import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

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
export const useTeamsRelatedUser = ({ userId }: { userId?: string }): SWRResponse<Team[], Error> => {
  const key = userId ? `/teams/related-user?userId=${userId}` : null;
  return useImmutableSWR(
    key,
    (endpoint: string) =>
      restClient.apiGet<PaginationResult<Team>>(endpoint).then((result) => result.data.docs.map((v) => convertTeamFromServer(v))),
    {
      revalidateOnReconnect: true,
    },
  );
};
