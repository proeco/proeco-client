import { NextPage } from 'next';
import { signOut } from 'next-auth/react';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Button, Link, Typography } from '~/components/parts/commons';
import { URLS } from '~/constants';
import { useAuth } from '~/hooks/useAuth/useAuth';

const Home: NextPage = () => {
  const { currentUser } = useCurrentUser();
  const { login } = useAuth();

  return (
    <>
      <ProecoOgpHead />
      <Typography variant="h1" bold>
        Top Page
      </Typography>
      <Link href={URLS.DASHBOARD}>
        <Button color="primary" variant="contained">
          ダッシュボードへ
        </Button>
      </Link>
      {currentUser ? (
        <>
          <Typography variant="h3">Hello {currentUser.name}!</Typography>
          <img height="200px" width="200px" src={currentUser.image} />
          <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={() => signOut()}>
            Logout
          </Button>
        </>
      ) : (
        <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={login}>
          Login
        </Button>
      )}
    </>
  );
};

export default Home;
