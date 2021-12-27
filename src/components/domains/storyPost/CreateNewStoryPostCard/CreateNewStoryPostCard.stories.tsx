import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { CreateNewStoryPostCard } from '~/components/domains/storyPost/CreateNewStoryPostCard';
import { createMockUser } from '~/mocks/domains';

export default {
  title: 'domains/storyPost/CreateNewStoryPostCard',
  component: CreateNewStoryPostCard,
} as ComponentMeta<typeof CreateNewStoryPostCard>;

const Template: ComponentStory<typeof CreateNewStoryPostCard> = ({ storyId, page, currentUser }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5" width="600px">
      <CreateNewStoryPostCard storyId={storyId} page={page} currentUser={currentUser} />
    </Box>
  );
};

const mockUser = createMockUser();

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  storyId: 'story1',
  page: 1,
  currentUser: mockUser,
};
