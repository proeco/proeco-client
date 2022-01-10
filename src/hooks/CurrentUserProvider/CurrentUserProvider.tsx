import { createContext, FC, ReactNode, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { destroyCookie, setCookie } from 'nookies';
import { useSession } from 'next-auth/react';
import { convertUserFromServer, User } from '~/domains';
import { restClient } from '~/utils/rest-client';
import { Spinner } from '~/components/parts/commons';

export const CurrentUserContext = createContext<{
  currentUser: User | null;
  mutateCurrentUser: () => void;
}>({
  currentUser: null,
  mutateCurrentUser: () => void 0,
});

export const useCurrentUser = (): {
  currentUser: User | null;
  mutateCurrentUser: () => void;
} => {
  const { currentUser, mutateCurrentUser } = useContext(CurrentUserContext);

  if (currentUser === undefined) {
    throw new Error('ログイン情報の取得に失敗しました');
  }

  return { currentUser, mutateCurrentUser };
};

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  const { data: currentUser, mutate: mutateCurrentUser } = useSWR('/users/me', (endpoint: string) =>
    restClient.apiGet<User | null>(endpoint).then((result) => (result.data ? convertUserFromServer(result.data) : null)),
  );

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.accessToken) {
      destroyCookie(null, 'access-token');
      mutateCurrentUser();
      return;
    }

    setCookie(null, 'access-token', session?.accessToken as string, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    mutateCurrentUser();
  }, [mutateCurrentUser, session?.accessToken, status]);

  if (currentUser === undefined) {
    return (
      <div className="mt-5 text-center">
        <Spinner />
      </div>
    );
  }

  return <CurrentUserContext.Provider value={{ currentUser, mutateCurrentUser }}>{children}</CurrentUserContext.Provider>;
};
