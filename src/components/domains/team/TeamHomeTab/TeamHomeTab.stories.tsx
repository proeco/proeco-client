import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamHomeTab } from './TeamHomeTab';
import { createMockTeam } from '~/mocks/domains';

export default {
  title: 'domains/team/TeamHomeTab',
  component: TeamHomeTab,
} as ComponentMeta<typeof TeamHomeTab>;

const Template: ComponentStory<typeof TeamHomeTab> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <TeamHomeTab {...rest} />
    </Box>
  );
};

const mockTeam = createMockTeam();

export const Default = Template.bind({});
Default.args = {
  team: mockTeam,
};
