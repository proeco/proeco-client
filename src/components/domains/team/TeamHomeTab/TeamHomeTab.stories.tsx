import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamHomeTab } from './TeamHomeTab';
import { createMockTeam, createMockUser } from '~/mocks/domains';
import { MDS } from '~/constants';

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

const mockTeam = createMockTeam({ homeContent: MDS.SAMPLE_MD });
const mockUser = createMockUser();

export const EditModeTeamHomeTab = Template.bind({});
EditModeTeamHomeTab.args = {
  team: mockTeam,
  editable: true,
  currentUser: mockUser,
};
