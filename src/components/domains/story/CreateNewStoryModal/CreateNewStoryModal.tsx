import React, { VFC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal, SelectableEmoji, Button, Typography, TextField } from '~/components/parts/commons';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useStories } from '~/stores/story';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { URLS } from '~/constants';

type Props = {
  isOpen: boolean;
  title: string;
  emojiId: string;
  isDisabled: boolean;
  onChangeStoryForm: (newObject: Partial<Story>) => void;
  onClickCreateNewStoryButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, title, emojiId, isDisabled, onClickCreateNewStoryButton, onCloseModal, onChangeStoryForm }) => {
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
  const { teamId } = router.query;
  const page = router.query.page ? Number(router.query.page) : 1;

  const { mutate: mutateStories } = useStories({
    teamId: teamId as string,
    page: page,
    limit: 10,
  });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: isOpenCreateNewStoryModal, mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const [isDisabled, setIsDisabled] = useState(true);
  const [newStory, setNewStory] = useState<Pick<Story, 'emojiId' | 'title' | 'teamId'>>({
    emojiId: 'open_file_folder',
    title: '',
    teamId: teamId as string,
  });

  useEffect(() => {
    setIsDisabled(newStory.title.length === 0);
  }, [newStory]);

  const handleClickCreateNewStoryButton = async () => {
    try {
      const { data } = await restClient.apiPost<Story>('/stories', {
        story: newStory,
        teamId,
      });

      mutateStories();

      notifySuccessMessage('ストーリーの作成に成功しました!');

      // stateの初期化
      setNewStory({
        emojiId: 'open_file_folder',
        title: '',
        teamId: teamId as string,
      });

      // 作成後に作成したstoryの詳細ページに遷移する
      router.push(URLS.TEAMS_DASHBOARD_STORY(teamId as string, data._id));
      handleCloseModal();
    } catch (error) {
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
      emojiId={newStory.emojiId}
      isDisabled={isDisabled}
      onClickCreateNewStoryButton={handleClickCreateNewStoryButton}
      onCloseModal={handleCloseModal}
      onChangeStoryForm={updateStoryForm}
    />
  );
};
