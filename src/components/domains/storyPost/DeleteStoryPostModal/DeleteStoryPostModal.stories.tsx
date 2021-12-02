import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { SnackbarProvider } from 'notistack';
import { DeleteStoryPostModal } from './DeleteStoryPostModal';

export default {
  title: 'domains/storyPost/DeleteStoryPostModal',
  component: DeleteStoryPostModal,
  argTypes: {
    onClickDeleteStoryPostButton: { action: 'onClickDeleteStoryPostButton' },
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof DeleteStoryPostModal>;

const Template: ComponentStory<typeof DeleteStoryPostModal> = (args) => {
  return (
    <SnackbarProvider>
      <Box>
        <DeleteStoryPostModal {...args} />
      </Box>
    </SnackbarProvider>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
};
