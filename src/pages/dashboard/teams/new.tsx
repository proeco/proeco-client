import { Box } from '@mui/system';
import { ReactNode } from 'react';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, Icon } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { URLS } from '~/constants';

const DashboardTeamPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="CreateOutlined" width={32} />
            新規チームを作成する
          </Typography>
        </Box>
        {currentUser && <TeamForm currentUser={currentUser} />}
      </Box>
    </>
  );
};

DashboardTeamPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
DashboardTeamPage.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default DashboardTeamPage;
