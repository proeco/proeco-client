import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { useErrorNotification } from '../useErrorNotification';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { auth, googleAuthProvider } from '~/libs/firebase';
import { restClient } from '~/utils/rest-client';
import { URLS } from '~/constants';

export const useAuth = () => {
  const router = useRouter();
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const { notifyErrorMessage } = useErrorNotification();

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
        router.push(URLS.DASHBOARD_SETTINGS);
      })
      .catch((e) => {
        notifyErrorMessage(e.message);
      });
  };

  const logout = () => {
    auth.signOut().then(() => {
      destroyCookie(null, 'access-token');
      mutateCurrentUser();
      router.push(URLS.TOP);
    });
  };

  return { login, logout };
};
