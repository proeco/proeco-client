import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Logout } from '@mui/icons-material';
import { action } from '@storybook/addon-actions';
import { Component } from '~/components/parts/layout/organisms/NavigationBar';
import { createMockUser } from '~/mock';

export default {
  title: 'parts/layout/organisms/NavigationBar',
  component: Component,
  argTypes: { onClose: { action: 'onClickLoginButton' } },
} as ComponentMeta<typeof Component>;

const LOGO_URL = 'https://itizawa-tech.growi.cloud/attachment/615b8f0da86ba4005158b0e9';

const Template: ComponentStory<typeof Component> = ({ currentUser, onClickLoginButton, menuItems, logoImagePath }) => {
  return <Component currentUser={currentUser} onClickLoginButton={onClickLoginButton} menuItems={menuItems} logoImagePath={logoImagePath} />;
};

export const GuestUser = Template.bind({});
GuestUser.args = {
  currentUser: undefined,
  logoImagePath: LOGO_URL,
};

export const LoginUser = Template.bind({});
LoginUser.args = {
  currentUser: createMockUser({ image: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' }),
  menuItems: [
    {
      icon: <Logout fontSize="small" sx={{ color: 'textColor.main' }} />,
      text: 'Logout',
      onClick: action('signOut'),
    },
  ],
  logoImagePath: LOGO_URL,
};
