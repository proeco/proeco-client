import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Button, Icon, Link, Typography } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { URLS } from '~/constants';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const DashboardTeamPage: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            チームリスト
          </Typography>
          <Link href={URLS.DASHBOARD_TEAMS_NEW}>
            <Button color="primary" variant="contained" startIcon={<Icon icon="CreateOutlined" width="20px" />}>
              新規チームを作成する
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;
