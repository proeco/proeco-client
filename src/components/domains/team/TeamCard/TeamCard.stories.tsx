import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { SkeltonTeamCard, TeamCard } from './TeamCard';

export default {
  title: 'domains/team/TeamCard',
  component: TeamCard,
} as ComponentMeta<typeof TeamCard>;

const Template: ComponentStory<typeof TeamCard> = ({ ...rest }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5" width="400px">
      <TeamCard {...rest}></TeamCard>
    </Box>
  );
};

export const DefaultTeamCard = Template.bind({});
DefaultTeamCard.args = {
  name: 'Proeco',
  description: 'description',
  attachmentId: 'attachmentId1',
  onClick: action('clickTeamCard'),
};

export const LongTextTeamCard = Template.bind({});
LongTextTeamCard.args = {
  ...DefaultTeamCard.args,
  description: 'Proeco は頑張る人を応援するプラットフォームです。プロジェクトを作って Story を作ることで',
  attachmentId: 'attachmentId1',
};

const SkeltonTemplate: ComponentStory<typeof SkeltonTeamCard> = ({ ...rest }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5" width="400px">
      <SkeltonTeamCard {...rest}></SkeltonTeamCard>
    </Box>
  );
};

export const Skelton = SkeltonTemplate.bind({});
