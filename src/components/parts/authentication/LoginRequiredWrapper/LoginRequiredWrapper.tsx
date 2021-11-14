import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Box } from '@mui/system';
import { URLS } from '~/constants';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { CircularProgress } from '~/components/parts/commons/CircularProgress';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    if (status === 'unauthenticated') {
      notifyErrorMessage('ログインが必要です');
      router.push(URLS.TOP);
    }
  }, [status]);

  if (typeof window !== 'undefined' && status === 'loading')
    return (
      <Box textAlign="center" pt="40px">
        <CircularProgress />
      </Box>
    );

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return (
    <Box textAlign="center" pt="40px">
      <CircularProgress />
    </Box>
  );
};
