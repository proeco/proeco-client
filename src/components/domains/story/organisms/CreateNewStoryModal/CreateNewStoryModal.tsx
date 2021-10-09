import React, { VFC, useState } from 'react';

import { Emoji } from 'emoji-mart';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';

type Props = {
  open: boolean;
  onClose: () => void;
};

const title = '✨ ストーリーを作成する';

export const CreateNewStoryModal: VFC<Props> = ({ open, onClose }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');

  const handleChangeStoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryTitle(e.target.value);
  };

  const handleChangeStoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryDescription(e.target.value);
  };

  const handleClickCreateNewStoryButton = () => {
    // TODO: 後続タスクで処理を実装する
    console.log('TODO');
    onClose();
  };

  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex">
          <StyledBox width="56px" height="56px" p="8px" mr="8px">
            <Emoji emoji="tada" size={40} />
          </StyledBox>
          <TextField fullWidth value={storyTitle} onChange={handleChangeStoryTitle} />
        </Box>
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          説明(任意)
        </Typography>
        <TextField fullWidth multiline rows={4} value={storyDescription} onChange={handleChangeStoryDescription} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={handleClickCreateNewStoryButton}>
          作る！
        </Button>
      </Box>
    </>
  );
  return <Modal content={content} title={title} open={open} onClose={onClose} />;
};

const StyledBox = styled(Box)`
  cursor: pointer;
  border: ${(props) => props.theme.palette.borderColor.main} 2px solid;
  border-radius: 4px;
  box-sizing: border-box;
`;
