import React, { VFC } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { Modal, Button, Emoji, Typography } from '~/components/parts/commons';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

import { useStories } from '~/stores/story';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains';
import { URLS } from '~/constants';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  teamId: string;
  page: number;
  story: Story;
};

export const DeleteStoryModal: VFC<Props> = ({ isOpen, onCloseModal, teamId, page, story }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const router = useRouter();

  const { mutate: mutateStories } = useStories({
    teamId,
    page,
    limit: 10,
  });

  const handleClickDeleteStoryButton = async () => {
    try {
      await restClient.apiDelete(`/stories/${story?._id}`);
      mutateStories();
      notifySuccessMessage('ストーリーを削除しました!');
      onCloseModal();
      router.push(URLS.TEAMS(teamId));
    } catch (error) {
      notifyErrorMessage('ストーリーの削除に失敗しました!');
    }
  };

  const content = (
    <>
      <Box>
        <Typography>ストーリー名</Typography>
        <Box display="flex" alignItems="center">
          <Box mr="8px">
            <Emoji emojiId={story.emojiId} size={32} />
          </Box>
          <Typography variant="h2" bold>
            {story.title}
          </Typography>
        </Box>
      </Box>

      <Box mt={3} width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={handleClickDeleteStoryButton}>
          削除
        </Button>
      </Box>
    </>
  );

  return <Modal open={isOpen} emojiId="wastebasket" title="ストーリーを削除する" content={content} onClose={onCloseModal} />;
};
