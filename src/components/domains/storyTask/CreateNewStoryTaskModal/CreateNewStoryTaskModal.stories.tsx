import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Component } from './CreateNewStoryTaskModal';

export default {
  title: 'domains/storyTask/CreateNewStoryTaskModal',
  component: Component,
  argTypes: {
    onChangeTitle: { action: 'onChangeStoryTitle' },
    onClickCreateNewStoryTaskButton: { action: 'onClickCreateNewStoryTaskButton' },
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
