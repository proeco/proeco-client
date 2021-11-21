import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Component } from './TeamSideBar';

import { createMockTeam, createMockUser } from '~/mock';

import { URLS } from '~/constants/urls';
import { Icon } from '~/components/parts/commons';

export default {
  title: 'domains/team/TeamSideBar',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ ...rest }) => {
  return <Component {...rest} />;
};

const mockTeam = createMockTeam({ name: 'Proeco', iconImageId: '616289c6c4e99c0051b30574' });
const mockUser = createMockUser({ name: 'user' });

export const Default = Template.bind({});
Default.args = {
  currentTeam: mockTeam,
  asPath: URLS.DASHBOARD,
  isValidating: false,
  currentUser: mockUser,
  teamUsers: [mockUser],
  menuItems: [
    {
      icon: <Icon icon="Logout" width="20px" color="textColor.main" />,
      text: 'Logout',
      onClick: action('signOut'),
    },
  ],
};
