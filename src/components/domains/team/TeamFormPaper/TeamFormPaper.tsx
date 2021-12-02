import { useRouter } from 'next/router';
import { VFC, useState, ChangeEvent, useEffect } from 'react';

import { Box } from '@mui/system';
import { Attachment, Team, User } from '~/domains';
import { TextField, Typography, Button, Icon, Paper, IconUpload } from '~/components/parts/commons';
import { restClient } from '~/utils/rest-client';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { URLS } from '~/constants';

type Props = {
  currentUser: User;
};

export const TeamFormPaper: VFC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const [isCreating, setIsCreating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
  const [isValidForm, setIsValidForm] = useState(true);
  const [team, setTeam] = useState<Pick<Team, 'name' | 'productId' | 'url' | 'description'>>({
    productId: '',
    url: '',
    name: '',
    description: '',
  });

  const handleClickCreateNewTeam = async () => {
    if (!iconImage) return null;
    setIsCreating(true);
    try {
      const params = new FormData();
      params.append('file', iconImage);
      const { data: attachment } = await restClient.apiPost<Attachment>(`/attachments?path=${currentUser._id}/team-icons`, params, {
        'Content-Type': 'multipart/form-data',
      });
      await restClient.apiPost<Team>('/teams', { team: { ...team, iconImageId: attachment._id } });
      notifySuccessMessage('チームを作成しました');
      router.push(URLS.DASHBOARD_TEAMS);
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
    setIsValidForm(team.name.trim() !== '' && team.productId.trim() !== '' && team.productId.trim() !== '' && team.description.trim() !== '');
  }, [team]);

  return (
    <Paper square>
      <Box display="flex" justifyContent="center">
        <IconUpload onSelectImage={handleChangeFile} currentImagePath={iconImage ? URL.createObjectURL(iconImage) : undefined} />
      </Box>
      <Typography mb={1} variant="body1" color="textColor.light">
        プロダクトの url
      </Typography>
      <TextField fullWidth multiline value={team.url} onChange={(e) => updateStoryForm({ url: e.target.value })} />
      <Typography mt={2} mb={1} variant="body1" color="textColor.light">
        Product Id
      </Typography>
      <TextField fullWidth multiline value={team.productId} onChange={(e) => updateStoryForm({ productId: e.target.value })} />
      <Typography mt={2} mb={1} variant="body1" color="textColor.light">
        名前
      </Typography>
      <TextField fullWidth multiline value={team.name} onChange={(e) => updateStoryForm({ name: e.target.value })} />
      <Typography mt={2} mb={1} variant="body1" color="textColor.light">
        どんなプロダクト？
      </Typography>
      <TextField fullWidth multiline value={team.description} rows={4} onChange={(e) => updateStoryForm({ description: e.target.value })} />
      <Box mt={4} textAlign="center">
        <Button
          disabled={isCreating || !isValidForm || !iconImage}
          color="primary"
          variant="contained"
          startIcon={<Icon icon="CreateOutlined" width="20px" />}
          onClick={handleClickCreateNewTeam}
        >
          新規チームを作成する
        </Button>
      </Box>
    </Paper>
  );
};
