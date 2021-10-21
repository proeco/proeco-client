import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Component } from './UpdateStoryModal';

export default {
  title: 'domains/story/organisms/UpdateStoryModal',
  component: Component,
  argTypes: {
    onChangeTitle: { action: 'onChangeTitle' },
    onChangeDescription: { action: 'onChangeDescription' },
    onClickUpdateStoryButton: { action: 'onClickUpdateStoryButton' },
    onSelectEmoji: { action: 'onSelectEmoji' },
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => {
  return (
    <Box>
      <Component {...args} />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  title: 'ここにタイトル',
  description: 'ここに説明',
  emojiId: 'tada',
};
