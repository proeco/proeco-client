import React, { VFC } from 'react';
import { Box } from '@mui/system';
import { Button, Modal, Typography } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';

type Props = {
  isOpen: boolean;
  storyPostId: string;
  onCloseModal: () => void;
  storyId: string;
  page: number;
};

export const DeleteStoryPostModal: VFC<Props> = ({ isOpen, storyPostId, storyId, page, onCloseModal }) => {
  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId,
    page,
    limit: 10,
  });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleClickDeleteStoryPostButton = async () => {
    try {
      await restClient.apiDelete(`/story-posts/${storyPostId}`);
      mutateStoryPosts();
      notifySuccessMessage('投稿を削除しました!');
      onCloseModal();
    } catch (error) {
      notifyErrorMessage('投稿の削除に失敗しました!');
    }
  };

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
        <Button color="danger" onClick={handleClickDeleteStoryPostButton}>
          削除する
        </Button>
      </Box>
    </>
  );
  return <Modal open={isOpen} onClose={onCloseModal} content={content} size="small" />;
};
