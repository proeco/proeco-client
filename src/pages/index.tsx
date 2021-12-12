import { NextPage } from 'next';

import { Grid } from '@mui/material';

import { Box } from '@mui/system';
import { useTeams } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Button, Link, Typography } from '~/components/parts/commons';
import { URLS } from '~/constants';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { TeamCard } from '~/components/domains/team/TeamCard';

import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';

const Home: NextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: teamList } = useTeams({ page: 1 });

  return (
    <>
      <ProecoOgpHead />
      <Typography variant="h1" align="center" bold my={1}>
        プロダクト一覧
      </Typography>
      <Box mb={5}>
        <Grid container maxWidth="900px" mx="auto">
          {teamList ? (
            teamList.docs.map((team) => (
              <Grid item key={`top-${team._id}`} xs={12} sm={6} px={1} pb={2}>
                <Link href={URLS.TEAMS(team.productId)}>
                  <TeamCard
                    name={team.name}
                    productId={team.productId}
                    description={team.description}
                    attachmentId={team.iconImageId}
                    url={team.url}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <>
              <Grid item xs={12} sm={6} px={1}>
                <SkeltonTeamCard />
              </Grid>
              <Grid item xs={12} sm={6} px={1}>
                <SkeltonTeamCard />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
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
          <Link href={URLS.API_LOGOUT}>
            <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }}>
              Logout
            </Button>
          </Link>
        </>
      ) : (
        <Link href={URLS.API_LOGIN}>
          <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }}>
            Login
          </Button>
        </Link>
      )}
    </>
  );
};

export default Home;
