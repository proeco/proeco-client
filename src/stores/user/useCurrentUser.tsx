import { SWRResponse } from 'swr';

import { apiClient } from '~/utils/rest-client';
import { User } from '~/domains/user';
import { useAuthenticationSWR } from '~/stores/useAuthenticationSWR';

/**
 * 現在ログイン中のユーザーを取得するSWR
 * @returns data ログイン中のユーザー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useAuthenticationSWR(apiClient.users.me, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
