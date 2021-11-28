import React, { VFC, useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { Button, Modal, Typography } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useIsOpenDeleteStoryPostModal } from '~/stores/modal/useIsOpenDeleteStoryPostModal';
import { useStoryPostForDelete } from '~/stores/storyPost/useStoryPostForDelete';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';

type Props = {
  isOpen: boolean;
  title: string;
  onClickDeleteStoryPostButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, onClickDeleteStoryPostButton, onCloseModal }) => {
  const content = (
    <>
      <Box mb="20px">
        <Typography mb="8px" variant="body1" color="textColor.main">
          ポスト名
        </Typography>
        <Typography variant="h3" bold>
          {title}
        </Typography>
      </Box>
      <Box width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={onClickDeleteStoryPostButton}>
          削除
        </Button>
      </Box>
    </>
  );
  return <Modal open={isOpen} title="ポストを削除する" onClose={onCloseModal} content={content} emojiId="wastebasket" size="small" />;
};

export const DeleteStoryPostModal: VFC = () => {
  const router = useRouter();
  const { storyId } = router.query;
  const page = router.query.page ? Number(router.query.page) : 1;

  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId: storyId as string,
    page,
    limit: 10,
  });

  const { data: isOpenDeleteStoryPostModal, mutate: mutateIsOpenDeleteStoryPostModal } = useIsOpenDeleteStoryPostModal();

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: storyTaskForDelete } = useStoryPostForDelete();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!storyTaskForDelete) {
      return;
    }

    setTitle(storyTaskForDelete.content);
  }, [storyTaskForDelete]);

  const handleClickDeleteStoryPostButton = async () => {
    try {
      await restClient.apiDelete(`/story-tasks/${storyTaskForDelete?._id}`);
      mutateStoryPosts();
      notifySuccessMessage('ポストを削除しました!');
      handleCloseModal();
    } catch (error) {
      notifyErrorMessage('ポストの削除に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenDeleteStoryPostModal(false);
  };

  return (
    <Component
      isOpen={!!isOpenDeleteStoryPostModal}
      title={title}
      onClickDeleteStoryPostButton={handleClickDeleteStoryPostButton}
      onCloseModal={handleCloseModal}
    />
  );
};
