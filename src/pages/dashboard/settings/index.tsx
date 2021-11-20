import { Box } from '@mui/system';
import { useEffect, useState, ReactNode } from 'react';
import { Button, Icon, Paper, TextField, Typography } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { User } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { restClient } from '~/utils/rest-client';

const DashboardSettingsPage: ProecoNextPage = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [newUser, setNewUser] = useState<Pick<User, 'name' | 'description'>>({
    name: '',
    description: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isValidForm, setIsValidForm] = useState(true);

  const { notifyErrorMessage } = useErrorNotification();
  const { notifySuccessMessage } = useSuccessNotification();

  useEffect(() => {
    if (currentUser) {
      setNewUser({
        name: currentUser.name,
        description: currentUser.description,
      });
    }
  }, [currentUser]);

  const updateUserForm = (newObject: Partial<User>) => {
    setNewUser((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const handleClickCreateNewTeam = async () => {
    setIsUpdating(true);
    try {
      const { data } = await restClient.apiPut<User>('/users', { ...newUser });
      notifySuccessMessage('チームを作成しました');
      mutateCurrentUser(data, false);
      setIsUpdating(false);
    } catch (error) {
      notifyErrorMessage('チームの作成に失敗しました');
    }
  };

  useEffect(() => {
    setIsValidForm(newUser.name.trim() !== '');
  }, [newUser]);

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
        <Paper>
          <Box mb="16px">
            <Typography mb="4px" variant="body1" color="textColor.light">
              ユーザー名
            </Typography>
            <TextField fullWidth value={newUser?.name} onChange={(e) => updateUserForm({ name: e.target.value })} />
          </Box>
          <Box mb="16px">
            <Typography mb="4px" variant="body1" color="textColor.light">
              自己紹介
            </Typography>
            <TextField fullWidth multiline rows={4} value={newUser?.description} onChange={(e) => updateUserForm({ description: e.target.value })} />
          </Box>
          <Box mt={4} textAlign="center">
            <Button
              disabled={isUpdating || !isValidForm}
              color="primary"
              variant="contained"
              startIcon={<Icon icon="Update" width="20px" />}
              onClick={handleClickCreateNewTeam}
            >
              更新する
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardSettingsPage.getLayout = getLayout;
export default DashboardSettingsPage;
