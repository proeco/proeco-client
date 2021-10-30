import React, { VFC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal, SelectableEmoji, Button, Typography, TextField } from '~/components/parts/commons';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useStories } from '~/stores/story';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  emojiId: string;
  isDisabled: boolean;
  onChangeStoryForm: (newObject: Partial<Story>) => void;
  onClickCreateNewStoryButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, description, emojiId, isDisabled, onClickCreateNewStoryButton, onCloseModal, onChangeStoryForm }) => {
  const content = (
    <>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={emojiId} size={40} onSelectEmoji={(emojiId) => onChangeStoryForm({ emojiId })} />
          </Box>
          <StyledTextField fullWidth value={title} onChange={(e) => onChangeStoryForm({ title: e.target.value })} />
        </Box>
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          説明(任意)
        </Typography>
        <TextField fullWidth multiline rows={4} value={description} onChange={(e) => onChangeStoryForm({ description: e.target.value })} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" onClick={onClickCreateNewStoryButton} disabled={isDisabled}>
          ストーリーを作る！
        </Button>
      </Box>
    </>
  );

  return <Modal content={content} emojiId="sparkles" title="ストーリーを作成する" open={isOpen} onClose={onCloseModal} />;
};

const StyledTextField = styled(TextField)`
  height: 40px;
`;

export const CreateNewStoryModal: VFC = () => {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateStories } = useStories({
    userId: currentUser?._id,
    page: page,
    limit: 10,
  });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenCreateNewStoryModal, mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const [isDisabled, setIsDisabled] = useState(true);
  const [newStory, setNewStory] = useState<Pick<Story, 'emojiId' | 'title' | 'description'>>({
    emojiId: 'open_file_folder',
    title: '',
    description: '',
  });

  useEffect(() => {
    setIsDisabled(newStory.title.length === 0);
  }, [newStory]);

  const handleClickCreateNewStoryButton = async () => {
    try {
      const { data } = await restClient.apiPost<Story>('/stories', {
        story: newStory,
      });

      mutateStories();

      // successのSnackbarを表示する
      notifySuccessMessage('ストーリーの作成に成功しました!');

      // stateの初期化
      setNewStory({
        emojiId: 'open_file_folder',
        title: '',
        description: '',
      });

      // 作成後に作成したstoryの詳細ページに遷移する
      router.push(`/story/${data._id}`);
      handleCloseModal();
    } catch (error) {
      // errorのSnackbarを表示する
      notifyErrorMessage('ストーリーの作成に失敗しました!');
    }
  };

  const updateStoryForm = (newObject: Partial<Story>) => {
    setNewStory((prevState) => {
      return {
        ...prevState,
        ...newObject,
      };
    });
  };

  const handleCloseModal = () => {
    mutateIsOpenCreateNewStoryModal(false);
  };

  return (
    <Component
      isOpen={!!isOpenCreateNewStoryModal}
      title={newStory.title}
      description={newStory.description}
      emojiId={newStory.emojiId}
      isDisabled={isDisabled}
      onClickCreateNewStoryButton={handleClickCreateNewStoryButton}
      onCloseModal={handleCloseModal}
      onChangeStoryForm={updateStoryForm}
    />
  );
};
