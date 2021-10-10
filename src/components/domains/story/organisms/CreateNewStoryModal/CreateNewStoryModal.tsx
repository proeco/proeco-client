import React, { VFC, useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';
import { SelectableEmoji } from '~/components/parts/commons/organisms/SelectableEmoji';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';

const title = '✨ ストーリーを作成する';

export const CreateNewStoryModal: VFC = () => {
  const { data: isOpenCreateNewStoryModal, mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');
  console.log(isOpenCreateNewStoryModal);

  const handleChangeStoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryTitle(e.target.value);
  };

  const handleChangeStoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryDescription(e.target.value);
  };

  const handleClickCreateNewStoryButton = () => {
    // TODO: 後続タスクで処理を実装する
    console.log('Formの値', storyTitle, storyDescription, emojiId);
    console.log('TODO');
    handleClose();
  };

  const handleClose = () => {
    mutateIsOpenCreateNewStoryModal(false);
  };

  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={emojiId} size={40} onSelectEmoji={(emojiId) => setEmojiId(emojiId)} />
          </Box>
          <StyledTextField fullWidth value={storyTitle} onChange={handleChangeStoryTitle} />
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
  return <Modal content={content} title={title} open={!!isOpenCreateNewStoryModal} onClose={handleClose} />;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;
