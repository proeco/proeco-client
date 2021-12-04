import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { UpdateStoryModal } from './UpdateStoryModal';
import { createMockStory } from '~/mocks/domains';

export default {
  title: 'domains/story/UpdateStoryModal',
  component: UpdateStoryModal,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof UpdateStoryModal>;

const Template: ComponentStory<typeof UpdateStoryModal> = (args) => {
  return (
    <Box>
      <UpdateStoryModal {...args} />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  story: createMockStory(),
};
