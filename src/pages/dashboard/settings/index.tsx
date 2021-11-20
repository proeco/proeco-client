import { Box } from '@mui/system';
import { useEffect, useState, ReactNode } from 'react';
import { Paper, TextField, Typography } from '~/components/parts/commons';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { User } from '~/domains';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

const DashboardSettingsPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const [nerUser, setNewUser] = useState<Pick<User, 'name' | 'description'>>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (currentUser) {
      setNewUser(currentUser);
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

  return (
    <>
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" bold>
            設定
          </Typography>
        </Box>
        <Paper>
          <Box mb="16px">
            <Typography mb="4px" variant="body1" color="textColor.light">
              ユーザー名
            </Typography>
            <TextField fullWidth value={nerUser?.name} onChange={(e) => updateUserForm({ name: e.target.value })} />
          </Box>
          <Box mb="16px">
            <Typography mb="4px" variant="body1" color="textColor.light">
              自己紹介
            </Typography>
            <TextField fullWidth multiline rows={4} value={nerUser?.description} onChange={(e) => updateUserForm({ description: e.target.value })} />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

DashboardSettingsPage.getLayout = getLayout;
export default DashboardSettingsPage;
