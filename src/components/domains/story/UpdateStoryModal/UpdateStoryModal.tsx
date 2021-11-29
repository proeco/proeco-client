import React, { VFC, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';

import { Modal, SelectableEmoji, Button, Typography, TextField } from '~/components/parts/commons';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useStory, useStories, useStoryForUpdate } from '~/stores/story';

type Props = {
  isOpen: boolean;
  title: string;
  emojiId: string;
  isDisabled: boolean;
  onChangeStoryForm: (newObject: Partial<Story>) => void;
  onClickUpdateStoryButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, emojiId, isDisabled, onChangeStoryForm, onClickUpdateStoryButton, onCloseModal }) => {
  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={emojiId} size={40} onSelectEmoji={(emojiId) => onChangeStoryForm({ emojiId })} />
          </Box>
          <StyledTextField fullWidth value={title} onChange={(e) => onChangeStoryForm({ title: e.target.value })} />
        </Box>
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={onClickUpdateStoryButton} disabled={isDisabled}>
          更新する！
        </Button>
      </Box>
    </>
  );

  return <Modal content={content} emojiId="dizzy" title="ストーリーを更新する" open={isOpen} onClose={onCloseModal} />;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;

export const UpdateStoryModal: VFC = () => {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenUpdateStoryModal, mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { data: storyForUpdate } = useStoryForUpdate();
  const { mutate: mutateStory } = useStory(storyForUpdate?._id);
  const { mutate: mutateStories } = useStories({
    teamId: router.query.id as string,
    page,
    limit: 10,
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
    if (!storyForUpdate) {
      return;
    }

    setNewStory({ emojiId: storyForUpdate.emojiId, title: storyForUpdate.title });
  }, [storyForUpdate]);

  const handleClickUpdateStoryButton = async () => {
    try {
      await restClient.apiPut<Story>(`/stories/${storyForUpdate?._id}`, {
        newObject: newStory,
      });

      if (storyForUpdate) {
        mutateStory();
      }

      mutateStories();

      // successのSnackbarを表示する
      notifySuccessMessage('ストーリーの更新に成功しました!');

      handleCloseModal();
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

  const handleCloseModal = () => {
    mutateIsOpenUpdateStoryModal(false);
  };

  return (
    <Component
      isOpen={!!isOpenUpdateStoryModal}
      title={newStory.title}
      emojiId={newStory.emojiId}
      isDisabled={isDisabled}
      onClickUpdateStoryButton={handleClickUpdateStoryButton}
      onCloseModal={handleCloseModal}
      onChangeStoryForm={updateStoryForm}
    />
  );
};
