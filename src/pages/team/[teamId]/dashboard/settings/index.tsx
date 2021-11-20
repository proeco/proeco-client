import { Box } from '@mui/system';

import { ReactNode } from 'react';
import { Icon, Paper, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';

const StoryList: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="Settings" width={32} />
            設定
          </Typography>
        </Box>
        <Paper>TBD</Paper>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <TeamDashboardLayout>{page}</TeamDashboardLayout>;
StoryList.getLayout = getLayout;

export default StoryList;
