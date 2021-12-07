import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Dashboard: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            ユーザーページ
          </Typography>
        </Box>
        TBD
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

Dashboard.getLayout = getLayout;
export default Dashboard;
