import React, { VFC, useState, useEffect } from 'react';
import { Box, styled } from '@mui/system';
import { Emoji } from 'emoji-mart';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button } from '~/components/parts/commons/atoms/Button';
import { Typography } from '~/components/parts/commons/atoms';

import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

import { useStories, useStoryForDelete } from '~/stores/story';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { restClient } from '~/utils/rest-client';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  emojiId: string;
  onClickDeleteStoryButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, description, emojiId, onClickDeleteStoryButton, onCloseModal }) => {
  const content = (
    <>
      <Box>
        <Typography>ストーリー名</Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <Emoji emoji={emojiId} size={40} />
          </Box>
          <Typography variant="h2" bold>
            {title}
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography>概要</Typography>
        <StyledDescriptionBox>
          <Typography variant="h4">{description}</Typography>
        </StyledDescriptionBox>
      </Box>
      <Box mt={3} width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={onClickDeleteStoryButton}>
          削除
        </Button>
      </Box>
    </>
  );

  return <Modal open={isOpen} title="🗑 ストーリーを削除する" content={content} onClose={onCloseModal} />;
};

const StyledDescriptionBox = styled(Box)`
  &.MuiBox-root {
    height: 6rem;
    overflow-y: scroll;
  }
`;

export const DeleteStoryModal: VFC = () => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenDeleteStoryModal, mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { data: storyForDelete } = useStoryForDelete();
  const { data: currentUser } = useCurrentUser();

  // TODO pageをpathから取得する
  const { mutate: mutateStories } = useStories({
    userId: currentUser?._id,
    page: 1,
    limit: 10,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');

  useEffect(() => {
    if (!storyForDelete) {
      return;
    }

    setTitle(storyForDelete.title);
    setDescription(storyForDelete.description);
    setEmojiId(storyForDelete.emojiId);
  }, [storyForDelete]);

  const handleClickDeleteStoryButton = async () => {
    try {
      await restClient.apiDelete(`/stories/${storyForDelete?._id}`);
      mutateStories();
      notifySuccessMessage('ストーリーを削除しました!');
      handleCloseModal();
    } catch (error) {
      notifyErrorMessage('ストーリーの削除に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenDeleteStoryModal(false);
  };

  return (
    <Component
      isOpen={!!isOpenDeleteStoryModal}
      title={title}
      description={description}
      emojiId={emojiId}
      onClickDeleteStoryButton={handleClickDeleteStoryButton}
      onCloseModal={handleCloseModal}
    />
  );
};
