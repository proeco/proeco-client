import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamIcon } from './TeamIcon';
import { createMockTeam } from '~/mock';

export default {
  title: 'domains/team/TeamIcon',
  component: TeamIcon,
} as ComponentMeta<typeof TeamIcon>;

const Template: ComponentStory<typeof TeamIcon> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <TeamIcon {...rest} />
    </Box>
  );
};

const mockTeam = createMockTeam({ name: 'Proeco', iconImage: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });
const mockTeamWithoutImage = createMockTeam({ name: 'Proeco' });

export const DefaultTeamIcon = Template.bind({});
DefaultTeamIcon.args = {
  team: mockTeam,
};

export const TeamIconWithoutImage = Template.bind({});
TeamIconWithoutImage.args = {
  team: mockTeamWithoutImage,
};
