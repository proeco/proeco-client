import React, { VFC, ReactNode, createContext } from 'react';
import { User } from '~/domains';
import { useAuthenticationSWR } from '~/stores/useAuthenticationSWR';

import { restClient } from '~/utils/rest-client';

export const CurrentUserContext = createContext<{
  currentUser: User | undefined;
}>({
  currentUser: undefined,
});

export const CurrentUserProvider: VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const { data: currentUser, isValidating } = useAuthenticationSWR('/users/me', (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  if (isValidating) return null;

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>;
};
