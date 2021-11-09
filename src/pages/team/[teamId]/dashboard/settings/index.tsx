import { Box } from '@mui/system';

import { ReactNode } from 'react';
import { Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';

const StoryList: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Typography variant="h3" bold>
          設定
        </Typography>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <TeamDashboardLayout>{page}</TeamDashboardLayout>;
StoryList.getLayout = getLayout;

export default StoryList;
