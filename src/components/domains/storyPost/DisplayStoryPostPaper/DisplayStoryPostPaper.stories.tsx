import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { DisplayStoryPostPaper } from './DisplayStoryPostPaper';
import { createMockStoryPost, createMockUser } from '~/mocks/domains';
import { MDS } from '~/constants';

export default {
  title: 'domains/storyPost/DisplayStoryPostPaper',
  component: DisplayStoryPostPaper,
} as ComponentMeta<typeof DisplayStoryPostPaper>;

const Template: ComponentStory<typeof DisplayStoryPostPaper> = ({ ...rest }) => {
  return (
    <Box p="20px" width="600px" bgcolor="#e5e5e5">
      <DisplayStoryPostPaper {...rest} />
    </Box>
  );
};

const mockCreatedUser = createMockUser({ name: 'CreatedUser' });
const mockCurrentUser = createMockUser({ name: 'CurrentUser' });
const mockStoryPost = createMockStoryPost({
  content: MDS.SAMPLE_MD,
});

export const EditModeDisplayStoryPostPaper = Template.bind({});
EditModeDisplayStoryPostPaper.args = {
  createdUserId: mockCreatedUser._id,
  createdUserName: mockCreatedUser.name,
  storyPost: mockStoryPost,
  teamId: 'team1',
  storyId: 'story1',
  page: 1,
  editable: true,
  currentUser: mockCurrentUser,
};

export const NotEditModeDisplayStoryPostPaper = Template.bind({});
NotEditModeDisplayStoryPostPaper.args = {
  ...EditModeDisplayStoryPostPaper.args,
  editable: false,
};
