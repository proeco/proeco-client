import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Menu } from './Menu';

export default {
  title: 'parts/commons/organisms/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => {
  return (
    <Box>
      <Menu {...args}></Menu>
    </Box>
  );
};

export const OpenMenu = Template.bind({});
