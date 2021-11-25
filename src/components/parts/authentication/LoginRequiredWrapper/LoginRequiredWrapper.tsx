import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Box } from '@mui/system';
import { URLS } from '~/constants';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { CircularProgress } from '~/components/parts/commons/CircularProgress';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const { data: currentUser, isValidating } = useCurrentUser();
  const router = useRouter();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    if (!isValidating && !currentUser) {
      notifyErrorMessage('ログインが必要です');
      router.push(URLS.TOP);
    }
  }, [isValidating, currentUser, notifyErrorMessage, router]);

  if (typeof window !== 'undefined' && isValidating)
    return (
      <Box textAlign="center" pt="40px">
        <CircularProgress />
      </Box>
    );

  if (currentUser) {
    return <>{children}</>;
  }

  return (
    <Box textAlign="center" pt="40px">
      <CircularProgress />
    </Box>
  );
};
