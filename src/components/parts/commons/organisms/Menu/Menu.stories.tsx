import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Logout } from '@mui/icons-material';
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
  menuItemArray: [{ icon: <Logout fontSize="small" sx={{ color: 'textColor.main' }} />, text: 'ログアウト' }],
  open: true,
};
