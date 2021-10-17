import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { Box } from '@mui/system';
import { COLORS, URLS } from '~/constants';

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
        <Loader type="Oval" color={COLORS.PRIMARY} height={100} width={100} />
      </Box>
    );

  if (session == null) {
    return <>{children}</>;
  }

  return (
    <Box textAlign="center" pt="40px">
      <Loader type="Oval" color={COLORS.PRIMARY} height={100} width={100} />
    </Box>
  );
};
