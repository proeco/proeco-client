import React, { VFC, useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';

import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';
import { SelectableEmoji } from '~/components/parts/commons/organisms/SelectableEmoji';

type Props = {
  open: boolean;
  onClose: () => void;
};

const title = '✨ ストーリーを作成する';

export const CreateNewStoryModal: VFC<Props> = ({ open, onClose }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');

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
          <SelectableEmoji emojiId={emojiId} onSelectEmoji={(emojiId) => setEmojiId(emojiId)} />
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
          ストーリーを作る！
        </Button>
      </Box>
    </>
  );
  return <Modal content={content} title={title} open={open} onClose={onClose} />;
};
