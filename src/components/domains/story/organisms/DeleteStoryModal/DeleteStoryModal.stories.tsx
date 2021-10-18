import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { DeleteStoryModal } from './DeleteStoryModal';

export default {
  title: 'domains/story/organisms/CreateNewStoryModal',
  component: DeleteStoryModal,
  argTypes: {
    storyToDelete: Story;
    onClose: { action: 'onClose' },
    onDeleteStory: { action: 'onDeleteStory' },
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
  storyToDelete: {
    title: '🔧 Webevのコメント機能を開発する',
  },
};
