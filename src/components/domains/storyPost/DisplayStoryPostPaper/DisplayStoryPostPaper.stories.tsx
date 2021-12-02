import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { SnackbarProvider } from 'notistack';
import { DisplayStoryPostPaper } from './DisplayStoryPostPaper';
import { createMockStoryPost, createMockUser } from '~/mocks/domains';
import { SAMPLE_MD } from '~/constants';

export default {
  title: 'domains/storyPost/DisplayStoryPostPaper',
  component: DisplayStoryPostPaper,
} as ComponentMeta<typeof DisplayStoryPostPaper>;

const Template: ComponentStory<typeof DisplayStoryPostPaper> = ({ ...rest }) => {
  return (
    <SnackbarProvider>
      <Box p="20px" width="600px" bgcolor="#e5e5e5">
        <DisplayStoryPostPaper {...rest} />
      </Box>
    </SnackbarProvider>
  );
};

const mockUser = createMockUser({ name: 'user' });
const mockStoryPost = createMockStoryPost({
  content: SAMPLE_MD,
});

export const Default = Template.bind({});
Default.args = {
  currentUser: mockUser,
  storyPost: mockStoryPost,
  storyId: 'story1',
  page: 1,
};
