import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Button } from './Button';

export default {
  title: 'parts/commons/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Box display="flex" alignItems="start" gap="20px" mb="30px">
    <Box>
      <Button size="sm" {...args}>
        Button!
      </Button>
    </Box>
    <Box>
      <Button {...args}>Button!</Button>
    </Box>
    <Box>
      <Button size="lg" {...args}>
        Button!
      </Button>
    </Box>
  </Box>
);

export const Contained = Template.bind({});
Contained.args = {
  color: 'primary',
  disabled: false,
  outlined: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  color: 'primary',
  outlined: true,
  disabled: false,
};
