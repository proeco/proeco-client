import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TeamIcon } from './TeamIcon';

export default {
  title: 'domains/team/TeamIcon',
  component: TeamIcon,
} as ComponentMeta<typeof TeamIcon>;

const Template: ComponentStory<typeof TeamIcon> = ({ attachmentId }) => {
  return (
    <div className="p-4 d-flex align-items-center gap-4">
      <TeamIcon attachmentId={attachmentId} size={24} />
      <TeamIcon attachmentId={attachmentId} size={40} />
      <TeamIcon attachmentId={attachmentId} size={80} />
    </div>
  );
};

export const DefaultTeamIcon = Template.bind({});
DefaultTeamIcon.args = {
  attachmentId: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
