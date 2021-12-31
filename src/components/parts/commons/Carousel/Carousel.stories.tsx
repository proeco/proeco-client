import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Carousel } from './Carousel';
import { StoryCard } from '~/components/domains/story/StoryCard';
import { createMockStory } from '~/mocks/domains';

export default {
  title: 'parts/commons/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const mockStory = createMockStory();

const Template: ComponentStory<typeof Carousel> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <Carousel {...rest}>
        <div className="px-3">
          <StoryCard story={mockStory} />
        </div>
        <div className="px-3">
          <StoryCard story={mockStory} />
        </div>
        <div className="px-3">
          <StoryCard story={mockStory} />
        </div>
        <div className="px-3">
          <StoryCard story={mockStory} />
        </div>
        <div className="px-3">
          <StoryCard story={mockStory} />
        </div>
      </Carousel>
    </div>
  );
};

export const DefaultCarousel = Template.bind({});

export const autoPlayCarousel = Template.bind({});
autoPlayCarousel.args = {
  autoPlay: true,
};
