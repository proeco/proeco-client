import useSWR, { SWRResponse } from 'swr';
import { User } from '~/domains';
import { createMockUser } from '~/mock';

/**
 * チームに所属しているUserを取得するSWR
 * @returns data 所属しているUser
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeamUsers = ({ teamId }: { teamId?: string }): SWRResponse<User[], Error> => {
  const key = teamId ? `/teams?teamId=${teamId}` : null;
  //mockの部分は、teamに所属するユーザーを取得するapiに書き換える
  return useSWR(key, () => [createMockUser({ image: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' })], {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
