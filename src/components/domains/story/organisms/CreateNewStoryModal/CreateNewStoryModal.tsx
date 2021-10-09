import React, { VFC, useState } from 'react';
import { Box } from '@mui/system';

import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography } from '~/components/parts/commons/atoms';
import { TextField } from '~/components/parts/commons/atoms/TextField';

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
        <Typography mb="4px" variant="body1">
          ストーリー名
        </Typography>
        <TextField fullWidth value={storyTitle} onChange={handleChangeStoryTitle} />
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1">
          概要(任意)
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
