import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { Component } from './TeamMenu';
import { createMockTeam } from '~/mock';
import { UserIcon } from '~/components/domains/user/UserIcon';

export default {
  title: 'domains/team/TeamMenu',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ ...rest }) => {
  return (
    <Box width="280px" p="16px" boxSizing="border-box">
      <Component {...rest} />
    </Box>
  );
};

const mockTeam = createMockTeam({ name: 'Proeco', iconImage: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });
const mockTeamWithoutImage = createMockTeam({ name: 'Proeco' });

export const DefaultTeam = Template.bind({});
DefaultTeam.args = {
  currentTeam: mockTeam,
  menuItems: [
    {
      icon: <UserIcon size={24} />,
      text: 'AnotherTeam',
      onClick: action('clickMenuItem'),
    },
  ],
  isValidating: false,
};

export const TeamWithoutImage = Template.bind({});
TeamWithoutImage.args = {
  currentTeam: mockTeamWithoutImage,
  menuItems: [
    {
      icon: <UserIcon size={24} />,
      text: 'AnotherTeam',
      onClick: action('clickMenuItem'),
    },
  ],
  isValidating: false,
};

export const LoadingTeam = Template.bind({});
LoadingTeam.args = {
  currentTeam: mockTeam,
  menuItems: [
    {
      icon: <UserIcon size={24} />,
      text: 'AnotherTeam',
      onClick: action('clickMenuItem'),
    },
  ],
  isValidating: true,
};

export const UndefinedTeam = Template.bind({});
UndefinedTeam.args = {
  menuItems: [],
  isValidating: false,
};
