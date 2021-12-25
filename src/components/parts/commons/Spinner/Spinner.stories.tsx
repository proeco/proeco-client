import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Spinner } from '~/components/parts/commons';

export default {
  title: 'parts/commons/CircularProgress',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const Template: ComponentStory<typeof Spinner> = ({ color }) => {
  return (
    <Box>
      <Spinner color={color} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
};
