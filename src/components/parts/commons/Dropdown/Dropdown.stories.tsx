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
    <Box>
      <Dropdown {...rest}>
        <MenuItem onClick={action('clickSettings')}>
          <ListItemIcon>
            <Icon icon="Settings" width="20px" color="textColor.main" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={action('clickLogout')}>
          <ListItemIcon>
            <Icon icon="Logout" width="20px" color="textColor.main" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Dropdown>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  toggle: <Icon icon="MoreVert" width={24} />,
  open: true,
};
