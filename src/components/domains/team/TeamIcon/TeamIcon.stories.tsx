import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamIcon } from './TeamIcon';

export default {
  title: 'domains/team/TeamIcon',
  component: TeamIcon,
} as ComponentMeta<typeof TeamIcon>;

const Template: ComponentStory<typeof TeamIcon> = ({ attachmentId }) => {
  return (
    <Box p="20px" display="flex" alignItems="center" gap="20px">
      <TeamIcon attachmentId={attachmentId} size={24} />
      <TeamIcon attachmentId={attachmentId} size={40} />
      <TeamIcon attachmentId={attachmentId} size={80} />
    </Box>
  );
};

export const DefaultTeamIcon = Template.bind({});
DefaultTeamIcon.args = {
  attachmentId: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
