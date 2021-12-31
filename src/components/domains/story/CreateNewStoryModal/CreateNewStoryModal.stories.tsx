import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { CreateNewStoryModal } from '.';

export default {
  title: 'domains/story/CreateNewStoryModal',
  component: CreateNewStoryModal,
  argTypes: {
    onCloseModal: { action: 'onCloseModal' },
  },
} as ComponentMeta<typeof CreateNewStoryModal>;

const Template: ComponentStory<typeof CreateNewStoryModal> = (args) => {
  return <CreateNewStoryModal {...args} />;
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  onCloseModal: action('onCloseModal'),
  teamId: 'team1',
  page: 1,
};
