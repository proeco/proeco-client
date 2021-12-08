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

type Props = {
  currentUser: User;
};

export const TeamForm: VFC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();
  const { mutate: mutateTeamsRelatedUser } = useTeamsRelatedUser({ userId: currentUser._id });

  const [isCreating, setIsCreating] = useState(false);
  const [iconImage, setIconImage] = useState<File>();
  const [isValidForm, setIsValidForm] = useState(true);
  const [team, setTeam] = useState<Pick<Team, 'name' | 'productId' | 'url' | 'description' | 'iconImageId'>>({
    productId: '',
    url: '',
    name: '',
    description: '',
    iconImageId: '',
  });

  const handleClickFetchByUrl = async () => {
    try {
      const {
        data: { ogp },
      } = await restClient.apiGet<{ ogp: Ogp }>(`/ogps?url=${team.url}`);
      updateStoryForm({ description: ogp.description || '', name: ogp.siteName || '' });
    } catch (error) {
      notifyErrorMessage('データの取得に失敗しました');
    }
  };

  const handleClickCreateNewTeam = async () => {
    if (!iconImage) return null;
    setIsCreating(true);
    try {
      await restClient.apiPost<Team>('/teams', { team });
      notifySuccessMessage('チームを作成しました');
      await mutateTeamsRelatedUser();
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
      isValidUrl(team.url) &&
        team.name.trim() !== '' &&
        team.productId.trim() !== '' &&
        team.productId.trim() !== '' &&
        team.iconImageId.trim() !== '' &&
        team.description.trim() !== '',
    );
  }, [team]);

  return (
    <Grid container>
      <Grid item xs={12} md={6} px={2} pb={3}>
        <Paper square>
          <Box display="flex" justifyContent="center">
            <IconUpload onSelectImage={handleChangeFile} currentImagePath={iconImage ? URL.createObjectURL(iconImage) : undefined} />
          </Box>
          <Typography mb={1} variant="body1" color="textColor.light">
            プロダクトの url
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField fullWidth multiline value={team.url} onChange={(e) => updateStoryForm({ url: e.target.value })} />
            <StyledButton color="primary" variant="contained" size="medium" disabled={!isValidUrl(team.url)} onClick={handleClickFetchByUrl}>
              データ取得
            </StyledButton>
          </Box>
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
          <TextField
            fullWidth
            multiline
            value={team.description}
            rows={6}
            onChange={(e) => updateStoryForm({ description: e.target.value })}
          />
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
      </Grid>
      <Grid item xs={12} md={6} px={2} pb={3}>
        <Typography variant="h4" align="center" color={COLORS.TEXT} mb={2}>
          プレビュー
        </Typography>
        <TeamCard name={team.name} productId={team.productId} url={team.url} description={team.description} attachmentId={team.iconImageId} />
      </Grid>
    </Grid>
  );
};

const StyledButton = styled(Button)`
  white-space: nowrap;
`;
