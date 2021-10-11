import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { ListItemIcon, ListItemText } from '@mui/material';
import { DashboardOutlined as DashboardOutlinedIcon } from '@mui/icons-material';
import { SideBarListItem } from '~/components/parts/commons/atoms/SideBarListItem';

export default {
  title: 'parts/commons/atoms/SideBarListItem',
  component: SideBarListItem,
} as ComponentMeta<typeof SideBarListItem>;

const Template: ComponentStory<typeof SideBarListItem> = () => {
  return (
    <Box>
      <SideBarListItem>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="ダッシュボード" />
      </SideBarListItem>
    </Box>
  );
};

export const DefaultCard = Template.bind({});
