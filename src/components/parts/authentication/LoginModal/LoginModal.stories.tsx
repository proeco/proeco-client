import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoginModal } from './LoginModal';

export default {
  title: 'parts/authentication/LoginModal',
  component: LoginModal,
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => {
  return <LoginModal {...args} />;
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
};
