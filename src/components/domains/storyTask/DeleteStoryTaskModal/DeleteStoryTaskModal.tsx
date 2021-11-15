import { Box } from '@mui/system';
import React, { VFC } from 'react';
import { Button, Modal, Typography } from '~/components/parts/commons';

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
  return <Component />;
};
