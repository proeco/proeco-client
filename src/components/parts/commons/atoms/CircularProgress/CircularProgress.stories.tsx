import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { CircularProgress } from '~/components/parts/commons/atoms/CircularProgress';

export default {
  title: 'parts/commons/atoms/CircularProgress',
  component: CircularProgress,
} as ComponentMeta<typeof CircularProgress>;

export const Template: ComponentStory<typeof CircularProgress> = () => {
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};
