import React, { VFC, useState, useEffect } from 'react';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';

import { Modal, SelectableEmoji, Button, TextField, Icon } from '~/components/parts/commons';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useStory, useStories } from '~/stores/story';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  story: Story;
  teamId: string;
  page: number;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;

export const UpdateStoryModal: VFC<Props> = ({ isOpen, onCloseModal, story, teamId, page }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { mutate: mutateStory } = useStory(story._id, story);
  const { mutate: mutateStories } = useStories({
    teamId,
    page,
    limit: 100,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [newStory, setNewStory] = useState<Pick<Story, 'emojiId' | 'title'>>({
    emojiId: 'open_file_folder',
    title: '',
  });

  useEffect(() => {
    setIsDisabled(newStory.title.length === 0);
  }, [newStory]);

  useEffect(() => {
    if (!story) {
      return;
    }

    setNewStory({ emojiId: story.emojiId, title: story.title });
  }, [story]);

  const handleClickUpdateStoryButton = async () => {
    try {
      await restClient.apiPut<Story>(`/stories/${story?._id}`, {
        newObject: newStory,
      });

      if (story) {
        mutateStory();
      }

      mutateStories();

      // successのSnackbarを表示する
      notifySuccessMessage('ストーリーの更新に成功しました!');

      onCloseModal();
    } catch (error) {
      // errorのSnackbarを表示する
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
        <p className="text-light mb-1">ストーリー名</p>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={newStory.emojiId} size={40} onSelectEmoji={(emojiId) => updateStoryForm({ emojiId })} />
          </Box>
          <StyledTextField fullWidth value={newStory.title} onChange={(e) => updateStoryForm({ title: e.target.value })} />
        </Box>
      </Box>
      <Box width="100%" textAlign="center">
        <Button color="primary" onClick={handleClickUpdateStoryButton} disabled={isDisabled}>
          <Icon icon="CLOCKWISE" size={20} color="WHITE" />
          更新する
        </Button>
      </Box>
    </>
  );

  return <Modal content={content} emojiId="dizzy" title="ストーリーを更新する" open={isOpen} onClose={onCloseModal} />;
};
