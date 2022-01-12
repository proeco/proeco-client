import { createContext, FC, ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { destroyCookie, setCookie } from 'nookies';
import { useSession } from 'next-auth/react';
import { User } from '~/domains';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const CurrentUserContext = createContext<{
  currentUser?: User | null;
}>({
  currentUser: null,
});

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  const { data: accessToken, isValidating } = useSWR<string>(status === 'loading' ? null : session?.user?.email, () =>
    axios.get('/api/access-token').then((res) => res.data.accessToken),
  );
  const { data: currentUser, mutate } = useCurrentUser();

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

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>;
};
