import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { SkeltonStoryCard, StoryCard } from './StoryCard';
import { createMockStory } from '~/mocks/domains';

export default {
  title: 'domains/story/StoryCard',
  component: StoryCard,
} as ComponentMeta<typeof StoryCard>;

const Template: ComponentStory<typeof StoryCard> = ({ ...rest }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5" width="400px">
      <StoryCard {...rest} />
    </Box>
  );
};

const mockStory = createMockStory();

export const Default = Template.bind({});
Default.args = {
  story: mockStory,
};

const SkeltonTemplate: ComponentStory<typeof SkeltonStoryCard> = ({ ...rest }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5" width="400px">
      <SkeltonStoryCard {...rest} />
    </Box>
  );
};

export const Skelton = SkeltonTemplate.bind({});
