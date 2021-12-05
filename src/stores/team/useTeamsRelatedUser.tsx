import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Team } from '~/domains';

/**
 * 複数チームを取得するSWR
 * @returns data チームリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeamsRelatedUser = ({ userId }: { userId?: string }): SWRResponse<Team[], Error> => {
  const key = userId ? `/teams/related-user?userId=${userId}` : null;
  return useImmutableSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data.docs), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
