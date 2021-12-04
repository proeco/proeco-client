import React, { VFC, useState, useEffect } from 'react';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal, SelectableEmoji, Button, Typography, TextField } from '~/components/parts/commons';
import { useStories } from '~/stores/story';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  teamId: string;
  page: number;
};

const limit = 10;

export const CreateNewStoryModal: VFC<Props> = ({ isOpen, onCloseModal, teamId, page }) => {
  const { mutate: mutateStories } = useStories({
    teamId,
    page,
    limit,
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
      await restClient.apiPost<Story>('/stories', {
        story: newStory,
        teamId,
      });

      mutateStories();

      notifySuccessMessage('ストーリーの作成に成功しました!');

      // stateの初期化
      setNewStory({
        emojiId: 'open_file_folder',
        title: '',
        teamId,
      });

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
