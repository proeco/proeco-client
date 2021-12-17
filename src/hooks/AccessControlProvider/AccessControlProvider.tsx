import { useRouter } from 'next/router';
import { useEffect, FC } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Box } from '@mui/system';
import { useErrorNotification } from '../useErrorNotification';
import { GetAccessControl } from '~/interfaces/accessControl';
import { CircularProgress } from '~/components/parts/commons';

const accessControl = () => {
  throw new Error('getAccessControl が定義されていません。');
};

/**
 * AccessControlによってログイン状態をもとにリダイレクトを行う
 * @param getAccessControl
 * @returns
 */
export const AccessControlProvider: FC<{ getAccessControl?: GetAccessControl }> = ({ getAccessControl = accessControl, children }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    const control = async () => {
      if (isLoading) return;
      const accessControl = getAccessControl();

      if (accessControl.loginRequired == null) return;

      if (accessControl.loginRequired === true && !user) {
        notifyErrorMessage('ログインが必要です');
        router.push(accessControl.destination);
      } else if (accessControl.loginRequired === false && user) {
        router.push(accessControl.destination);
      }
    };
    control();
  }, [getAccessControl, isLoading, notifyErrorMessage, router, user]);

  if (isLoading) {
    return (
      <Box textAlign="center" pt="40px">
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};
