import React, { VFC, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { SWRResponse } from 'swr';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { SelectableEmoji } from '~/components/parts/commons/organisms/SelectableEmoji';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';
import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useStory, useStories, useStoryForUpdate } from '~/stores/story';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  emojiId: string;
  isDisabled: boolean;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickUpdateStoryButton: () => void;
  onSelectEmoji: (emojiId: string) => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({
  isOpen,
  title,
  description,
  emojiId,
  isDisabled,
  onChangeTitle,
  onChangeDescription,
  onClickUpdateStoryButton,
  onSelectEmoji,
  onCloseModal,
}) => {
  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={emojiId} size={40} onSelectEmoji={onSelectEmoji} />
          </Box>
          <StyledTextField fullWidth value={title} onChange={onChangeTitle} />
        </Box>
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          説明(任意)
        </Typography>
        <TextField fullWidth multiline rows={4} value={description} onChange={onChangeDescription} />
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
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateStory} = useStory(storyForUpdate?._id);
  const { mutate: mutateStories } = useStories({
    userId: currentUser?._id,
    page: page,
    limit: 10,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!storyForUpdate) {
      return;
    }

    setTitle(storyForUpdate.title);
    setDescription(storyForUpdate.description);
    setEmojiId(storyForUpdate.emojiId);
  }, [storyForUpdate]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsDisabled(e.target.value.trim().length === 0);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleClickUpdateStoryButton = async () => {
    try {
      await restClient.apiPut<Story>(`/stories/${storyForUpdate?._id}`, {
        newObject: { title, description, emojiId },
      });

      if (router.pathname === '/story/[id]' && useStorySWRResponse) {
        useStorySWRResponse.mutate();
      } else {
        mutateStories();
      }

      // successのSnackbarを表示する
      notifySuccessMessage('ストーリーの更新に成功しました!');

      handleCloseModal();
    } catch (error) {
      // errorのSnackbarを表示する
      notifyErrorMessage('ストーリーの作成に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenUpdateStoryModal(false);
  };

  const handleSelectEmoji = (emojiId: string) => setEmojiId(emojiId);

  return (
    <Component
      isOpen={!!isOpenUpdateStoryModal}
      title={title}
      description={description}
      emojiId={emojiId}
      isDisabled={isDisabled}
      onChangeTitle={handleChangeTitle}
      onChangeDescription={handleChangeDescription}
      onClickUpdateStoryButton={handleClickUpdateStoryButton}
      onCloseModal={handleCloseModal}
      onSelectEmoji={handleSelectEmoji}
    />
  );
};
