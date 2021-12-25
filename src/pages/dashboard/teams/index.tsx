import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { Button, Icon, Link } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { URLS } from '~/constants';

import { useTeamsRelatedUser } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';

const DashboardTeamPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: teams } = useTeamsRelatedUser({
    userId: currentUser?._id,
  });

  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <h2 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Icon icon="PEOPLE" size={32} />
            チームリスト
          </h2>
          <Link href={URLS.DASHBOARD_TEAMS_NEW}>
            <Button color="primary">
              <Icon icon="PENCIL" size={20} color="WHITE" />
              新規チームを作成する
            </Button>
          </Link>
        </Box>
        <Grid container>
          {teams ? (
            teams.map((team) => (
              <Grid key={`my-teams-${team._id}`} item xs={12} sm={6} md={4} px={1} pb={2}>
                <Link href={URLS.TEAMS(team.productId)}>
                  <TeamCard
                    name={team.name}
                    productId={team.productId}
                    description={team.description}
                    attachmentId={team.iconImageId}
                    url={team.url}
                    isLink
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4} px={1}>
                <SkeltonTeamCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4} px={1}>
                <SkeltonTeamCard />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

DashboardTeamPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
DashboardTeamPage.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default DashboardTeamPage;
