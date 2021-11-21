import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Component } from './TeamIcon';
import { createMockTeam } from '~/mock';

export default {
  title: 'domains/team/TeamIcon',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ team, iconImageUrl }) => {
  return (
    <Box p="20px" display="flex" alignItems="center" gap="20px">
      <Component team={team} iconImageUrl={iconImageUrl} size={24} />
      <Component team={team} iconImageUrl={iconImageUrl} />
      <Component team={team} iconImageUrl={iconImageUrl} size={80} />
    </Box>
  );
};

const mockTeam = createMockTeam({ name: 'Proeco' });

export const DefaultTeamIcon = Template.bind({});
DefaultTeamIcon.args = {
  team: mockTeam,
  iconImageUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};

export const TeamIconWithoutImage = Template.bind({});
TeamIconWithoutImage.args = {
  team: mockTeam,
};
