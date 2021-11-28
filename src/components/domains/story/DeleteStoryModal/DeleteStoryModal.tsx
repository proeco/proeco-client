import React, { VFC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { Modal, Button, Emoji, Typography } from '~/components/parts/commons';

import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

import { useStories, useStoryForDelete } from '~/stores/story';

import { restClient } from '~/utils/rest-client';

type Props = {
  isOpen: boolean;
  title: string;
  emojiId: string;
  onClickDeleteStoryButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, emojiId, onClickDeleteStoryButton, onCloseModal }) => {
  const content = (
    <>
      <Box>
        <Typography>ストーリー名</Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <Emoji emojiId={emojiId} size={32} />
          </Box>
          <Typography variant="h2" bold>
            {title}
          </Typography>
        </Box>
      </Box>

      <Box mt={3} width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={onClickDeleteStoryButton}>
          削除
        </Button>
      </Box>
    </>
  );

  return <Modal open={isOpen} emojiId="wastebasket" title="ストーリーを削除する" content={content} onClose={onCloseModal} />;
};

export const DeleteStoryModal: VFC = () => {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenDeleteStoryModal, mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { data: storyForDelete } = useStoryForDelete();

  const { mutate: mutateStories } = useStories({
    teamId: router.query.id as string,
    page,
    limit: 10,
  });

  const [title, setTitle] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');

  useEffect(() => {
    if (!storyForDelete) {
      return;
    }

    setTitle(storyForDelete.title);
    setEmojiId(storyForDelete.emojiId);
  }, [storyForDelete]);

  const handleClickDeleteStoryButton = async () => {
    try {
      await restClient.apiDelete(`/stories/${storyForDelete?._id}`);
      mutateStories();
      notifySuccessMessage('ストーリーを削除しました!');
      handleCloseModal();
      if (router.pathname !== '/story') {
        router.push('/story');
      }
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
      emojiId={emojiId}
      onClickDeleteStoryButton={handleClickDeleteStoryButton}
      onCloseModal={handleCloseModal}
    />
  );
};
