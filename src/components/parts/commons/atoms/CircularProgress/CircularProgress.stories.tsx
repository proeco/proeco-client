import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { CircularProgress } from '~/components/parts/commons/atoms/CircularProgress';

export default {
  title: 'parts/commons/atoms/CircularProgress',
  component: CircularProgress,
} as ComponentMeta<typeof CircularProgress>;

export const Template: ComponentStory<typeof CircularProgress> = ({ color }) => {
  return (
    <Box>
      <CircularProgress color={color} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
};
