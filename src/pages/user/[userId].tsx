import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { Link, Typography } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { User } from '~/domains';
import { restClient } from '~/utils/rest-client';
import { useTeamsRelatedUser } from '~/stores/team';
import { SkeltonTeamCard, TeamCard } from '~/components/domains/team/TeamCard/TeamCard';
import { URLS } from '~/constants';

type Props = {
  user: User;
};

const Dashboard: ProecoNextPage<Props> = ({ user }) => {
  const { data: teamsRelatedUser } = useTeamsRelatedUser({ userId: user._id });

  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box display="flex" alignItems="flex-start" gap="16px" mb="48px">
          <UserIcon attachmentId={user.iconImageId} size={120} userId={user._id} />
          <Box pt="8px">
            <Typography variant="h3" marginBottom="16px" bold>
              {user.name}
            </Typography>
            <Typography>{user.description}</Typography>
          </Box>
        </Box>
        <Typography variant="h4" bold textAlign="center" mb="20px">
          所属チームリスト
        </Typography>
        <Grid container maxWidth="900px" mx="auto">
          {teamsRelatedUser ? (
            teamsRelatedUser.map((team) => (
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;

  try {
    const { data: user } = await restClient.apiGet<User>(`/users/${userId}`);

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return { props: { user } };
  } catch (error) {
    return { props: {} };
  }
};

Dashboard.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
