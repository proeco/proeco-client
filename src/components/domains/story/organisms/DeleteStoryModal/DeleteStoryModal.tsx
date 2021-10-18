import React, { FC } from 'react';
import { Box, styled } from '@mui/system';
import { Emoji } from 'emoji-mart';
import type { Story } from '~/domains';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button } from '~/components/parts/commons/atoms/Button';
import { Typography } from '~/components/parts/commons/atoms';

type DeleteStoryModalProps = {
  storyToDelete: Story | null;
  onClose: () => void;
  onDeleteStory: () => void;
};

export const DeleteStoryModal: FC<DeleteStoryModalProps> = ({ onClose, onDeleteStory, storyToDelete: story }) => {
  const content = (
    <>
      <Box>
        <Typography>ストーリー名</Typography>
        <Typography variant="h2" bold>
          <>
            {story?.emojiId && <Emoji size={28} emoji={story?.emojiId} />}
            {story?.title}
          </>
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography>概要</Typography>
        <ScrollableDescriptionBox>
          <Typography variant="h4">{story?.description}</Typography>
        </ScrollableDescriptionBox>
      </Box>
      <Box mt={3} width="100%" textAlign="center">
        <Button color="error" variant="contained" onClick={onDeleteStory}>
          削除
        </Button>
      </Box>
    </>
  );

  return <Modal open={!!story} title="🗑 ストーリーを削除する" content={content} onClose={onClose} />;
};

const ScrollableDescriptionBox = styled(Box)`
  &.MuiBox-root {
    height: 6rem;
    overflow: scroll;
  }
`;
