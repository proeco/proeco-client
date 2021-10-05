import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { CreateNewStoryModal } from './CreateNewStoryModal';
import { Typography } from '~/components/parts/commons/atoms/Typography';

export default {
  title: 'domains/story/organisms/CreateNewStoryModal',
  component: CreateNewStoryModal,
  argTypes: { onClose: { action: 'closed' } },
} as ComponentMeta<typeof CreateNewStoryModal>;

const Content = (
  <Box>
    <Typography>ここにコンテンツが入る</Typography>
  </Box>
);

const Template: ComponentStory<typeof CreateNewStoryModal> = (args) => {
  return (
    <Box>
      <CreateNewStoryModal {...args}></CreateNewStoryModal>
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  open: true,
  content: Content,
  title: 'ストーリーを作成する',
};

export const CloseModal = Template.bind({});
CloseModal.args = {
  open: false,
  content: Content,
  title: 'ストーリーを作成する',
};
