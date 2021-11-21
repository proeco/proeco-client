import { Box } from '@mui/system';
import { ReactNode, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Team } from '~/domains';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

import { TextField, Typography, Button, Icon, Paper } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { restClient } from '~/utils/rest-client';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

const DashboardTeamPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
  const [isValidForm, setIsValidForm] = useState(true);
  const [team, setTeam] = useState<Pick<Team, 'name' | 'description'>>({
    name: '',
    description: '',
  });

  const handleClickCreateNewTeam = async () => {
    if (!currentUser) {
      return;
    }

    setIsCreating(true);
    try {
      const params = new FormData();
      if (iconImage) {
        params.append('file', iconImage);
      }
      params.append('team', JSON.stringify(team));
      await restClient.apiPost('/teams', params, { 'Content-Type': 'multipart/form-data' });
      notifySuccessMessage('チームを作成しました');
      router.push('/dashboard/teams');
      setIsCreating(false);
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

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setIconImage(e.target.files[0]);
  };

  useEffect(() => {
    setIsValidForm(team.name.trim() !== '' && team.description.trim() !== '');
  }, [team]);

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
        <Paper square>
          <input type="file" name="image" onChange={handleChangeFile} accept="image/*" />
          <Typography mb="4px" variant="body1" color="textColor.light">
            名前
          </Typography>
          <TextField fullWidth multiline value={team.name} onChange={(e) => updateStoryForm({ name: e.target.value })} />
          <Typography mt={2} mb={1} variant="body1" color="textColor.light">
            どんなプロダクト？
          </Typography>
          <TextField fullWidth multiline value={team.description} rows={4} onChange={(e) => updateStoryForm({ description: e.target.value })} />
          <Box mt={4} textAlign="center">
            <Button
              disabled={isCreating || !isValidForm}
              color="primary"
              variant="contained"
              startIcon={<Icon icon="CreateOutlined" width="20px" />}
              onClick={handleClickCreateNewTeam}
            >
              新規チームを作成する
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardTeamPage.getLayout = getLayout;
export default DashboardTeamPage;
