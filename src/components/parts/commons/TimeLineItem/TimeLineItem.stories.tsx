import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TimeLineItem } from './TimeLineItem';

export default {
  title: 'parts/commons/TimeLineItem',
  component: TimeLineItem,
} as ComponentMeta<typeof TimeLineItem>;

const Template: ComponentStory<typeof TimeLineItem> = ({ ...rest }) => {
  return (
    <Box p="20px" bgcolor="#E5E5E5">
      <TimeLineItem {...rest}>
        <Box width="500px" height="250px" bgcolor="#fff"></Box>
      </TimeLineItem>
    </Box>
  );
};

export const DefaultTimeLineItem = Template.bind({});
DefaultTimeLineItem.args = {
  userAttachmentId: 'attachment1',
};

export const TimeLineItemWithoutImage = Template.bind({});
TimeLineItemWithoutImage.args = {
  ...DefaultTimeLineItem.args,
  userAttachmentId: undefined,
};

export const NotConnectedTimeLineItem = Template.bind({});
NotConnectedTimeLineItem.args = {
  ...DefaultTimeLineItem.args,
  isConnect: false,
};
