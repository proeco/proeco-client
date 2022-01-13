import { useRouter } from 'next/router';
import { useEffect, FC } from 'react';
import { useSession } from 'next-auth/react';
import { useErrorNotification } from '../useErrorNotification';
import { GetAccessControl } from '~/interfaces/accessControl';
import { Spinner } from '~/components/parts/commons';

/**
 * AccessControlによってログイン状態をもとにリダイレクトを行う
 * @param getAccessControl
 * @returns
 */
export const AccessControlProvider: FC<{ getAccessControl: GetAccessControl }> = ({ getAccessControl, children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    const control = async () => {
      if (status === 'loading') return;
      const accessControl = getAccessControl();

      if (accessControl.loginRequired == null) return;

      if (accessControl.loginRequired === true && !session) {
        notifyErrorMessage('ログインが必要です');
        router.push(accessControl.destination);
      } else if (accessControl.loginRequired === false && session) {
        router.push(accessControl.destination);
      }
    };
    control();
  }, [getAccessControl, notifyErrorMessage, router, session, status]);

  if (status === 'loading') {
    return (
      <div className="mt-5 text-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};
