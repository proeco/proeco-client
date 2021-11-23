import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { Button, Icon, Link, Typography } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { URLS } from '~/constants';

import { useTeams } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';

const DashboardTeamPage: ProecoNextPage = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { data: teams } = useTeams({
    userId: currentUser?._id,
  });

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="Group" width={32} />
            チームリスト
          </Typography>
          <Link href={URLS.DASHBOARD_TEAMS_NEW}>
            <Button color="primary" variant="contained" startIcon={<Icon icon="CreateOutlined" width="20px" />}>
              新規チームを作成する
            </Button>
          </Link>
        </Box>
        <Grid container rowSpacing="20px" columnSpacing="20px">
          {teams ? (
            teams.map((team) => (
              <Grid key={team._id} item xs={12} sm={6}>
                <TeamCard
                  name={team.name}
                  description={team.description}
                  attachmentId={team.iconImageId}
                  onClick={() => router.push(`/team/${team._id}/dashboard`)}
                />
              </Grid>
            ))
          ) : (
            <SkeltonTeamCard />
          )}
        </Grid>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;
