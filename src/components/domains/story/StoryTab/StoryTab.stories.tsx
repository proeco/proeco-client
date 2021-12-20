import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { StoryTab } from './StoryTab';
import { createMockTeam } from '~/mocks/domains';

export default {
  title: 'domains/story/StoryTab',
  component: StoryTab,
} as ComponentMeta<typeof StoryTab>;

const Template: ComponentStory<typeof StoryTab> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <StoryTab {...rest} />
    </Box>
  );
};

const mockTeam = createMockTeam();

export const EditModeStoryTab = Template.bind({});
EditModeStoryTab.args = {
  team: mockTeam,
  editable: true,
};

export const NotEditModeStoryTab = Template.bind({});
NotEditModeStoryTab.args = {
  team: mockTeam,
  editable: false,
};
