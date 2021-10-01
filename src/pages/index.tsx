import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/client';

import { Container } from '@mui/material';
import { Button, Typography } from '~/components/parts/commons/atoms';

const Home: NextPage = () => {
  const [session] = useSession();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Typography variant="h1">Top Page</Typography>
      {session ? (
        <>
          <Typography variant="h3">Hello {session.user?.name}!</Typography>
          <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={() => signOut()}>
            Logout
          </Button>
        </>
      ) : (
        <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={() => signIn('google')}>
          Login
        </Button>
      )}
    </Container>
  );
};

export default Home;
