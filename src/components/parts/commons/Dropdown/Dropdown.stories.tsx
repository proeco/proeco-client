import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from '@mui/system';
import { ListItemIcon, MenuItem } from '@mui/material';
import { Dropdown } from './Dropdown';

import { Icon } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = ({ ...rest }) => {
  return (
    <Box p="40px">
      <Dropdown {...rest}>
        <MenuItem onClick={action('clickSettings')}>
          <ListItemIcon>
            <Icon icon="GEAR" size={20} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={action('clickLogout')}>
          <ListItemIcon>
            <Icon icon="REPLY" size={20} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Dropdown>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  toggle: <Icon icon="THREE_DOTS_VERTICAL" size={24} />,
};
