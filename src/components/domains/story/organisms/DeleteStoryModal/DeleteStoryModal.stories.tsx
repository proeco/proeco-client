import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Component } from './DeleteStoryModal';

export default {
  title: 'domains/story/organisms/DeleteStoryModal',
  component: Component,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
    onClickDeleteStoryButton: { action: 'onClickDeleteStoryButton' },
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
  title: 'Webevのコメント機能を開発する',
  description: 'Webev のコメント機能を開発して、リリースまで行う！',
  emojiId: 'wrench',
};
