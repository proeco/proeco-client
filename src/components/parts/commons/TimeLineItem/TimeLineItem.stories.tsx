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
        <Box width="500px" height="250px"></Box>
      </TimeLineItem>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'TimeLineItemのtitle',
  imagePath: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
