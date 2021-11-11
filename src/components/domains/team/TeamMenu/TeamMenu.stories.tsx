import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { Component } from './TeamMenu';
import { createMockTeam } from '~/mock';
import { Icon } from '~/components/parts/commons';
import { TeamIcon } from '~/components/domains/team/TeamIcon';

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

const mockAnotherTeam = createMockTeam({ name: 'AnotherTeam' });

export const DefaultTeam = Template.bind({});
DefaultTeam.args = {
  currentTeam: mockTeam,
  menuItems: [
    {
      icon: <TeamIcon team={mockAnotherTeam} size={24} />,
      text: 'AnotherTeam',
      onClick: action('clickMenuItem'),
    },
    {
      icon: <Icon icon="CreateOutlined" width={24} />,
      text: '新規チームを作成する',
      onClick: action('clickCreateTeamButton'),
    },
  ],
  isValidating: false,
};

export const TeamWithoutImage = Template.bind({});
TeamWithoutImage.args = {
  ...DefaultTeam.args,
  currentTeam: mockTeamWithoutImage,
};

export const LoadingTeam = Template.bind({});
LoadingTeam.args = {
  ...DefaultTeam.args,
  isValidating: true,
};

export const UndefinedTeam = Template.bind({});
UndefinedTeam.args = {
  ...DefaultTeam.args,
  currentTeam: undefined,
};
