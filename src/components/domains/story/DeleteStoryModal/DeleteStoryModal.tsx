import React, { VFC } from 'react';
import { useRouter } from 'next/router';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

import { useStories } from '~/stores/story';
import { Modal, Button, Emoji, Icon } from '~/components/parts/commons';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains';
import { URLS } from '~/constants';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  teamId: string;
  productId: string;
  page: number;
  story: Story;
};

export const DeleteStoryModal: VFC<Props> = ({ isOpen, onCloseModal, teamId, productId, page, story }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const router = useRouter();

  const { mutate: mutateStories } = useStories({
    teamId,
    page,
    limit: 100,
  });

  const handleClickDeleteStoryButton = async () => {
    try {
      await restClient.apiDelete(`/stories/${story?._id}`);
      mutateStories();
      notifySuccessMessage('ストーリーを削除しました!');
      onCloseModal();
      router.push(URLS.TEAMS(productId, '#story'));
    } catch (error) {
      notifyErrorMessage('ストーリーの削除に失敗しました!');
    }
  };

  const content = (
    <>
      <p className="mb-2">ストーリー名</p>
      <div className="d-flex align-items-center">
        <Emoji emojiId={story.emojiId} size={28} />
        <h2 className="fw-bold ms-2 mb-2">{story.title}</h2>
      </div>

      <div className="mt-3 d-flex align-items-center justify-content-center">
        <Button color="danger" onClick={handleClickDeleteStoryButton}>
          <Icon icon="TRASH" size={20} color="WHITE" />
          削除する
        </Button>
      </div>
    </>
  );

  return <Modal open={isOpen} emojiId="wastebasket" title="ストーリーを削除する" content={content} onClose={onCloseModal} />;
};
