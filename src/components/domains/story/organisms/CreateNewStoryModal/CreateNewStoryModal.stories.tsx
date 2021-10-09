import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { CreateNewStoryModal } from './CreateNewStoryModal';

export default {
  title: 'domains/story/organisms/CreateNewStoryModal',
  component: CreateNewStoryModal,
  argTypes: { onClose: { action: 'closed' } },
} as ComponentMeta<typeof CreateNewStoryModal>;

const Template: ComponentStory<typeof CreateNewStoryModal> = (args) => {
  return (
    <Box>
      <CreateNewStoryModal {...args}></CreateNewStoryModal>
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  open: true,
};
