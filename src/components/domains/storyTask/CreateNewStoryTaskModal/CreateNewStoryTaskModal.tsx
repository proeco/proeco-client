import React, { VFC, useState, useEffect } from 'react';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/router';
import { Button, Modal, TextField, Typography } from '~/components/parts/commons';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useIsOpenCreateNewStoryTaskModal } from '~/stores/modal/useIsOpenCreateNewStoryTaskModal';
import { restClient } from '~/utils/rest-client';
import { StoryTask } from '~/domains';
import { useStoryTasks } from '~/stores/storyTask';

type Props = {
  isOpen: boolean;
  title: string;
  isDisabled: boolean;
  onChangeTitle: (title: string) => void;
  onClickCreateNewStoryTaskButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, isDisabled, onChangeTitle, onClickCreateNewStoryTaskButton, onCloseModal }) => {
  const content = (
    <>
      <Box mb="20px">
        <Typography mb="8px" variant="body1" color="textColor.main">
          タスク名
        </Typography>
        <StyledTextField fullWidth value={title} onChange={(e) => onChangeTitle(e.target.value)} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={onClickCreateNewStoryTaskButton} disabled={isDisabled}>
          作成する！
        </Button>
      </Box>
    </>
  );
  return <Modal emojiId="pencil2" title="タスクを作成する" content={content} open={isOpen} onClose={onCloseModal} size="small" />;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;

export const CreateNewStoryTaskModal: VFC = () => {
  const router = useRouter();
  const { storyId } = router.query;
  const page = router.query.page ? Number(router.query.page) : 1;

  const { mutate: mutateStoryTasks } = useStoryTasks({
    storyId: storyId as string,
    page: page,
    limit: 10,
  });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenCreateNewStoryTaskModal, mutate: mutateIsOpenCreateNewStoryTaskModal } = useIsOpenCreateNewStoryTaskModal();

  const [isDisabled, setIsDisabled] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setIsDisabled(title.length === 0);
  }, [title]);

  const handleCloseModal = () => {
    mutateIsOpenCreateNewStoryTaskModal(false);
  };

  const handleClickCreateNewStoryTaskButton = async () => {
    try {
      await restClient.apiPost<StoryTask>('/story-tasks', {
        title,
        storyId,
      });

      mutateStoryTasks();

      notifySuccessMessage('タスクの作成に成功しました!');

      setTitle('');

      handleCloseModal();
    } catch (error) {
      notifyErrorMessage('タスクの作成に失敗しました!');
    }
  };

  return (
    <Component
      isOpen={!!isOpenCreateNewStoryTaskModal}
      title={title}
      onClickCreateNewStoryTaskButton={handleClickCreateNewStoryTaskButton}
      isDisabled={isDisabled}
      onChangeTitle={setTitle}
      onCloseModal={handleCloseModal}
    />
  );
};
