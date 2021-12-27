import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { DisplayStoryPostCard } from './DisplayStoryPostCard';
import { createMockStoryPost, createMockUser } from '~/mocks/domains';
import { MDS } from '~/constants';

export default {
  title: 'domains/storyPost/DisplayStoryPostCard',
  component: DisplayStoryPostCard,
} as ComponentMeta<typeof DisplayStoryPostCard>;

const Template: ComponentStory<typeof DisplayStoryPostCard> = ({ ...rest }) => {
  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <DisplayStoryPostCard {...rest} />
    </Box>
  );
};

const mockCreatedUser = createMockUser({ name: 'CreatedUser' });
const mockCurrentUser = createMockUser({ name: 'CurrentUser' });
const mockStoryPost = createMockStoryPost({
  content: MDS.SAMPLE_MD,
});

export const EditModeDisplayStoryPostCard = Template.bind({});
EditModeDisplayStoryPostCard.args = {
  createdUserId: mockCreatedUser._id,
  createdUserName: mockCreatedUser.name,
  storyPost: mockStoryPost,
  teamId: 'team1',
  storyId: 'story1',
  page: 1,
  editable: true,
  currentUser: mockCurrentUser,
};

export const NotEditModeDisplayStoryPostCard = Template.bind({});
NotEditModeDisplayStoryPostCard.args = {
  ...EditModeDisplayStoryPostCard.args,
  editable: false,
};
