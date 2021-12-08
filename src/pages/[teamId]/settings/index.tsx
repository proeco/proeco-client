import { Box } from '@mui/system';

import { ReactNode, useState, useEffect, ChangeEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Icon, IconUpload, Paper, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { Team } from '~/domains';
import { useTeam } from '~/stores/team';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

const TeamSettings: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const [newTeam, setNewTeam] = useState<Pick<Team, 'name' | 'productId' | 'url' | 'description'>>({
    productId: '',
    url: '',
    name: '',
    description: '',
  });

  const [isCreating, setIsCreating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
  const [isValidForm, setIsValidForm] = useState(true);

  const { data: team } = useTeam({ teamId: router.query.teamId as string });
  const { data: signedUrl } = useSignedUrl(team?.iconImageId);

  useEffect(() => {
    if (team) {
      setNewTeam(team);
    }
  }, [team]);
  console.log(team);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setIconImage(e.target.files[0]);
  };

  const updateStoryForm = (newObject: Partial<Team>) => {
    setNewTeam((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const handleClickCreateNewTeam = async () => {
    if (!currentUser) {
      return;
    }

    setIsCreating(true);

    // TODO implement
    // try {
    //   const params = new FormData();
    //   if (iconImage) {
    //     params.append('file', iconImage);
    //   }
    //   params.append('team', JSON.stringify(team));
    //   await restClient.apiPost('/teams', params, { 'Content-Type': 'multipart/form-data' });
    //   notifySuccessMessage('チームを作成しました');
    //   router.push('/dashboard/teams');
    //   setIsCreating(false);
    // } catch (error) {
    //   notifyErrorMessage('チームの作成に失敗しました');
    // }
  };

  useEffect(() => {
    setIsValidForm(newTeam.name.trim() !== '' && newTeam.description.trim() !== '');
  }, [newTeam]);

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
          <Typography mb={1} variant="body1" color="textColor.light">
            プロダクトの url
          </Typography>
          <TextField fullWidth multiline value={newTeam.url} onChange={(e) => updateStoryForm({ url: e.target.value })} />
          <Typography mt={2} mb={1} variant="body1" color="textColor.light">
            Product Id
          </Typography>
          <TextField fullWidth multiline value={newTeam.productId} onChange={(e) => updateStoryForm({ productId: e.target.value })} />
          <Typography mt={2} mb={1} variant="body1" color="textColor.light">
            名前
          </Typography>
          <TextField fullWidth multiline value={newTeam.name} onChange={(e) => updateStoryForm({ name: e.target.value })} />
          <Typography mt={2} mb={1} variant="body1" color="textColor.light">
            どんなプロダクト？
          </Typography>
          <TextField
            fullWidth
            multiline
            value={newTeam.description}
            rows={4}
            onChange={(e) => updateStoryForm({ description: e.target.value })}
          />
          <Box mt={4} textAlign="center">
            <Button
              disabled={isCreating || !isValidForm}
              color="primary"
              variant="contained"
              startIcon={<Icon icon="CreateOutlined" width="20px" />}
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
TeamSettings.getLayout = getLayout;

export default TeamSettings;
