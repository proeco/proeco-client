import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { TextField, Card, Typography, Button, Icon } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const DashboardTeamPage: ProecoNextPage = () => {
  const [teamName, setTeamName] = useState('');

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            新規チームを作成する
          </Typography>
        </Box>
        <Card square>
          <Typography mb="4px" variant="body1" color="textColor.light">
            名前
          </Typography>
          <TextField fullWidth multiline value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <Box mt={4} textAlign="center">
            <Button color="primary" variant="contained" startIcon={<Icon icon="CreateOutlined" width="20px" />}>
              新規チームを作成する
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;
