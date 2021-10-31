import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Typography } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const DashboardSettingsPage: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            設定
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardSettingsPage.getLayout = getLayout;
export default DashboardSettingsPage;
