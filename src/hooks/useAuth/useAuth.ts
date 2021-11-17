import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { setCookie } from 'nookies';
import { auth, googleAuthProvider } from '~/libs/firebase';

export const useAuth = () => {
  const login = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential?.accessToken) {
          return;
        }

        setCookie(null, 'access-token', credential.accessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Logout = () => {
    auth.signOut().then(() => {
      window.location.reload();
    });
  };

  return { login, Logout };
};
