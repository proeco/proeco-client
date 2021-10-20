import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { LoginModal } from './LoginModal';

export default {
  title: 'parts/authentication/LoginModal',
  component: LoginModal,
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => {
  return (
    <Box>
      <LoginModal {...args} />
    </Box>
  );
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
};
