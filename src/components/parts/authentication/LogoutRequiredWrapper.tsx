import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { Box } from '@mui/system';
import { URLS } from '~/constants';
import { CircularProgress } from '~/components/parts/commons/CircularProgress';

export const LogoutRequiredWrapper: FC = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(URLS.TOP);
    }
  }, [status]);

  if (typeof window !== 'undefined' && status === 'loading')
    return (
      <Box textAlign="center" pt="40px">
        <CircularProgress />
      </Box>
    );

  if (status === 'unauthenticated') {
    return <>{children}</>;
  }

  return (
    <Box textAlign="center" pt="40px">
      <CircularProgress />
    </Box>
  );
};
