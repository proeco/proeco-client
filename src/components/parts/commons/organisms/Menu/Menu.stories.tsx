import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from '@mui/system';
import { Logout, Settings } from '@mui/icons-material';
import { Menu } from './Menu';

export default {
  title: 'parts/commons/organisms/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = ({ ...rest }) => {
  return (
    <Box>
      <Menu {...rest}></Menu>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    { icon: <Settings fontSize="small" sx={{ color: 'textColor.main' }} />, text: 'Settings', onClick: action('clickSettings') },
    { icon: <Logout fontSize="small" sx={{ color: 'textColor.main' }} />, text: 'Logout', onClick: action('clickLogout') },
  ],
  open: true,
};
