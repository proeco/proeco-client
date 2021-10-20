import React, { FC } from 'react';
import { Box, styled } from '@mui/system';
import { Emoji } from 'emoji-mart';
import { Story } from '~/domains';
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
        <Box display="flex" alignItems="center">
          {story?.emojiId && (
            <Box mr="8px">
              <Emoji emoji={story?.emojiId} size={40} />
            </Box>
          )}
          <Typography variant="h2" bold>
            {story?.title}
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography>概要</Typography>
        <StyledDescriptionBox>
          <Typography variant="h4">{story?.description}</Typography>
        </StyledDescriptionBox>
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

const StyledDescriptionBox = styled(Box)`
  &.MuiBox-root {
    height: 6rem;
    overflow: scroll;
  }
`;
