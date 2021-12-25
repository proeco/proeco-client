import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { Box } from '@mui/system';

import { useTeams } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Link } from '~/components/parts/commons';
import { URLS } from '~/constants';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { TeamCard } from '~/components/domains/team/TeamCard';

import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';
import { useStories } from '~/stores/story';
import { SkeltonStoryCard, StoryCard } from '~/components/domains/story/StoryCard';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Home: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: teamList } = useTeams({ page: 1 });
  const { data: openStoryList } = useStories({ page: 1, limit: 100, isCompleted: false });

  return (
    <>
      <ProecoOgpHead />
      <h1 className="text-center fw-bold my-3">プロダクト一覧</h1>
      <Box mb={5}>
        <Grid container maxWidth="900px" mx="auto">
          {teamList ? (
            teamList.docs.map((team, index) => (
              <Grid item key={index} xs={12} sm={6} px={1} pb={2}>
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
      <h2 className="text-center fw-bold my-3">進行中のストーリー一覧</h2>
      <Box mb={5}>
        <Grid container maxWidth="900px" mx="auto">
          {openStoryList ? (
            openStoryList.docs.map((story, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4} px={1} pb={2}>
                  <StoryCard story={story} />
                </Grid>
              );
            })
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4} px={1}>
                <SkeltonStoryCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4} px={1}>
                <SkeltonStoryCard />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <h1 className="text-center fw-bold">Top Page</h1>
      <Link href={URLS.DASHBOARD_TEAMS}>所属チーム一覧</Link>
      {currentUser ? (
        <>
          <h3>Hello {currentUser.name}!</h3>
          <UserIcon size={200} userId={currentUser._id} attachmentId={currentUser.iconImageId} />
          <Link href={URLS.API_LOGOUT}>Logout</Link>
        </>
      ) : (
        <Link href={URLS.API_LOGIN}>Login</Link>
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <>{page}</>;

Home.getAccessControl = () => {
  return { loginRequired: null };
};

export default Home;
