import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { URLS } from '~/constants';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Dashboard: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          {/* <h3 variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="DashboardOutlined" width={32} />
            ホーム
          </h3> */}
        </Box>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Dashboard.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default Dashboard;
