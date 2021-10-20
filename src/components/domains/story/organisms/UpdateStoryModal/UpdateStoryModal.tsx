import React, { VFC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { SelectableEmoji } from '~/components/parts/commons/organisms/SelectableEmoji';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';
import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useStoryForUpdate } from '~/stores/story';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  emojiId: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCreateNewStoryButton: () => void;
  onSelectEmoji: (emojiId: string) => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({
  isOpen,
  title,
  description,
  emojiId,
  onChangeTitle,
  onChangeDescription,
  onClickCreateNewStoryButton,
  onSelectEmoji,
  onCloseModal,
}) => {
  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={emojiId} size={40} onSelectEmoji={onSelectEmoji} />
          </Box>
          <StyledTextField fullWidth value={title} onChange={onChangeTitle} />
        </Box>
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          説明(任意)
        </Typography>
        <TextField fullWidth multiline rows={4} value={description} onChange={onChangeDescription} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={onClickCreateNewStoryButton}>
          更新する！
        </Button>
      </Box>
    </>
  );

  return <Modal content={content} title="💫 ストーリーを更新する" open={isOpen} onClose={onCloseModal} />;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;

export const UpdateStoryModal: VFC = () => {
  const router = useRouter();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenUpdateStoryModal, mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { data: storyForUpdate } = useStoryForUpdate();
  console.log(storyForUpdate);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emojiId, setEmojiId] = useState<string>('open_file_folder');

  useEffect(() => {
    if (!storyForUpdate) {
      return;
    }

    setTitle(storyForUpdate.title);
    setDescription(storyForUpdate.description);
    setEmojiId(storyForUpdate.emojiId);
  }, [storyForUpdate]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleClickCreateNewStoryButton = async () => {
    try {
      const { data } = await restClient.apiPost<Story>('/stories', {
        story: { title, description, emojiId },
      });

      // successのSnackbarを表示する
      notifySuccessMessage('ストーリーの作成に成功しました!');

      // stateの初期化
      setTitle('');
      setDescription('');
      setEmojiId('open_file_folder');

      // 作成後に作成したstoryの詳細ページに遷移する
      router.push(`/story/${data._id}`);
      handleCloseModal();
    } catch (error) {
      // errorのSnackbarを表示する
      notifyErrorMessage('ストーリーの作成に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenUpdateStoryModal(false);
  };

  const handleSelectEmoji = (emojiId: string) => setEmojiId(emojiId);

  return (
    <Component
      isOpen={!!isOpenUpdateStoryModal}
      title={title}
      description={description}
      emojiId={emojiId}
      onChangeTitle={handleChangeTitle}
      onChangeDescription={handleChangeDescription}
      onClickCreateNewStoryButton={handleClickCreateNewStoryButton}
      onCloseModal={handleCloseModal}
      onSelectEmoji={handleSelectEmoji}
    />
  );
};
