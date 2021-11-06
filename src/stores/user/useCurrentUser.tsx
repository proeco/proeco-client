import { useContext } from 'react';
import { CurrentUserContext } from '~/components/parts/authentication/CurrentUserProvider/CurrentUserProvider';
import { User } from '~/domains';

/**
 * 現在ログイン中のユーザーを取得するSWR
 * @returns currentUser ログイン中のユーザー
 */
export const useCurrentUser = (): {
  currentUser: User;
} => {
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser === undefined) {
    throw new Error('ログイン情報の取得に失敗しました');
  }

  return { currentUser };
};
