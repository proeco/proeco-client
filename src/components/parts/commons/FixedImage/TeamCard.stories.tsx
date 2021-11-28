import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { FixedImage } from './FixedImage';

export default {
  title: 'parts/commons/FixedImage',
  component: FixedImage,
} as ComponentMeta<typeof FixedImage>;

const Template: ComponentStory<typeof FixedImage> = ({ ...rest }) => {
  return (
    <Box p="40px" bgcolor="#e5e5e5" width="400px">
      <FixedImage {...rest}></FixedImage>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://www.webev.cloud//images/eye-catch-dark.png',
};

export const NotFound = Template.bind({});
NotFound.args = {};
