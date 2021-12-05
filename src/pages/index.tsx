import { NextPage } from 'next';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Button, Link, Typography } from '~/components/parts/commons';
import { URLS } from '~/constants';
import { useAuth } from '~/hooks/useAuth/useAuth';
import { UserIcon } from '~/components/domains/user/UserIcon';

const Home: NextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { login, logout } = useAuth();

  return (
    <>
      <ProecoOgpHead />
      <Typography variant="h1" bold>
        Top Page
      </Typography>
      <Link href={URLS.DASHBOARD}>
        <Button color="primary" variant="contained">
          ホームへ
        </Button>
      </Link>
      {currentUser ? (
        <>
          <Typography variant="h3">Hello {currentUser.name}!</Typography>
          <UserIcon size={200} userId={currentUser._id} attachmentId={currentUser.iconImageId} />
          <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={login}>
          Login
        </Button>
      )}
      <Typography variant="h1" align="center" bold my={1}>
        プロダクト一覧
      </Typography>
    </>
  );
};

export default Home;
