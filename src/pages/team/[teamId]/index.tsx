import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Dashboard: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            ダッシュボード
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <TeamDashboardLayout>{page}</TeamDashboardLayout>;

Dashboard.getLayout = getLayout;
export default Dashboard;