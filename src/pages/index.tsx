import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/client';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';
import { Button, Typography } from '~/components/parts/commons/atoms';

const Home: NextPage = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <ProecoOgpHead />
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
    </>
  );
};

export default Home;
