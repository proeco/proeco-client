import React, { VFC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal, SelectableEmoji, Button, Typography, TextField } from '~/components/parts/commons';
import { useStories } from '~/stores/story';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { URLS } from '~/constants';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
};

export const CreateNewStoryModal: VFC<Props> = ({ isOpen, onCloseModal }) => {
  const router = useRouter();
  const { teamId } = router.query;
  const page = router.query.page ? Number(router.query.page) : 1;

  const { mutate: mutateStories } = useStories({
    teamId: teamId as string,
    page,
    limit: 10,
  });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const [isDisabled, setIsDisabled] = useState(true);
  const [newStory, setNewStory] = useState<Pick<Story, 'emojiId' | 'title' | 'teamId'>>({
    emojiId: 'open_file_folder',
    title: '',
    teamId: teamId as string,
  });

  useEffect(() => {
    setIsDisabled(newStory.title.length === 0);
  }, [newStory]);

  const handleClickCreateNewStoryButton = async () => {
    try {
      const { data } = await restClient.apiPost<Story>('/stories', {
        story: newStory,
        teamId,
      });

      mutateStories();

      notifySuccessMessage('ストーリーの作成に成功しました!');

      // stateの初期化
      setNewStory({
        emojiId: 'open_file_folder',
        title: '',
        teamId: teamId as string,
      });

      // 作成後に作成したstoryの詳細ページに遷移する
      router.push(URLS.TEAMS_STORY(teamId as string, data._id));
      onCloseModal();
    } catch (error) {
      notifyErrorMessage('ストーリーの作成に失敗しました!');
    }
  };

  const updateStoryForm = (newObject: Partial<Story>) => {
    setNewStory((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={newStory.emojiId} size={40} onSelectEmoji={(emojiId) => updateStoryForm({ emojiId })} />
          </Box>
          <StyledTextField fullWidth value={newStory.title} onChange={(e) => updateStoryForm({ title: e.target.value })} />
        </Box>
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={handleClickCreateNewStoryButton} disabled={isDisabled}>
          ストーリーを作る！
        </Button>
      </Box>
    </>
  );

  return <Modal content={content} emojiId="sparkles" title="ストーリーを作成する" open={isOpen} onClose={onCloseModal} />;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;
