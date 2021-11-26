import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { SnackbarProvider } from 'notistack';
import { createMockUser } from '~/mocks/domains/createMockUser';

import { CreateNewStoryPostTimelineItem } from '~/components/domains/storyPost/CreateNewStoryPostTimelineItem';

export default {
  title: 'domains/storyPost/CreateNewStoryPostTimelineItem',
  component: CreateNewStoryPostTimelineItem,
} as ComponentMeta<typeof CreateNewStoryPostTimelineItem>;

const Template: ComponentStory<typeof CreateNewStoryPostTimelineItem> = ({ currentUser, storyId, page }) => {
  return (
    <SnackbarProvider>
      <Box p="40px" bgcolor="#e5e5e5" width="600px">
        <CreateNewStoryPostTimelineItem currentUser={currentUser} storyId={storyId} page={page} />
      </Box>
    </SnackbarProvider>
  );
};

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  currentUser: createMockUser(),
  storyId: '',
  page: 1,
};
