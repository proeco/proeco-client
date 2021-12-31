import React, { VFC } from 'react';

import { Button, Icon, Modal } from '~/components/parts/commons';
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
    limit: 100,
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
      <div className="mb-3 text-center">※ この操作は戻すことが出来ません。</div>
      <div className="text-center mt-5">
        <Button color="danger" onClick={handleClickDeleteStoryPostButton}>
          <Icon icon="TRASH" size={20} color="WHITE" />
          削除する
        </Button>
      </div>
    </>
  );
  return <Modal open={isOpen} title="投稿を削除しますか？" emojiId="wastebasket" onClose={onCloseModal} content={content} />;
};
