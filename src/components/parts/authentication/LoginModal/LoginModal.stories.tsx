import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Component } from './LoginModal';

export default {
  title: 'parts/authentication/LoginModal',
  component: Component,
  argTypes: {
    onClose: { action: 'onClose' },
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
  logoImagePath: 'https://proeco-client.vercel.app/_next/image?url=%2Fimages%2FOriginal.svg&w=1920&q=75',
  signInGoogleImagePath: 'https://proeco-client.vercel.app/_next/image?url=%2Fimages%2Fsign_in_with_google.png&w=256&q=75',
};
