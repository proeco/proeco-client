import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { destroyCookie, setCookie } from 'nookies';
import { useSession } from 'next-auth/react';
import { convertUserFromServer, User } from '~/domains';
import { restClient } from '~/utils/rest-client';
import { Spinner } from '~/components/parts/commons';

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

export const CurrentUserContext = createContext<{
  currentUser: User | null;
  mutateCurrentUser: () => void;
}>({
  currentUser: null,
  mutateCurrentUser: () => void 0,
});

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const { data: currentUser, mutate } = useSWR(['/users/me', session?.accessToken], (endpoint: string) =>
    restClient.apiGet<User | null>(endpoint).then((result) => (result.data ? convertUserFromServer(result.data) : null)),
  );

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      destroyCookie(null, 'access-token');
      mutate();

      return;
    }

    setCookie(null, 'access-token', session?.accessToken as string, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    mutate();
  }, [mutate, session, status]);

  if (currentUser === undefined) {
    return (
      <div className="mt-5 text-center">
        <Spinner />
      </div>
    );
  }

  return <CurrentUserContext.Provider value={{ currentUser, mutateCurrentUser: mutate }}>{children}</CurrentUserContext.Provider>;
};
