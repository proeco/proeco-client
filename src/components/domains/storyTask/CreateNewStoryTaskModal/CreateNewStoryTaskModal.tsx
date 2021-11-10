import React, { VFC } from 'react';
import { Box, styled } from '@mui/system';
import { Button, Modal, TextField, Typography } from '~/components/parts/commons';

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
  return <Component />;
};
