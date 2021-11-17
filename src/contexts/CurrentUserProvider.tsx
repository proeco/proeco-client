import { FC, createContext, useEffect, useState } from 'react';
import { auth } from '~/libs/firebase';

type AuthContextProps = {
  currentUser: null | undefined;
};

const CurrentUserContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  const fetchCurrentUser = async () => {
    auth.onAuthStateChanged(async (authUser) => {
      console.log(15, authUser);
      // Onn のユーザーデータが存在するかを確認する
      if (authUser) {
        setCurrentUser(authUser);
      }
    });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>;
};

export { CurrentUserContext, AuthProvider };
