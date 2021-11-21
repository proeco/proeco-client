import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Box } from '@mui/system';
import { URLS } from '~/constants';
import { CircularProgress } from '~/components/parts/commons/CircularProgress';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const LogoutRequiredWrapper: FC = ({ children }) => {
  const { data: currentUser, isValidating } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isValidating && currentUser) {
      router.push(URLS.TOP);
    }
  }, [isValidating, currentUser, router]);

  if (typeof window !== 'undefined' && isValidating)
    return (
      <Box textAlign="center" pt="40px">
        <CircularProgress />
      </Box>
    );

  if (!currentUser) {
    return <>{children}</>;
  }

  return (
    <Box textAlign="center" pt="40px">
      <CircularProgress />
    </Box>
  );
};
