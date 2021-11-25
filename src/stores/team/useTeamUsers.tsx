import useSWR, { SWRResponse } from 'swr';
import { User } from '~/domains';
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
  return useSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data.docs), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
