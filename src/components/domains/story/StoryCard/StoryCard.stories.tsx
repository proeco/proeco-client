import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SkeltonStoryCard, StoryCard } from './StoryCard';
import { createMockStory } from '~/mocks/domains';

export default {
  title: 'domains/story/StoryCard',
  component: StoryCard,
} as ComponentMeta<typeof StoryCard>;

const Template: ComponentStory<typeof StoryCard> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <StoryCard {...rest} />
    </div>
  );
};

const mockStory = createMockStory();

export const Default = Template.bind({});
Default.args = {
  story: mockStory,
};

const SkeltonTemplate: ComponentStory<typeof SkeltonStoryCard> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <SkeltonStoryCard {...rest} />
    </div>
  );
};

export const Skelton = SkeltonTemplate.bind({});
