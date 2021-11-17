import { FC, createContext, useEffect, useState } from 'react';
import { auth } from '~/libs/firebase';

type AuthContextProps = {
  currentUser: null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

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

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
