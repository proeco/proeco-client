import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamCard } from './TeamCard';
import { createMockTeam } from '~/mock';

export default {
  title: 'domains/team/TeamCard',
  component: TeamCard,
} as ComponentMeta<typeof TeamCard>;

const Template: ComponentStory<typeof TeamCard> = ({ ...rest }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5">
      <TeamCard {...rest}></TeamCard>
    </Box>
  );
};

const mockTeam = createMockTeam({ name: 'Proeco', iconImage: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });

export const Default = Template.bind({});
Default.args = {
  team: mockTeam,
};
