import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamMenu } from './TeamMenu';
import { createMockTeam } from '~/mock';

export default {
  title: 'domains/team/TeamMenu',
  component: TeamMenu,
} as ComponentMeta<typeof TeamMenu>;

const Template: ComponentStory<typeof TeamMenu> = ({ currentTeam }) => {
  return (
    <Box width="280px" p="16px">
      <TeamMenu currentTeam={currentTeam} />
    </Box>
  );
};

const mockTeam = createMockTeam({ name: 'Proeco', iconImage: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });

export const Default = Template.bind({});
Default.args = {
  currentTeam: mockTeam,
};
