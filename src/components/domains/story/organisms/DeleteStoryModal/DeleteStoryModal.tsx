import React, { FC } from 'react';
import { Box, styled } from '@mui/system';
import type { Story } from '~/domains';
import { Modal } from '~/components/parts/commons/organisms/Modal';
import { Button } from '~/components/parts/commons/atoms/Button';
import { Typography } from '~/components/parts/commons/atoms';

type DeleteStoryModalProps = {
  storyToDelete: Story | null;
  onClose: () => void;
  onDeleteStory: () => void;
};

type DeleteModalContentsProps = {
  storyToDelete: Story | null;
  onDeleteStory: () => void;
};

const DeleteModalContents: FC<DeleteModalContentsProps> = ({ storyToDelete, onDeleteStory }) => (
  <>
    {storyToDelete && (
      <>
        <Box>
          <Typography>ストーリー名</Typography>
          <Typography variant="h2" bold>
            {storyToDelete.title}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography>概要</Typography>
          <ScrollableDescriptionBox>
            <Typography variant="h4">{storyToDelete.description}</Typography>
          </ScrollableDescriptionBox>
        </Box>
        <Box mt={3} width="100%" textAlign="center">
          <Button color="error" variant="contained" onClick={onDeleteStory}>
            削除
          </Button>
        </Box>
      </>
    )}
  </>
);

export const DeleteStoryModal: FC<DeleteStoryModalProps> = ({ onClose, storyToDelete, onDeleteStory }) => {
  return (
    <Modal
      open={!!storyToDelete}
      title="🗑 ストーリーを削除する"
      content={<DeleteModalContents storyToDelete={storyToDelete} onDeleteStory={onDeleteStory} />}
      onClose={onClose}
    />
  );
};

const ScrollableDescriptionBox = styled(Box)`
  &.MuiBox-root {
    height: 6rem;
    overflow: scroll;
  }
`;
