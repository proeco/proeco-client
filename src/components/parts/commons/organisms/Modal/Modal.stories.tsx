import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Typography } from '../../atoms';
import { Modal } from './Modal';

export default {
  title: 'parts/commons/organisms/Modal',
  component: Modal,
  argTypes: { onClose: { action: 'closed' } },
} as ComponentMeta<typeof Modal>;

const Content = (
  <Box>
    <Typography>ここにコンテンツが入る</Typography>
  </Box>
);

const Template: ComponentStory<typeof Modal> = (args) => {
  return (
    <Box>
      <Modal {...args}></Modal>
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  open: true,
  content: Content,
  title: 'ここにタイトルが入る',
};

export const CloseModal = Template.bind({});
CloseModal.args = {
  open: false,
  content: Content,
  title: 'ここにタイトルが入る',
};
