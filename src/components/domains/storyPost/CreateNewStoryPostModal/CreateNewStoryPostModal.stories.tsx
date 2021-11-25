import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Component } from './CreateNewStoryPostModal';

export default {
  title: 'domains/storyPost/CreateNewStoryPostModal',
  component: Component,
  argTypes: {
    onChangeTitle: { action: 'onChangeStoryTitle' },
    onClickCreateNewStoryPostButton: { action: 'onClickCreateNewStoryPostButton' },
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
  isDisabled: false,
};
