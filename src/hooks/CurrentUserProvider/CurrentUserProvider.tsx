import { createContext, FC, ReactNode, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import useImmutableSWR from 'swr/immutable';
import axios from 'axios';
import { destroyCookie, setCookie } from 'nookies';
import { User } from '~/domains';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const CurrentUserContext = createContext<{
  currentUser?: User | null;
}>({
  currentUser: null,
});

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isLoading } = useUser();
  const { data: accessToken, isValidating } = useImmutableSWR<string>(isLoading ? null : user?.email, () =>
    axios.get('/api/access-token').then((res) => res.data.accessToken),
  );
  const { data: currentUser, isValidating: isValidatingUser, mutate } = useCurrentUser();

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
  }, [user, accessToken, isValidating, mutate]);

  if (isLoading || isValidating || isValidatingUser) return null;

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>;
};
