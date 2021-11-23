import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TeamIcon } from './TeamIcon';

export default {
  title: 'domains/team/TeamIcon',
  component: TeamIcon,
} as ComponentMeta<typeof TeamIcon>;

const Template: ComponentStory<typeof TeamIcon> = ({ teamName, signedUrl }) => {
  return (
    <Box p="20px" display="flex" alignItems="center" gap="20px">
      <TeamIcon teamName={teamName} signedUrl={signedUrl} size={24} />
      <TeamIcon teamName={teamName} signedUrl={signedUrl} />
      <TeamIcon teamName={teamName} signedUrl={signedUrl} size={80} />
    </Box>
  );
};

export const DefaultTeamIcon = Template.bind({});
DefaultTeamIcon.args = {
  teamName: 'Proeco',
  signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};

export const TeamIconWithoutImage = Template.bind({});
TeamIconWithoutImage.args = {
  teamName: 'Proeco',
};
