import React, { VFC, useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { Button, Modal, Typography } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useIsOpenDeleteStoryTaskModal } from '~/stores/modal/useIsOpenDeleteStoryTaskModal';
import { useStoryTaskForDelete } from '~/stores/storyTask/useStoryTaskForDelete';
import { restClient } from '~/utils/rest-client';
import { useStoryTasks } from '~/stores/storyTask';

type Props = {
  isOpen: boolean;
  title: string;
  onClickDeleteStoryTaskButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, onClickDeleteStoryTaskButton, onCloseModal }) => {
  const content = (
    <>
      <Box mb="20px">
        <Typography mb="8px" variant="body1" color="textColor.main">
          タスク名
        </Typography>
        <Typography variant="h3" bold>
          {title}
        </Typography>
      </Box>
      <Box width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={onClickDeleteStoryTaskButton}>
          削除
        </Button>
      </Box>
    </>
  );
  return <Modal open={isOpen} title="タスクを削除する" onClose={onCloseModal} content={content} emojiId="wastebasket" size="small" />;
};

export const DeleteStoryTaskModal: VFC = () => {
  const router = useRouter();
  const { storyId } = router.query;
  const page = router.query.page ? Number(router.query.page) : 1;

  const { mutate: mutateStoryTasks } = useStoryTasks({
    storyId: storyId as string,
    page: page,
    limit: 10,
  });

  const { data: isOpenDeleteStoryTaskModal, mutate: mutateIsOpenDeleteStoryTaskModal } = useIsOpenDeleteStoryTaskModal();

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: storyTaskForDelete } = useStoryTaskForDelete();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!storyTaskForDelete) {
      return;
    }

    setTitle(storyTaskForDelete.title);
  }, [storyTaskForDelete]);

  const handleClickDeleteStoryTaskButton = async () => {
    try {
      await restClient.apiDelete(`/story-tasks/${storyTaskForDelete?._id}`);
      mutateStoryTasks();
      notifySuccessMessage('タスクを削除しました!');
      handleCloseModal();
    } catch (error) {
      notifyErrorMessage('タスクの削除に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenDeleteStoryTaskModal(false);
  };

  return (
    <Component
      isOpen={!!isOpenDeleteStoryTaskModal}
      title={title}
      onClickDeleteStoryTaskButton={handleClickDeleteStoryTaskButton}
      onCloseModal={handleCloseModal}
    />
  );
};
