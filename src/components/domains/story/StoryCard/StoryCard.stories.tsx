import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { StoryCard } from './StoryCard';
import { createMockStory } from '~/mocks/domains';

export default {
  title: 'domains/story/StoryCard',
  component: StoryCard,
} as ComponentMeta<typeof StoryCard>;

const Template: ComponentStory<typeof StoryCard> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <StoryCard {...rest} />
    </Box>
  );
};

const mockStory = createMockStory();

export const Default = Template.bind({});
Default.args = {
  story: mockStory,
};
