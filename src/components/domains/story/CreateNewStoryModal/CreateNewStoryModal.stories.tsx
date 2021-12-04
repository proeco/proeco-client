import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { action } from '@storybook/addon-actions';
import { CreateNewStoryModal } from '.';

export default {
  title: 'domains/story/CreateNewStoryModal',
  component: CreateNewStoryModal,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof CreateNewStoryModal>;

const Template: ComponentStory<typeof CreateNewStoryModal> = (args) => {
  return (
    <Box>
      <CreateNewStoryModal {...args} />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  onCloseModal: action('onCloseModal'),
};
