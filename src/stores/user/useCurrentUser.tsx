// import { SWRResponse } from 'swr';

// import { restClient } from '~/utils/rest-client';
// import { User } from '~/domains/user';
// import { useAuthenticationSWR } from '~/stores/useAuthenticationSWR';

// /**
//  * 現在ログイン中のユーザーを取得するSWR
//  * @returns data ログイン中のユーザー
//  * @returns isValidating 取得中を表す boolean
//  * @returns error エラー
//  * @returns mutate データの更新関数
//  */
// export const useCurrentUser = (): SWRResponse<User, Error> => {
//   return useAuthenticationSWR('/users/me', (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: true,
//   });
// };

import { useContext } from 'react';
import { CurrentUserContext } from '~/contexts/CurrentUserProvider';

export const useCurrentUser = (): {
  currentUser: any;
} => {
  const { currentUser } = useContext(CurrentUserContext);

  return { currentUser };
};