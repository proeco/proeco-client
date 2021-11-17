import { signInWithPopup } from '@firebase/auth';
import { auth, googleAuthProvider } from '~/libs/firebase';

export const useAuth = () => {
  const login = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result);

        // setCredential(result);
        // setState('logined');
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
