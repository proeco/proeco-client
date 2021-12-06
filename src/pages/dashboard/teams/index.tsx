import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { Button, Icon, Link, Typography } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { URLS } from '~/constants';

import { useTeamsRelatedUser } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';

const DashboardTeamPage: ProecoNextPage = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { data: teams } = useTeamsRelatedUser({
    userId: currentUser?._id,
  });

  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
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
        <Grid container>
          {teams ? (
            teams.map((team) => (
              <Grid key={team._id} item xs={12} sm={6} px={1} pb={2}>
                <TeamCard
                  name={team.name}
                  productId={team.productId}
                  description={team.description}
                  attachmentId={team.iconImageId}
                  url={team.url}
                  onClick={() => router.push(URLS.TEAMS(team._id))}
                />
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

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;
