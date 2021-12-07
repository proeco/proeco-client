import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { DisplayStoryPostPaper } from './DisplayStoryPostPaper';
import { createMockStoryPost, createMockUser } from '~/mocks/domains';
import { SAMPLE_MD } from '~/constants';

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

const mockUser = createMockUser({ name: 'user' });
const mockStoryPost = createMockStoryPost({
  content: SAMPLE_MD,
});

export const EditModeDisplayStoryPostPaper = Template.bind({});
EditModeDisplayStoryPostPaper.args = {
  createdUserId: mockUser._id,
  createdUserName: mockUser.name,
  storyPost: mockStoryPost,
  teamId: 'team1',
  storyId: 'story1',
  page: 1,
  isEditMode: true,
};

export const NotEditModeDisplayStoryPostPaper = Template.bind({});
NotEditModeDisplayStoryPostPaper.args = {
  ...EditModeDisplayStoryPostPaper.args,
  isEditMode: false,
};
