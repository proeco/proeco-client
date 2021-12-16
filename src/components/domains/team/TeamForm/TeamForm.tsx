import { useRouter } from 'next/router';
import { VFC, useState, ChangeEvent, useEffect } from 'react';

import { Box, styled } from '@mui/system';
import { Grid } from '@mui/material';

import { TeamCard } from '../TeamCard';
import { Ogp } from '~/interfaces/ogp';
import { Attachment, Team, User } from '~/domains';

import { COLORS, URLS } from '~/constants';
import { useTeamsRelatedUser } from '~/stores/team';
import { isValidUrl } from '~/utils/isValidUrl';
import { restClient } from '~/utils/rest-client';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

import { TextField, Typography, Button, Icon, Paper, IconUpload } from '~/components/parts/commons';
import { useSignedUrl } from '~/stores/attachment';

type Props = {
  currentUser: User;
  team?: Team;
};

export const TeamForm: VFC<Props> = ({ currentUser, team }) => {
  const router = useRouter();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();
  const { mutate: mutateTeamsRelatedUser } = useTeamsRelatedUser({ userId: currentUser._id });
  const { data: signedUrl } = useSignedUrl(team?.iconImageId);

  const [isCreating, setIsCreating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
  const [isValidForm, setIsValidForm] = useState(true);
  const [newTeam, setNewTeam] = useState<Pick<Team, 'name' | 'productId' | 'url' | 'description' | 'iconImageId'>>({
    productId: team?.productId || '',
    url: team?.url || '',
    name: team?.name || '',
    description: team?.description || '',
    iconImageId: team?.iconImageId || '',
  });

  const handleClickFetchByUrl = async () => {
    try {
      const {
        data: { ogp },
      } = await restClient.apiGet<{ ogp: Ogp }>(`/ogps?url=${newTeam.url}`);
      updateStoryForm({ description: ogp.description || '', name: ogp.siteName || '' });
    } catch (error) {
      notifyErrorMessage('データの取得に失敗しました');
    }
  };

  const handleClickCreateNewTeam = async () => {
    setIsCreating(true);
    try {
      if (team) {
        await restClient.apiPut<Team>(`/teams/${team._id}`, { team: newTeam });
        notifySuccessMessage('チームを更新しました');
      } else {
        await restClient.apiPost<Team>('/teams', { team: newTeam });
        notifySuccessMessage('チームを作成しました');
      }
      await mutateTeamsRelatedUser();
      if (!team) {
        router.push(URLS.DASHBOARD_TEAMS);
      }
      setIsCreating(false);
    } catch (error) {
      notifyErrorMessage(`チームの${team ? '更新' : '作成'}に失敗しました`);
    }
  };

  const updateStoryForm = (newObject: Partial<Team>) => {
    setNewTeam((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const params = new FormData();
    try {
      params.append('file', file);
      const { data: attachment } = await restClient.apiPost<Attachment>(`/attachments?path=${currentUser._id}/team-icons`, params, {
        'Content-Type': 'multipart/form-data',
      });
      updateStoryForm({ iconImageId: attachment._id });
      setIconImage(file);
    } catch (error) {
      notifyErrorMessage('ファイルのアップロードに失敗しました');
    }
  };

  useEffect(() => {
    setIsValidForm(
      isValidUrl(newTeam.url) &&
        newTeam.name.trim() !== '' &&
        newTeam.productId.trim() !== '' &&
        newTeam.productId.trim() !== '' &&
        newTeam.iconImageId.trim() !== '' &&
        newTeam.description.trim() !== '',
    );
  }, [newTeam]);

  return (
    <Grid container>
      <Grid item xs={12} md={6} px={2} pb={3}>
        <Paper square>
          <Box display="flex" justifyContent="center">
            <IconUpload onSelectImage={handleChangeFile} currentImagePath={iconImage ? URL.createObjectURL(iconImage) : signedUrl} />
          </Box>
          <Typography mb={1} variant="body1" color="textColor.light">
            プロダクトの url
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField fullWidth multiline value={newTeam.url} onChange={(e) => updateStoryForm({ url: e.target.value })} />
            <StyledButton
              color="primary"
              variant="contained"
              size="medium"
              disabled={!isValidUrl(newTeam.url)}
              onClick={handleClickFetchByUrl}
            >
              データ取得
            </StyledButton>
          </Box>
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
            rows={6}
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
              新規チームを作成する
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} px={2} pb={3}>
        <Typography variant="h4" align="center" color={COLORS.TEXT} mb={2}>
          プレビュー
        </Typography>
        <TeamCard
          name={newTeam.name}
          productId={newTeam.productId}
          url={newTeam.url}
          description={newTeam.description}
          attachmentId={newTeam.iconImageId}
        />
      </Grid>
    </Grid>
  );
};

const StyledButton = styled(Button)`
  white-space: nowrap;
`;
