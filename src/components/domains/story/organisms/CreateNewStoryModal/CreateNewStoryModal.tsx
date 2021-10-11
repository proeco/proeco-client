import React, { VFC, useState } from 'react';
import { useRouter } from 'next/router';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { SelectableEmoji } from '~/components/parts/commons/organisms/SelectableEmoji';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';

const title = '✨ ストーリーを作成する';

export const CreateNewStoryModal: VFC = () => {
  const router = useRouter();

  const { data: isOpenCreateNewStoryModal, mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');

  const handleChangeStoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryTitle(e.target.value);
  };

  const handleChangeStoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryDescription(e.target.value);
  };

  const handleClickCreateNewStoryButton = async () => {
    try {
      const { data } = await restClient.apiPost<Story>('/stories', { story: { title: storyTitle, description: storyDescription, emojiId } });

      // TODO: ユーザーに保存したことがわかるようにする
      console.log(data);

      // 作成後に作成したstoryの詳細ページに遷移する
      router.push(`/story/${data._id}`);
      handleClose();
    } catch (error) {
      // TODO: ユーザーにエラーがわかるようにする
      console.log(error);
    }
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
