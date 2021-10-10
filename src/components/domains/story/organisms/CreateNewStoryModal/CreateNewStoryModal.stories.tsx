import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { CreateNewStoryModal } from './CreateNewStoryModal';

export default {
  title: 'domains/story/organisms/CreateNewStoryModal',
  component: CreateNewStoryModal,
} as ComponentMeta<typeof CreateNewStoryModal>;

const Template: ComponentStory<typeof CreateNewStoryModal> = () => {
  return (
    <Box>
      <CreateNewStoryModal />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {};
