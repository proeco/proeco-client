import { Box } from '@mui/system';
import { useEffect, useState, ReactNode, ChangeEvent } from 'react';
import { Button, Icon, IconUpload, Paper, TextField, Typography } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { User } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { restClient } from '~/utils/rest-client';

const DashboardSettingsPage: ProecoNextPage = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [newUser, setNewUser] = useState<Pick<User, 'name' | 'description'>>({
    name: '',
    description: '',
  });
  const { data: signedUrl } = useSignedUrl(currentUser?.iconImageId);
  const [isUpdating, setIsUpdating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
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

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setIconImage(e.target.files[0]);
  };

  const handleClickCreateNewTeam = async () => {
    setIsUpdating(true);
    try {
      const params = new FormData();
      if (iconImage) {
        params.append('file', iconImage);
      }
      params.append('newUser', JSON.stringify(newUser));
      const { data } = await restClient.apiPut<User>('/users', params, { 'Content-Type': 'multipart/form-data' });
      notifySuccessMessage('ユーザー情報更新しました');
      mutateCurrentUser(data, false);
      setIsUpdating(false);
    } catch (error) {
      notifyErrorMessage('ユーザー情報の更新に失敗しました');
    }
  };

  useEffect(() => {
    setIsValidForm(newUser.name.trim() !== '');
  }, [newUser]);

  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="Settings" width={32} />
            設定
          </Typography>
        </Box>
        <Paper>
          <Box display="flex" justifyContent="center">
            <IconUpload onSelectImage={handleChangeFile} currentImagePath={iconImage ? URL.createObjectURL(iconImage) : signedUrl} />
          </Box>
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
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newUser?.description}
              onChange={(e) => updateUserForm({ description: e.target.value })}
            />
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

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

DashboardSettingsPage.getLayout = getLayout;
export default DashboardSettingsPage;
