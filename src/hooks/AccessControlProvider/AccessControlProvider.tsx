import { useRouter } from 'next/router';
import { useEffect, FC } from 'react';
import { useErrorNotification } from '../useErrorNotification';
import { GetAccessControl } from '~/interfaces/accessControl';
import { useCurrentUser } from '~/hooks/CurrentUserProvider';

/**
 * AccessControlによってログイン状態をもとにリダイレクトを行う
 * @param getAccessControl
 * @returns
 */
export const AccessControlProvider: FC<{ getAccessControl: GetAccessControl }> = ({ getAccessControl, children }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    const control = async () => {
      const accessControl = getAccessControl();

      if (accessControl.loginRequired == null) return;

      if (accessControl.loginRequired === true && !currentUser) {
        notifyErrorMessage('ログインが必要です');
        router.push(accessControl.destination);
      }
      if (accessControl.loginRequired === false && currentUser) {
        router.push(accessControl.destination);
      }
    };
    control();
  }, [currentUser, getAccessControl, notifyErrorMessage, router]);

  return <>{children}</>;
};
