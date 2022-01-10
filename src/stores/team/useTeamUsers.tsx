import { SWRResponse } from 'swr';
import useSWR from 'swr/immutable';

import { convertUserFromServer, User } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { restClient } from '~/utils/rest-client';

/**
 * チームに所属しているUserを取得するSWR
 * @returns data 所属しているUser
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeamUsers = ({ teamId }: { teamId?: string }): SWRResponse<User[], Error> => {
  const key = teamId ? `/teams/${teamId}/users` : null;
  return useSWR(
    key,
    (endpoint: string) =>
      restClient.apiGet<PaginationResult<User>>(endpoint).then((result) => result.data.docs.map((v) => convertUserFromServer(v))),
    { revalidateOnReconnect: true },
  );
};
