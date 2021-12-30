import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TimeLineItem } from './TimeLineItem';

export default {
  title: 'parts/commons/TimeLineItem',
  component: TimeLineItem,
} as ComponentMeta<typeof TimeLineItem>;

const Template: ComponentStory<typeof TimeLineItem> = ({ ...rest }) => {
  return (
    <TimeLineItem {...rest}>
      <div className="w-100 bg-info" />
    </TimeLineItem>
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
