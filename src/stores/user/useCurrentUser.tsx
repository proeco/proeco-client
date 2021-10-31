import { SWRResponse } from 'swr';

import { useSession } from 'next-auth/client';
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
  const [session] = useSession();

  return useAuthenticationSWR('/users/me', () => session?.user as User, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
