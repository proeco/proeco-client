import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Button } from './Button';

export default {
  title: 'parts/commons/atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Box>
    <Box display="flex" alignItems="start" gap="20px" mb="30px">
      <Box>
        <Button size="small" color="primary" {...args}>
          Button!
        </Button>
      </Box>
      <Box>
        <Button size="medium" color="primary" {...args}>
          Button!
        </Button>
      </Box>
      <Box>
        <Button size="large" color="primary" {...args}>
          Button!
        </Button>
      </Box>
    </Box>
    <Box display="flex" alignItems="start" gap="20px">
      <Box>
        <Button size="small" color="secondary" {...args}>
          Button!
        </Button>
      </Box>
      <Box>
        <Button size="medium" color="secondary" {...args}>
          Button!
        </Button>
      </Box>
      <Box>
        <Button size="large" color="secondary" {...args}>
          Button!
        </Button>
      </Box>
    </Box>
  </Box>
);

export const Contained = Template.bind({});
Contained.args = {
  variant: 'contained',
  bold: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  bold: true,
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  bold: true,
};
