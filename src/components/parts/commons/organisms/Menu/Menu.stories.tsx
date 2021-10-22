import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from '@mui/system';
import { Menu } from './Menu';

import { Icon } from '~/components/parts/commons/atoms';

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
    { icon: <Icon icon="Settings" width="20px" color="textColor.main" />, text: 'Settings', onClick: action('clickSettings') },
    { icon: <Icon icon="Logout" width="20px" color="textColor.main" />, text: 'Logout', onClick: action('clickLogout') },
  ],
  open: true,
};
