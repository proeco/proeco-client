import { FC, createContext } from 'react';
import { User } from '~/domains';
// import { auth } from '~/libs/firebase';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

type AuthContextProps = {
  currentUser: User | undefined;
  isValidating: boolean;
};

const CurrentUserContext = createContext<AuthContextProps>({ currentUser: undefined, isValidating: true });

const AuthProvider: FC = ({ children }) => {
  const { data: currentUser, isValidating } = useCurrentUser();

  return <CurrentUserContext.Provider value={{ currentUser, isValidating }}>{children}</CurrentUserContext.Provider>;
};

export { CurrentUserContext, AuthProvider };
