import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import { Team } from '~/domains';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

import { TextField, Card, Typography, Button, Icon } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { restClient } from '~/utils/rest-client';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

const DashboardTeamPage: ProecoNextPage = () => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();
  const router = useRouter();

  const [team, setTeam] = useState<Pick<Team, 'name' | 'description'>>({
    name: '',
    description: '',
  });

  const handleClickCreateNewTeam = async () => {
    try {
      await restClient.apiPost('/teams', { team: team });
      notifySuccessMessage('チームを作成しました');
      router.push('/dashboard/teams');
    } catch (error) {
      notifyErrorMessage('チームの作成に失敗しました');
    }
  };

  const updateStoryForm = (newObject: Partial<Team>) => {
    setTeam((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

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
          <TextField fullWidth multiline value={team.name} onChange={(e) => updateStoryForm({ name: e.target.value })} />
          <Typography mt={2} mb={1} variant="body1" color="textColor.light">
            説明
          </Typography>
          <TextField fullWidth multiline value={team.description} rows={4} onChange={(e) => updateStoryForm({ description: e.target.value })} />
          <Box mt={4} textAlign="center">
            <Button color="primary" variant="contained" startIcon={<Icon icon="CreateOutlined" width="20px" />} onClick={handleClickCreateNewTeam}>
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
