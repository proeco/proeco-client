import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Box } from '@mui/system';
import { URLS } from '~/constants';
import { CircularProgress } from '~/components/parts/commons/atoms';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session != null) {
      router.push(URLS.TOP);
    }
  }, [loading, session]);

  if (typeof window !== 'undefined' && loading)
    return (
      <Box textAlign="center" pt="40px">
        <CircularProgress />
      </Box>
    );

  if (session == null) {
    return <>{children}</>;
  }

  return (
    <Box textAlign="center" pt="40px">
      <CircularProgress />
    </Box>
  );
};
