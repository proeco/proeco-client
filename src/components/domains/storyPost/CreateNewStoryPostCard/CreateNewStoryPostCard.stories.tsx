import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateNewStoryPostCard } from '~/components/domains/storyPost/CreateNewStoryPostCard';
import { createMockUser } from '~/mocks/domains';

export default {
  title: 'domains/storyPost/CreateNewStoryPostCard',
  component: CreateNewStoryPostCard,
} as ComponentMeta<typeof CreateNewStoryPostCard>;

const Template: ComponentStory<typeof CreateNewStoryPostCard> = ({ storyId, page, currentUser }) => {
  return (
    <div className="p-4">
      <CreateNewStoryPostCard storyId={storyId} page={page} currentUser={currentUser} />
    </div>
  );
};

const mockUser = createMockUser();

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  storyId: 'story1',
  page: 1,
  currentUser: mockUser,
};
