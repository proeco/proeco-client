import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Component } from './TeamSideBar';

import { createMockUser } from '~/mock';

import { URLS } from '~/constants/urls';
import { Icon } from '~/components/parts/commons';

export default {
  title: 'domains/team/TeamSideBar',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ ...rest }) => {
  return <Component {...rest} />;
};

const mockUser = createMockUser({ name: 'user' });

export const Default = Template.bind({});
Default.args = {
  currentTeamInfo: { name: 'Proeco', signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' },
  asPath: URLS.DASHBOARD,
  isValidating: false,
  currentUserInfo: { userId: 'user', name: 'user', signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' },
  teamUsersInfo: [{ userId: mockUser._id, name: mockUser.name, signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' }],
  menuItems: [
    {
      icon: <Icon icon="Logout" width="20px" color="textColor.main" />,
      text: 'Logout',
      onClick: action('signOut'),
    },
  ],
};
