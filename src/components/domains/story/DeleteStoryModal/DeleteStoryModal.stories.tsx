import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { action } from '@storybook/addon-actions';
import { DeleteStoryModal } from './DeleteStoryModal';
import { createMockStory } from '~/mocks/domains';

export default {
  title: 'domains/story/DeleteStoryModal',
  component: DeleteStoryModal,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof DeleteStoryModal>;

const Template: ComponentStory<typeof DeleteStoryModal> = (args) => {
  return (
    <Box>
      <DeleteStoryModal {...args} />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  onCloseModal: action('onCloseModal'),
  teamId: 'team1',
  page: 1,
  story: createMockStory(),
};
