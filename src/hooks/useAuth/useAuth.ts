import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { setCookie, destroyCookie } from 'nookies';
import { auth, googleAuthProvider } from '~/libs/firebase';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { restClient } from '~/utils/rest-client';

export const useAuth = () => {
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const login = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential?.accessToken) {
          return;
        }
        const { user } = result;

        restClient.apiPost('/users', {
          user: {
            uid: user.uid,
            image: user.photoURL,
            name: user.displayName,
            email: user.email,
            accessToken: credential.accessToken,
          },
        });

        setCookie(null, 'access-token', credential.accessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        mutateCurrentUser();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    auth.signOut().then(() => {
      destroyCookie(null, 'access-token');
      mutateCurrentUser();
    });
  };

  return { login, logout };
};
