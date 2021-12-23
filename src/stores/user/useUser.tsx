import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { convertUserFromServer, User } from '~/domains';

/**
 * Userを取得するSWR
 * @returns data user
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useUser = ({ userId }: { userId?: string }): SWRResponse<User, Error> => {
  const key = userId ? `/users/${userId}` : null;
  return useImmutableSWR(key, (endpoint: string) => restClient.apiGet<User>(endpoint).then((result) => convertUserFromServer(result.data)));
};
