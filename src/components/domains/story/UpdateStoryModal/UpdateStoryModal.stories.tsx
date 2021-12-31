import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
  return <UpdateStoryModal {...args} />;
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  story: createMockStory(),
};
