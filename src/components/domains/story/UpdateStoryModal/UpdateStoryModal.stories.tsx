import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Component } from './UpdateStoryModal';

export default {
  title: 'domains/story/UpdateStoryModal',
  component: Component,
  argTypes: {
    onChangeStoryForm: { action: 'onChangeStoryForm' },
    onClickCreateNewStoryButton: { action: 'onClickCreateNewStoryButton' },
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
  emojiId: 'tada',
  isDisabled: false,
};
