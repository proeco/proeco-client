import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { DeleteStoryModal } from './DeleteStoryModal';

export default {
  title: 'domains/story/organisms/DeleteStoryModal',
  component: DeleteStoryModal,
  argTypes: {
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
    title: 'Webevのコメント機能を開発する',
    description: 'Webev のコメント機能を開発して、リリースまで行う！',
    _id: 'mongoId',
    emojiId: 'wrench',
    isPrivate: false,
    createdUserId: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
