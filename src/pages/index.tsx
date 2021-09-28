import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/client';

import { Button, Container } from '@mui/material';

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
      <h1>Top Page</h1>
      {session ? (
        <>
          <h3>Hello {session.user?.name}!</h3>
          <Button variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={() => signOut()}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={() => signIn('google')}>
          Login
        </Button>
      )}
    </Container>
  );
};

export default Home;
