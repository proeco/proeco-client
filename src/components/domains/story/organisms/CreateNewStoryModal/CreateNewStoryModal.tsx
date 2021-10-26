import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller, SubmitHandler, Control } from 'react-hook-form';

import 'emoji-mart/css/emoji-mart.css';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { restClient } from '~/utils/rest-client';

import { Story } from '~/domains';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { SelectableEmoji } from '~/components/parts/commons/organisms/SelectableEmoji';
import { Button, Typography, TextField } from '~/components/parts/commons/atoms';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useStories } from '~/stores/story';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

interface IFormInputs {
  title: string;
  description: string;
}

type Props = {
  control: Control<IFormInputs, object>;
  isOpen: boolean;
  isDisabled: boolean;
  emojiId: string;
  onSelectEmoji: () => void;
  onClickCreateNewStoryButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ control, isOpen, isDisabled, emojiId, onSelectEmoji, onClickCreateNewStoryButton, onCloseModal }) => {
  const content = (
    <form onSubmit={onClickCreateNewStoryButton}>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          ストーリー名
        </Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <SelectableEmoji emojiId={emojiId} size={40} onSelectEmoji={onSelectEmoji} />
          </Box>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => <StyledTextField fullWidth {...field} />}
          />
        </Box>
      </Box>
      <Box mb="16px">
        <Typography mb="4px" variant="body1" color="textColor.light">
          説明(任意)
        </Typography>
        <Controller name="description" control={control} defaultValue="" render={({ field }) => <TextField fullWidth multiline rows={4} {...field} />} />
      </Box>
      <Box width="100%" textAlign="center">
        <Button variant="contained" disabled={isDisabled} type="submit">
          ストーリーを作る！
        </Button>
      </Box>
    </form>
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

  const handleClickCreateNewStoryButton: SubmitHandler<IFormInputs> = async (formData) => {
    const { title, description = '' } = formData;

    try {
      const { data } = await restClient.apiPost<Story>('/stories', {
        story: { title, description, emojiId },
      });

      mutateStories();

      // successのSnackbarを表示する
      notifySuccessMessage('ストーリーの作成に成功しました!');

      // formの初期化
      reset();

      // 作成後に作成したstoryの詳細ページに遷移する
      router.push(`/story/${data._id}`);
      handleCloseModal();
    } catch (error) {
      // errorのSnackbarを表示する
      notifyErrorMessage('ストーリーの作成に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenCreateNewStoryModal(false);
  };

  const { handleSubmit, control, watch, reset } = useForm<IFormInputs>();

  return (
    <Component
      control={control}
      isOpen={!!isOpenCreateNewStoryModal}
      isDisabled={!watch('title')}
      emojiId={emojiId}
      onSelectEmoji={onSelectEmoji}
      onClickCreateNewStoryButton={handleSubmit(handleClickCreateNewStoryButton)}
      onCloseModal={handleCloseModal}
    />
  );
};
