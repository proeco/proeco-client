import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
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
}>({
  currentUser: null,
});

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  const { data: accessToken, isValidating } = useSWR<string>(status === 'loading' ? null : session?.user?.email, () =>
    axios.get('/api/access-token').then((res) => res.data.accessToken),
  );
  const { data: currentUser, mutate } = useSWR('/users/me', (endpoint: string) =>
    restClient.apiGet<User | null>(endpoint).then((result) => (result.data ? convertUserFromServer(result.data) : null)),
  );

  useEffect(() => {
    if (isValidating) return;

    if (!accessToken) {
      destroyCookie(null, 'access-token');
      mutate();

      return;
    }

    setCookie(null, 'access-token', accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    mutate();
  }, [accessToken, isValidating, mutate]);

  if (currentUser === undefined)
    return (
      <div className="mt-5 text-center">
        <Spinner />
      </div>
    );

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>;
};
