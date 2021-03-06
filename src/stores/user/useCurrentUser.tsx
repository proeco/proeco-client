import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { User, convertUserFromServer } from '~/domains';

/**
 * 現在ログイン中のユーザーを取得するSWR
 * @returns data ログイン中のユーザー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useCurrentUser = (): SWRResponse<User | null, Error> => {
  return useSWR('/users/me', (endpoint: string) =>
    restClient.apiGet<User | null>(endpoint).then((result) => (result.data ? convertUserFromServer(result.data) : null)),
  );
};
