import React, { VFC } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { Button, Modal, Typography } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useIsOpenDeleteStoryPostModal } from '~/stores/modal/useIsOpenDeleteStoryPostModal';
import { useStoryPostForDelete } from '~/stores/storyPost/useStoryPostForDelete';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';

type Props = {
  isOpen: boolean;
  onClickDeleteStoryPostButton: () => void;
  onCloseModal: () => void;
};

export const Component: VFC<Props> = ({ isOpen, onClickDeleteStoryPostButton, onCloseModal }) => {
  const content = (
    <>
      <Box mb="20px" textAlign="center">
        <Typography variant="h3" bold mb="8px">
          投稿を削除しますか？
        </Typography>
        <Typography mb="8px" variant="body2" color="textColor.main">
          この操作は戻すことが出来ません。
        </Typography>
      </Box>
      <Box width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={onClickDeleteStoryPostButton}>
          削除する
        </Button>
      </Box>
    </>
  );
  return (
    <Modal
      open={isOpen}
      title="投稿を削除する"
      onClose={onCloseModal}
      content={content}
      emojiId="wastebasket"
      size="small"
      isWithHeader={false}
    />
  );
};

export const DeleteStoryPostModal: VFC = () => {
  const router = useRouter();
  const { storyId } = router.query;
  const page = router.query.page ? Number(router.query.page) : 1;

  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId: storyId as string,
    page,
    limit: 10,
  });

  const { data: isOpenDeleteStoryPostModal, mutate: mutateIsOpenDeleteStoryPostModal } = useIsOpenDeleteStoryPostModal();

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: storyPostForDelete } = useStoryPostForDelete();

  const handleClickDeleteStoryPostButton = async () => {
    try {
      await restClient.apiDelete(`/story-posts/${storyPostForDelete?._id}`);
      mutateStoryPosts();
      notifySuccessMessage('投稿を削除しました!');
      handleCloseModal();
    } catch (error) {
      notifyErrorMessage('投稿の削除に失敗しました!');
    }
  };

  const handleCloseModal = () => {
    mutateIsOpenDeleteStoryPostModal(false);
  };

  return (
    <Component
      isOpen={!!isOpenDeleteStoryPostModal}
      onClickDeleteStoryPostButton={handleClickDeleteStoryPostButton}
      onCloseModal={handleCloseModal}
    />
  );
};
