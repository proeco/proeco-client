import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { TimeLine } from './TimeLine';

export default {
  title: 'parts/commons/TimeLine',
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

const Template: ComponentStory<typeof TimeLine> = ({ ...rest }) => {
  return (
    <Box>
      <TimeLine {...rest}>
        <Box width="500px" height="250px" border="1px solid #000"></Box>
      </TimeLine>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'TimeLineのtitle',
  imagePath: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
};
