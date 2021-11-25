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

const Template: ComponentStory<typeof CreateNewStoryPostTimelineItem> = ({ currentUser }) => {
  return (
    <SnackbarProvider>
      <Box p={5}>
        <CreateNewStoryPostTimelineItem currentUser={currentUser} />
      </Box>
    </SnackbarProvider>
  );
};

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  currentUser: createMockUser(),
};
