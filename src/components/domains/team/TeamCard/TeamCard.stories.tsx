import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SkeltonTeamCard, TeamCard } from './TeamCard';

export default {
  title: 'domains/team/TeamCard',
  component: TeamCard,
} as ComponentMeta<typeof TeamCard>;

const Template: ComponentStory<typeof TeamCard> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <TeamCard {...rest}></TeamCard>
    </div>
  );
};

export const DefaultTeamCard = Template.bind({});
DefaultTeamCard.args = {
  name: 'Proeco',
  description: 'description',
  attachmentId: 'attachmentId1',
  url: 'https://www.proeco.app/',
};

export const LongTextTeamCard = Template.bind({});
LongTextTeamCard.args = {
  ...DefaultTeamCard.args,
  description: 'Proeco は頑張る人を応援するプラットフォームです。プロジェクトを作って Story を作ることで',
  attachmentId: 'attachmentId1',
};

const SkeltonTemplate: ComponentStory<typeof SkeltonTeamCard> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <SkeltonTeamCard {...rest}></SkeltonTeamCard>
    </div>
  );
};

export const Skelton = SkeltonTemplate.bind({});
