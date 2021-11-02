import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Modal } from './Modal';
import { Typography } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Modal',
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

export const SmallModal = Template.bind({});
export const MediumModal = Template.bind({});
export const LargeModal = Template.bind({});

SmallModal.args = {
  size: 'small',
  open: true,
  content: Content,
  title: 'ここにタイトルが入る',
};

MediumModal.args = {
  size: 'medium',
  open: true,
  content: Content,
  title: 'ここにタイトルが入る',
};

LargeModal.args = {
  size: 'large',
  open: true,
  content: Content,
  title: 'ここにタイトルが入る',
};
