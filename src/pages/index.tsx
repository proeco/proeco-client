import type { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/client';

import { Container } from '@mui/material';
import { Button, Typography } from '~/components/parts/commons/atoms';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

const Home: NextPage = () => {
  const { data: currentUser } = useCurrentUser();

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
      <Typography variant="h1" bold>
        Top Page
      </Typography>
      {currentUser ? (
        <>
          <Typography variant="h3">Hello {currentUser.name}!</Typography>
          <img height="200px" width="200px" src={currentUser.image} />
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
