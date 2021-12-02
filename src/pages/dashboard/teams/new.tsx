import { Box } from '@mui/system';
import { ReactNode } from 'react';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, Icon } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamFormPaper } from '~/components/domains/team/TeamFormPaper';

const DashboardTeamPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="CreateOutlined" width={32} />
            新規チームを作成する
          </Typography>
        </Box>
        {currentUser && <TeamFormPaper currentUser={currentUser} />}
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;
