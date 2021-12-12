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

import { useAuth } from '~/hooks/useAuth/useAuth';
import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';
import { useStories } from '~/stores/story';
import { SkeltonStoryCard, StoryCard } from '~/components/domains/story/StoryCard';

const Home: NextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { login, logout } = useAuth();
  const { data: teamList } = useTeams({ page: 1 });
  const { data: openStoryList } = useStories({ page: 1, limit: 10, isCompleted: false });

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
      <Typography variant="h2" align="center" bold my={1}>
        進行中のストーリー一覧
      </Typography>
      <Box mb={5}>
        <Grid container maxWidth="900px" mx="auto">
          {openStoryList ? (
            openStoryList.docs.map((story) => {
              return (
                <Grid item key={`top-${story._id}`} xs={12} sm={6} px={1} pb={2}>
                  <StoryCard story={story} isLink />
                </Grid>
              );
            })
          ) : (
            <>
              <Grid item xs={12} sm={6} px={1}>
                <SkeltonStoryCard />
              </Grid>
              <Grid item xs={12} sm={6} px={1}>
                <SkeltonStoryCard />
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
          <Button color="primary" variant="contained" sx={{ textTransform: 'none', marginTop: '160px' }} onClick={logout}>
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
